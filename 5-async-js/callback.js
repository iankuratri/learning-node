// Callback: A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some kind of routine or action.

getUser(1, fetchRepositories);

function fetchRepositories(user) {
  getRepositories(user.gitHubUsername, fetchCommits);
}

function fetchCommits(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log("Commits:", commits);
}

function getUser(id, callback) {
  // async code
  setTimeout(() => {
    console.log("Reading a user from database...");
    callback({ id, gitHubUsername: "iankuratri" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting user repo's from database...");
    callback(["repo 1", "repo 2", "repo 3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Getting repo commits from database...");
    callback(["commit 1", "commit 2", "commit 3"]);
  }, 2000);
}
