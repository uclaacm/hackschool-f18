function boilWater() {
	console.log('Start boiling!');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
	    	console.log('Water boiled!');
	    	resolve('Success!');
	  	}, 3000);
	});
}

async function main() {
	const message = await boilWater();
	console.log(message);
}

main();