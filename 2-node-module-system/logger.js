const EventEmitter = require("events");
const url = "http://logserviceprovider.io/log";

class Logger extends EventEmitter {
  log(message) {
    // Send an http request
    console.log(message);

    // Raise an event
    this.emit("messageLogged", { id: 1, url: "logIt.com/1" });
  }
}

// for exporting log function to other modules - module wrapper function helps in this

console.log("File name:", __filename);
console.log("Directory name:", __dirname);

// exporting as a key in exports object
// module.exports.log = log;

// exporting as a function
// module.exports = log;

// exporting class Logger
module.exports = Logger;
