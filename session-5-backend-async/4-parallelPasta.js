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
	    	resolve('Success!');
	  	}, 2000);
	});
}

function addPasta() {
	console.log('Pasta in da wata~');
}

function addVeggies() {
	console.log('Veggies in da pan~');
}

async function main() {
	const allPromises = [];
	allPromises.push(boilWater());
	allPromises.push(washVeggies());
	await Promise.all(allPromises);
	addPasta();
	addVeggies();
}

main();