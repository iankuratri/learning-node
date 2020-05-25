console.log("Before");

getUser(1, (user) => {
  console.log("User:", user);
  getRepositories(user.gitHubUsername, (repos) => {
    console.log("Repos:", repos);
  });
});

console.log("After");

function getUser(id, callback) {
  // async code
  setTimeout(() => {
    console.log("Reading a user from database...");
    callback({ id: id, gitHubUsername: "iankuratri" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting user repo's from database...");
    callback(["repo 1", "repo 2", "repo 3"]);
  }, 2000);
}
