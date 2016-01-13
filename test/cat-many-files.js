"use strict";

var cat = require("../"),
    test = require("tape-catch"),
    fs = require("fs"),
    path = require("path")
    ;

test("Does catting multiple files work?", function (t) {
    var data = "",
        filenames = [ "a", "b", "c" ].map(function (stem) {
            return path.join(__dirname, "fixtures", stem);
        });

    t.plan(1);

    cat(filenames, function (f) {
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
            filenames.map(function (f) {
                return fs.readFileSync(f).toString();
            }).join(""),
            "does a cat stream (composed of multiple streams) return the same data as reading the file directly?"
        );
        t.end();
    });
});

// vim:expandtab:shiftwidth=4:softtabstop=4
