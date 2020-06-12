const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  githubHandle: String,
  repoName: String,
  repoId: {
    type: Number,
    unique: true
  },
  repoUrl: String,
  repoSize: Number,
  favorites: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // Create an array of promises based on the Repo data
  var repoPromise = reposArr.map(repo => {
    var nextRepo = new Repo({
      githubHandle: repo.owner.login,
      repoName: repo.name,
      repoId: repo.id,
      repoUrl: repo.html_url,
      repoSize: repo.size,
      favorites: repo.stargazers_count
    });
    return nextRepo.save()
  });
  // Return the promise once all repos have completed
  return Promise.all(repoPromise);
}

// Write function to search DB in Mongoose
var getTopRepos = () => {
  var q = Repo.
    find({}).
    sort({size: -1}).
    limit(25);

  console.log(q);


}
  // Sort the results by size in descending order
    // Grab the first 25
    // If there are less than 25, grab the length of the results
    // Return/Send sorted results

module.exports.save = save;
module.exports.getTopRepos = getTopRepos;