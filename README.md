# NAME

cat-each - Creates a stream by concatenating new streams, each created by a factory from a list

```js
var cat = require("cat-each");

// concatenate a few files; stream the result to standard output
cat(["header.txt", "body.txt", "footer.txt" ], fs.createReadStream)
.pipe(process.stdout);

```

# DESCRIPTION

Iterates over the provided list, creating a stream for each item.  Returns a
readable stream from which the concatenation of those streams may be read in
the order provided.

# EXAMPLES

Concatenate a list of files, while properly handling handling errors:

```js
cat(process.argv.slice(2), function (f) {
    return fs.createReadStream(f).on("error", function (e) {
        console.error(
            "%s: Could not open file or directory: %s",
            f, e
        );
    });
}).pipe(process.stdout);
```

# TESTS

```bash
$ npm install
$ npm test
```

# PEOPLE

Me, [Chris Taylor](//github.com/cttttt)

# BUGS 

- Not sure of a clean way to allow event emitters to be attached to the
  created streams.  For now, the factory should fully prepare each stream
  (involving attaching any event listeners).

# LICENSE

[MIT](LICENSE)