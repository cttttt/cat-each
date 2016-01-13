"use strict";

var cat = require("../"),
    test = require("tape-catch"),
    fs = require("fs"),
    path = require("path")
    ;

test("Does catting multiple files work where there was a handled error?", function (t) {
    var data = "",
        filenames = [ "a", "z", "c" ].map(function (stem) {
            return path.join(__dirname, "fixtures", stem);
        }),
        missingFilenameIdx = 1
        ;

    t.plan(1);

    cat(filenames, function (f) {
        return fs.createReadStream(f).on("error", function (e) {
            if (f !== filenames[missingFilenameIdx]) {
                t.fail(f + ": Could not open test fixture: " + e.toString());
            }
        });
    })
    .on("data", function (d) {
        data += d.toString();
    })
    .on("end", function () {
        t.equal(
            data,
            filenames.filter(function (f) {
                return f !== filenames[missingFilenameIdx];
            })
            .map(function (f) {
                return fs.readFileSync(f).toString();
            }).join(""),
            "does a cat stream (composed of multiple streams) return the same data as reading the file directly?"
        );
        t.end();
    });
});

// vim:expandtab:shiftwidth=4:softtabstop=4
