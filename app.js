const express = require('express');
const app = express();

const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
