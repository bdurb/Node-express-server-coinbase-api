
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const server = express();
const PORT = 3030;
const USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.use(bodyParser.json());


server.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`)
});