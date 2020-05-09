// global object

// browsers has window object and node has global object

console.log(global);

// functions in global object

// setTimeout();
// clearTimeout();

// setInterval();
// clearInterval();

// variables we declare in a file are only scoped to the file,
// that are not the part of global object

const message = "hello world";
// will be undefined
console.log("Message:", global.message);
