// Logger is a class here
const Logger = require("./logger");

// logger is a object here - instance of Logger class
const logger = new Logger();

// register a listener
logger.on("messageLogged", (eventArg) => {
  console.log("listener called:", eventArg);
});

logger.log("log my error - 1");
