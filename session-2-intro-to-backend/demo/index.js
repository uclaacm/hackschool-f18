const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/hello.html');
})

app.listen(3000)
