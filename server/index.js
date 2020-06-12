const express = require('express');
let app = express();
let github = require('../helpers/github.js');
let db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // console.log("POST request body - ", req.body);
  github.getReposByUsername(req.body.search)
    .then(reposArr => {
      // console.log('---- Calls Save ----');
      // console.log('reposArr - ', reposArr)
      return db.save(reposArr);
    })
    .then(() => {
      console.log('Server dbPost Sucess');
      res.status(201).end();
    })
    .catch(err => {
      console.log('Index server error');
      res.status(400).send(err);
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // Call mongoose function to query DB ->
  db.getTopRepos();
});

let port = 1128;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

