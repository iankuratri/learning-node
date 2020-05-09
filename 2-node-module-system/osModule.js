const os = require("os");

const totalMemory = os.totalmem();
console.log("Total Memory:", totalMemory);

const freeMemory = os.freemem();
console.log("Free Memory:", freeMemory);

