const mongoose = require("mongoose");
// _id: 5ee889cfd1f6a131e08277f8

/**
 * There are 12 bytes in object id
 *
 * 4 bytes: Time stamp
 * 3 bytes: Machine identifier
 * 2 bytes: Process identifier
 * 3 bytes: Counter
 *
 */

/**
 * 1 byte = 8 bits
 * 2 ^ 8 = 256
 * 2 ^ 24 = 16M
 */

// _id is genrated by MongoDB driver

// generate mongodb id
const id = new mongoose.Types.ObjectId();
console.log("Id:", id);

// timestamp in id
const timestamp = id.getTimestamp();
console.log("Timestamp:", timestamp);

// validating mongodb id
const isValid = mongoose.Types.ObjectId.isValid(id);
console.log("isValid:", isValid);
