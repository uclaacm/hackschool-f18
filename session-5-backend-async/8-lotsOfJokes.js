const fetch = require('node-fetch');

// fetch returns a promise that is resolved when the first piece of data comes back from the server.
// res.json() returns a promise that is resolved to the json data from the server
async function getJokeFromServer() {
	const res = await fetch('http://api.icndb.com/jokes/random');
	return res.json();
}

async function main() {
	const allPromises = [];
	for (let i = 0; i < 5; i++) {
		allPromises.push(getJokeFromServer());
	}
	const allJokes = await Promise.all(allPromises);
	for (const jsonFromServer of allJokes) {
		console.log(jsonFromServer.value.joke);
	}
}

main();