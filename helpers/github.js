const request = require('request');
const config = require('../config.js');
const promise = require('promise')
let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

   return new Promise((resolve, reject) => {      
     request(options, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
         resolve(body)
        }
         // console.log('BODY FROM GITHUB.JS', body);
     })
   });
}

module.exports.getReposByUsername = getReposByUsername;