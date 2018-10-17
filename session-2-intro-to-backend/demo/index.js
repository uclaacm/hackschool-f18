const express = require('express');
const app = express();

app.get('/mypage', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/random', (request, response) => {
  response.send('<!DOCTYPE html><html><body>Your random number is: ' + Math.random() + '</body></html>');
  response.end();
});

app.listen(3000);
