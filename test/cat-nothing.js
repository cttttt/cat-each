"use strict";

var cat = require("../"),
    test = require("tape-catch")
;

test("Does catting no streams result in no output?", function (t) {
    t.plan(1);

    var data = "";

    cat([], function () {})
    .on("data", function (d) {
        data += d.toString();
    })
    .on("end", function () {
        t.equal(
            data,
            "",
            "does a cat stream end with no data given an empty list?"
        );
        t.end();
    });
});

// vim:expandtab:shiftwidth=4:softtabstop=4
