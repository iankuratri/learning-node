const fs = require("fs");

// synchronous or blocking
// const files = fs.readdirSync("./");
// console.log("Files:", files);

// always prefer to use async methods in node otherwise,
// the thread may block until the task is completed

// asynchronous or non-blocking
const files = fs.readdir("./", (err, result) => {
  if (err) console.log("Error:", err);
  else console.log("Files:", result);
});
