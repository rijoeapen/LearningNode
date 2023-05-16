const path = require("path");
const fs = require("fs");
const { add, sub, divide } = require("./util.js");
const tStack = "NodeJS";

console.log(add(5, 5));
console.log(sub(5, 5));
console.log(divide(5, 5));
console.log(__dirname);
console.log(__filename);
console.log(path.extname(__filename));
console.log(path.basename(path.resolve()));
console.log(path.basename(__filename));
console.log(path.parse(__filename));
console.log(path.parse(__filename).name);
console.log(global);
global.console.log("hello");
console.log(fs);

// Create a directory inside existing directory.

fs.mkdir(path.join(__dirname, "/api"), {}, (err) => {
  if (err) {
    throw err;
  }
});

// create a file inside an existing folder api named as api.txt.

fs.writeFile(
  path.join(__dirname, "/api", "api.txt"),
  `Welcome to ${tStack}`,
  (err) => {
    if (err) {
      throw err;
    }
  }
);

// appending values to the existing file instead of rewriting.

fs.appendFile(
  path.join(__dirname, "/api", "api.txt"),
  `\nWelcome to ${tStack}`,
  (err) => {
    if (err) {
      throw err;
    }
  }
);

// read from the file.

fs.readFile(path.join(__dirname, "/api", "api.txt"), "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
});

// remove the directory recursively.

fs.rm(path.join(__dirname, "/api"), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});
