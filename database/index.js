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
  console.log('In DB Index');
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

  return Promise.all(repoPromise);

  var nextRepo = new Repo({
    githubHandle: reposArr[0].owner.login,
    repoName: reposArr[0].name,
    repoId: reposArr[0].id,
    repoUrl: reposArr[0].html_url,
    repoSize: reposArr[0].size,
    favorites: reposArr[0].stargazers_count
  });
  return nextRepo.save()
    .then(() => console.log('Sucessful save'))
    .catch(err => console.log("Error on save", err));
}

module.exports.save = save;