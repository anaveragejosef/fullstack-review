const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      // Add the config token to the config vars
      // process.env.TOKEN
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  // Build out axios request
  return axios(options)
    .then(response => {
      // console.log('Response received');
      // console.log('Axios response.data - ', response.data);
      return response.data;
    })
    .catch(err => {
      return err;
    });

}

module.exports.getReposByUsername = getReposByUsername;