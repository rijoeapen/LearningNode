const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 4001;

const userList = [{ name: "Arun" }, { name: "Anju" }, { name: "Arjun" }];
// fs.mkdir(path.join(__dirname, "views"), (err) => {
//   if (err) throw err;
// });

// fs.writeFile(path.join(__dirname, "views", "home.html"), "", (err) => {
//   if (err) throw err;
// });

const errorPage = (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>Page not found.");
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  if (req.url === "/" && req.method === "GET") {
    fs.access(path.join(__dirname, "views/home.html"), (err) => {
      if (err) {
        errorPage(res);
      } else {
        fs.readFile(path.join(__dirname, "views/home.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
      }
    });
  } else if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userList));
  } else if (req.url === "/user" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      userList.push(JSON.parse(body));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userList));
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Allow-Headers": "*",
    });
    res.end();
  } else {
    errorPage(res);
  }
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
