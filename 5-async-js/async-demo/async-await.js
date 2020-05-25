/**
 * Async/Await: The async and await keywords enable asynchronous,
 * promise-based behavior to be written in a cleaner style,
 * avoiding the need to explicitly configure promise chains.
 */

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log("Commits:", commits);
  } catch (error) {
    console.log("Error:", error);
  }
}
displayCommits();

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
