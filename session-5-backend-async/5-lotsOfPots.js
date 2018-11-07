function boilWater() {
	console.log('Start boiling!');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
	    	console.log('Water boiled!');
	    	resolve();
	  	}, 3000);
	});
}

async function main() {
	const allPromises = [];
	for (let i = 0; i < 5; i++) {
		allPromises.push(boilWater());
	}
	await Promise.all(allPromises);
	console.log('Done!')
}

main();