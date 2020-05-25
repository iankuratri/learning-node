// Settled promises

const alreadyResolved = Promise.resolve({ id: 1, name: "ankur" });
alreadyResolved.then((result) => console.log("Result:", result));

const alreadyRejected = Promise.reject(new Error("Something went wrong."));
alreadyRejected.catch((error) => console.log("Error:", error.message));

// Running parallel promises

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    // reject(new Error("Something went wrong..."));
    resolve(2);
  }, 2000);
});

/**
 * The Promise.race() method returns a promise that fulfills or rejects
 * as soon as one of the promises in an iterable fulfills or rejects,
 * with the value or reason from that promise.
 */

Promise.race([p1, p2])
  .then((result) => console.log("Result from Promise.race:", result))
  .catch((error) => console.log("Error from Promise.race:", error.message));

/**
 * The Promise.all() method is actually a promise that takes
 * an array of promises(an iterable) as an input.
 * It returns a single Promise that resolves when
 * all of the promises passed as an iterable
 */

Promise.all([p1, p2])
  .then((result) => console.log("Result from Promise.all:", result))
  .catch((error) => console.log("Error from Promise.all:", error.message));

/**
 * The Promise.allSettled() method returns a promise that resolves
 * after all of the given promises have either fulfilled or rejected,
 * with an array of objects that each describes the outcome of each promise.
 */

Promise.allSettled([p1, p2])
  .then((result) => console.log("Result from Promise.allSettled:", result))
  .catch((error) =>
    console.log("Error from Promise.allSettled:", error.message)
  );
