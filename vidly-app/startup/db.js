const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/vidly-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB.");
      winston.info("Connected to MongoDB.");
    });

  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
  // by default, you need to set it to false.
  mongoose.set("useFindAndModify", false);
};
