const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', function(err, res) {
  if (err) {
    console.log('you suck')
  } else {
    console.log('helo it works databases')
  }
});

let repoSchema = mongoose.Schema({
  "user": String,
  "name": String,
  "forks_count": Number,
  "followers_count": Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // id => unique of id
  // login contains url "https://api.github.com/users/octocat"
  // add the repo name at the end of url
  // need username for display
   for (var i = 0; i < data.length; i++) {
      // console.log(data[i].owner.url)
      // console.log(data[i].owner.login)
        var repos = new Repo({
         'user': data[i]['owner']['login'],
         'name': data[i]['name'],
         'forks_count': data[i]['forks_count'],
         'followers_count': data[i]['watchers_count']
        });

        // var person = data[i];

        repos.save(function(err,data) {
          console.log('dataa-----', data)
        }).then(function(person) {
          console.log('SUCCESS', person)
        }).catch(function(err) {
          console.log(err)
        });
   }


}

module.exports.save = save;
module.exports.Repo = Repo;