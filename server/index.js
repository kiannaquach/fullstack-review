const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js')
// console.log('hellooooo', github)

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log('DATABASE', db.save())

  github.getReposByUsername(req.body.term)
  .then((body) => {
   db.save(JSON.parse(body));

  })
  .catch((err) => {
   console.log(err)
  });

  res.end()

});


  // console.log('success!', req.body);


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // var queryObject = {"forks_count": {$lt: 9}}
   db.Repo.find({"forks_count": {$lt: 4}}).then((data) => {
      res.send(data);
   }).catch((err) => {
      console.log('this is your err', err)
   })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

