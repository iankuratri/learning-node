// Promise: Holds the eventual result of an asynchronous operation

getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("commits:", commits))
  .catch((error) => console.log("Error:", error.message));

function getUser(id) {
  return new Promise((resolve, reject) => {
    // async code
    setTimeout(() => {
      console.log("Reading a user from database...");
      resolve({ id, gitHubUsername: "iankuratri" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting user repo's from database...");
      resolve(["repo 1", "repo 2", "repo 3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting repo commits from database...");
      resolve(["commit 1", "commit 2", "commit 3"]);
    }, 2000);
  });
}
