
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const server = express();
const PORT = 3030;
const USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.use(bodyParser.json());

server.get('/compare', (req,res) => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(value => value.json())
    .then(value => {
      res.status(STATUS_SUCCESS);
      res.send(value.bpi.USD.rate);
    })
    .catch(err => {
      res.status(USER_ERROR);
      res.send({err: err})
    });
});

server.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`)
});