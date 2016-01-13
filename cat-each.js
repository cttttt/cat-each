"use strict";

var async = require("async"),
    PassThrough = require("stream").PassThrough
;

module.exports = function (list, readable_factory) {
    var sink = new PassThrough();

    async.each(list, function (i, callback) {
        readable_factory(i)
        .on("end", function () {
            callback();
        })
        .on("error", function () {
            callback();
        })
        .pipe(sink, { end: false })
        ;
    }, function () {
        sink.end();
    });

    return sink;
};

// vim:expandtab:softtabstop=4:shiftwidth=4
