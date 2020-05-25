console.log("Before");

const user = getUser(1);
// user will be undefined here, because getUser function takes time to find user from db
console.log("User:", user);
// There are three ways to handle async code in js
// Callback
// Promise
// Async/Await

console.log("After");

function getUser(id) {
  // async code
  setTimeout(() => {
    console.log("Reading a user from database...");
    const user = { id, gitHubUsername: "iankuratri" };
    console.log(user);
    return user;
  }, 2000);
}
