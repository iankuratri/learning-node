const startupDebug = require("debug")("app:startup");
const dbDebug = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

// built-in middleware function
// It parses incoming requests with JSON payloads
app.use(express.json());
// It parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// It serves static files
app.use(express.static("public"));

// third-party middleware
// Helps secure your apps by setting various HTTP headers.
app.use(helmet());

// configuration
console.log("Application Name: ", config.get("name"));
console.log("Mail Server: ", config.get("mail.host"));
// console.log("Mail Password: ", config.get("mail.password"));

// environment varibles
// to get env - app.get("env") or process.env
if (app.get("env") === "development") {
  // HTTP request logger.
  app.use(morgan("tiny"));

  // export DEBUG=app:startup or set DEBUG=app:startup to view startupDebug msg
  // export DEBUG=app:* or set DEBUG=app:* to view all debug msgs
  startupDebug("Morgon is logging...");
}

// db work debug
// export DEBUG=app:db or set DEBUG=app:db to view dbDebug msg
// export DEBUG=app:* or set DEBUG=app:* to view all debug msgs
dbDebug("Connecting to server...");

// custom middleware fucntion
app.use(logger);
app.use(authenticate);

// route for courses api
app.use("/api/courses", courses);

// route for homepage
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
