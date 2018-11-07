// This is going to take a total of 4 seconds, but really, it did not have to take that long.

// Are you going to wait for your water to boil before you start washing your veggies?

// No! Because that's stupid, and as engineers and cooks, we're all about efficiency here.

// What we want to do is start boiling the water, and while the water is boiling, we start washing the veggies.

// This is what asynchronous code is for. Using a function called setTimeout, let's try to wash the veggies while the water is boiling.

function boilWater() {
	console.log('Start boiling!');
	setTimeout(() => {
    	console.log('Water boiled!');
  	}, 3000);
}

function washVeggies() {
	console.log('Start washing!');
	const start = Date.now();
	while (Date.now() < start + 2000) {}
	console.log('Veggies washed!');
}

function addPasta() {
	console.log('Pasta in da wata~');
}

function addVeggies() {
	console.log('Veggies in da pan~');
}

// setTimeout takes two arguments, a function and a number of milliseconds.
// Unlike the implementation we had before, your computer will not hang while we're waiting for the water to boil.
// It is free to do other things.
// After 3000 milliseconds, the function that we passed into setTimeout will be called. Note that when we pass in a function like this, the function is called a "callback". 

// Okay great! Now we can wash our veggies as we boil our water:
// boilWater();
// washVeggies();

// But what do you think will happen if we do this?
boilWater();
washVeggies();
addPasta();

// Oh no, we put our pasta in the water before if boiled. A cooking catastrophe!