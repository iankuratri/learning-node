console.log("Before");

fetchUser(1, getRepositories);

function getRepositories(user) {
  fetchRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  fetchCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log("Commits:", commits);
}

console.log("After");

function fetchUser(id, callback) {
  // async code
  setTimeout(() => {
    console.log("Reading a user from database...");
    callback({ id, gitHubUsername: "iankuratri" });
  }, 2000);
}

function fetchRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting user repo's from database...");
    callback(["repo 1", "repo 2", "repo 3"]);
  }, 2000);
}

function fetchCommits(repo, callback) {
  setTimeout(() => {
    console.log("Getting repo commits from database...");
    callback(["commit 1", "commit 2", "commit 3"]);
  }, 2000);
}
