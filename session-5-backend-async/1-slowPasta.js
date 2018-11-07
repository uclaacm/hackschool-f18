// To explain async functions, we're gonna start off a cooking lesson. We'll be cooking pasta with veggies, which you will hopefully do many times in your college career. 

// So first you have to boil the water. Let's say we live on some other planet where this only takes 3 seconds:

function boilWater() {
	console.log('Start boiling!');
	const start = Date.now();
	while (Date.now() < start + 3000) {}
	console.log('Water boiled!');
}

// And then let's say you can wash your veggies in 1 second:

function washVeggies() {
	console.log('Start washing!');
	const start = Date.now();
	while (Date.now() < start + 2000) {}
	console.log('Veggies washed!');
}

// And let's write functions to add our pasta and veggies:

function addPasta() {
	console.log('Pasta in da wata~');
}

function addVeggies() {
	console.log('Veggies in da pan~');
}

// So if we call these functions:
boilWater();
addPasta();
washVeggies();
addVeggies();

// This should happen:
// Start boiling! (wait 3 seconds)
// Water boiled!
// Pasta in da wata~
// Start washing! (wait 2 seconds)
// Veggies washed!
// Veggies in da pan~

