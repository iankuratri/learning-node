const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // handle uncaughtExceptons using process

  // process.on("uncaughtException", (ex) => {
  //   console.log("WE GOT AN UNCAUGHT EXCEPTION", ex);
  //   process.exit(1);
  // });

  // handle unhandledRejection using process

  // process.on("unhandledRejection", (ex) => {
  //   console.log("WE GOT AN UNHANDLED REJECTION", ex);
  //   process.exit(1);
  // });

  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(
    new winston.transports.File({
      level: "error",
      filename: "logfile.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      level: "error",
      db: "mongodb://localhost:27017/vidly-app",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  // for simulating uncaughtException error
  // throw new Error("Something failed during startup.")

  // for simulating unhandledRejection error
  // const p = Promise.reject(new Error("Something failed misrerably"));
  // p.then(() => console.log("Done"));
};
