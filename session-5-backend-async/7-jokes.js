const fetch = require('node-fetch');

// fetch returns a promise that is resolved when the first piece of data comes back from the server.
// res.json() returns a promise that is resolved to the json data from the server
async function getJokeFromServer() {
	const res = await fetch('http://api.icndb.com/jokes/random');
	return res.json();
}

async function main() {
	const jsonFromServer = await getJokeFromServer();
	// Uncomment the following lines if you want to see the json data you got from the server
	// console.log('This is from the server:');
	// console.log(fromServer);
	console.log(jsonFromServer.value.joke);
}

main();