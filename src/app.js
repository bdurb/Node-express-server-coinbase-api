
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const server = express();
const PORT = 3030;
const USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.use(bodyParser.json());


server.get('/compare', (req, res) => {
  fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(yesterday => yesterday.json())
    .then(yesterday => {
      yesterday = Object.values(yesterday.bpi)[0];
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(now => now.json())
        .then(now => {
          now = now.bpi.USD.rate_float;
          const difference = Number((now - yesterday).toFixed(4));
          res.status(STATUS_SUCCESS)
          difference < 0 ? res.send(`Value has dropped ${difference}`) : res.send(`Value has increased by ${difference}`);
        })})
        .catch(err => {
          res.status(USER_ERROR)
          res.send({err: err})
      })
    .catch(err => {
      res.status(USER_ERROR)
      res.send({err: err})
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`)
});