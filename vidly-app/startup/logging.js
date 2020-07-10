const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // handle uncaught excepton
  // process.on("uncaughtException", (ex) => {
  //   console.log("WE GOT AN UNCAUGHT EXCEPTION");
  //   winston.error(ex.message, ex);
  // });

  // handle unhandledRejection
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly-app",
    })
  );

  // for simulating uncaughtException error
  // throw new Error("Something failed during startup.")

  // for simulating unhandledRejection error
  // const p = Promise.reject(new Error("Something failed misrerably"));
  // p.then(() => console.log("Done"));
};
