"use strict";

var cat = require("../"),
    test = require("tape-catch"),
    fs = require("fs"),
    path = require("path")
    ;

test("Does catting a single file work?", function (t) {
    var data = "",
        filename = path.join(__dirname, "fixtures", "a");

    t.plan(1);

    cat([ filename ], function (f) {
        return fs.createReadStream(f).on("error", function (e) {
            t.fail(f + ": Could not open test fixture:" + e.toString());
        });
    })
    .on("data", function (d) {
        data += d.toString();
    })
    .on("end", function () {
        t.equal(
            data,
            fs.readFileSync(filename).toString(),
            "does a cat stream return the same data as reading the file directly?"
        );
        t.end();
    });
});

// vim:expandtab:shiftwidth=4:softtabstop=4
