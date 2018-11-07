// Let's have boilWater return a Promise object. We'll see how to use this when we call the function.

function boilWater() {
	console.log('Start boiling!');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
	    	console.log('Water boiled!');
	    	resolve();
	  	}, 3000);
	});
}

function washVeggies() {
	console.log('Start washing!');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
	    	console.log('Veggies washed!');
	    	resolve();
	  	}, 2000);
	});
}

function addPasta() {
	console.log('Pasta in da wata~');
}

function addVeggies() {
	console.log('Veggies in da pan~');
}

// To fix this, we use .then() to guarantee that our water is boiled before we add the pasta.
// addPasta will not be called unless the Promise we returned in boilWater is resolved. 
boilWater().then(() => {
	addPasta();
});
washVeggies().then(() => {
	addVeggies();
});

// We can also use async/await syntax to do the same thing:
async function main() {
	await boilWater();
	addPasta();
	await washVeggies();
	addVeggies();
}
main();