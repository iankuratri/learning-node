const http = require("http");

// const server = http.createServer();

// server.on("connection", () => {
//   console.log("new connection");
// });

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello world");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000...");
