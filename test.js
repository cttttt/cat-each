var cat = require("./cat-each"),
    fs = require("fs");

cat(process.argv.slice(2), function (f) {
    return fs.createReadStream(f).on("error", function (e) {
        console.error(
            "%s: Could not open file or directory: %s",
            f, e
        );
    });
}).pipe(process.stdout);
