// EventEmitter is a class here
const EventEmitter = require("events");

// emitter is a object here - instance of EventEmitter class
const emitter = new EventEmitter();

// Register a listner
emitter.on("messageLogged", (eventArg) => {
  console.log("listener called:", eventArg);
});

// Raise an event
emitter.emit("messageLogged", { id: 1, url: "logIt.com/1" });
