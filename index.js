// app.js
const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(5500, () => {
  console.log('listening on 5500');
});
