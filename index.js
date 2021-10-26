const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./db/knexfile');
//initialize knex
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/user', (req, res) => {
  knex('users')
  .select({
    id: 'id',
    name: 'name'
  })
  .then((users) => {
    return res.json(users);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })
})

app.post('/user', (req, res) => {
  const name = req.body.name ? req.body.name : '';
  const email = req.body.email ? req.body.email : '';

  if (!name) {
    return res.json({success: false, message: 'Name is required'});
  }

  knex('users')
    .insert({name, email})
    .then((id) => {
      //get user by id
      knex('users')
        .select({
          id: 'id',
          name: 'name'
        })
        .where({id})
        .then((user) => {
          return res.json(user[0]);
        })
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});