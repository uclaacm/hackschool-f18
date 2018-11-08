const fetch = require('node-fetch');
const express = require('express');
const app = express();

async function getJokeFromServer() {
	const res = await fetch('http://api.icndb.com/jokes/random');
	return res.json();
}

app.get('/', async (req, res) => {
	const jsonFromServer = await getJokeFromServer();
	const joke = jsonFromServer.value.joke;
	res.end(joke);
});

app.listen(3000);
