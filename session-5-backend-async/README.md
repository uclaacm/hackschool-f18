# Hackschool Session 5 Backend: Asynchronous Actions
**Location**: Covel 227  
**Time**: 7:30–8:30pm, November 7, 2018.

**Teacher**: Kristie Lim

## Resources

**Slides**
* [Session 5 Backend: Asynchronous Actions](https://docs.google.com/presentation/d/1oixjhb7YnQ9cQY65wZEDF9xLdNgFT5B_6SpPhBLcvkc/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* What "asynchronous" means
* Promises
* Async/await
* How this applies to making requests to servers

## Motivation behind asynchronous code

To explain what asynchronous means and show the motivation behind it, I'm going to use an analogy. In this analogy, we have an action that takes some time to complete--boiling water. This corresponds to actions on a computer that take time to complete, such as reading a file from the file system or getting a response from a server. 

We'll be cooking pasta with veggies, which you will hopefully do many times in your college career. 

So first you have to boil the water. Let's say this takes 3 seconds:

```js
function boilWater() {
  console.log('Start boiling!');
  const start = Date.now();
  while (Date.now() < start + 3000) {}
  console.log('Water boiled!');
}
```

Note that these two lines are just a hack-y way to simulate a delay of 3 seconds:
```js
const start = Date.now();
while (Date.now() < start + 3000) {}
```

And then let's say you can wash your veggies in 2 seconds:

```js
function washVeggies() {
  console.log('Start washing!');
  const start = Date.now();
  while (Date.now() < start + 2000) {}
  console.log('Veggies washed!');
}
```

And let's write functions to add our pasta and veggies:

```js
function addPasta() {
  console.log('Pasta in da wata~');
}

function addVeggies() {
  console.log('Veggies in da pan~');
}
```

So if we call these functions:
```js
boilWater();
addPasta();
washVeggies();
addVeggies();
```

This is going to take a total of 5 seconds, but really, it did not have to take that long.

Are you going to wait for your water to boil before you start washing your veggies?

No! Because that's stupid, and as engineers and cooks, we're all about efficiency here.

What we want to do is start boiling the water, and while the water is boiling, we start washing the veggies.

This is what **asynchronous code** is for. Using a function called `setTimeout`, let's try to wash the veggies while the water is boiling.

```js
function boilWater() {
  console.log('Start boiling!');
  setTimeout(() => {
    console.log('Water boiled!');
  }, 3000);
}
```

`setTimeout` takes two arguments, a function and a number of milliseconds. Unlike the implementation we had before, your computer will not hang while we're waiting for the water to boil. Your computer is free to do other things. After 3000 milliseconds, the function that we passed into setTimeout will be called. Note that when we pass in a function like this, the function is called a "callback". 

Okay great! Now we can wash our veggies as we boil our water:
```js
boilWater();
washVeggies();
```

But what do you think will happen if we do this?
```js
boilWater();
washVeggies();
addPasta();
```

Oh no, we put our pasta in the water before if boiled. A cooking catastrophe!
This is analogous to doing something with the data we get from the server before the data actually comes in. 
To solve this problem, we can use Promises.

## Promises

A `Promise` is an object that "represents the eventual completion (or failure) of an asynchronous operation, and its resulting value." (from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises))

The key point here is that promises offer a way to guarantee that data will be there before we do anything further. The next part is about how to create a `Promise`. We will mostly be using promises instead of creating them, but please read if you're interested.

```js
const promise = new Promise((resolve, reject) => {
  if (1 < 2) {
    resolve('Success!');
  }
  else {
    reject(new Error('Failed :('));
  }
});

const doOnSuccess = (successMessage) => {
  console.log(successMessage);
};
const doOnFailure = (failureMessage) => {
  console.log(failureMessage);
}; 

promise.then(doOnSuccess).catch(doOnFailure);
```
When you create a new `Promise`, you pass in a function. This function has two parameters, usually named `resolve` and `reject`. You call `resolve` when you want to return a value. In this case, we call `resolve` when the condition `1 < 2` is true (this is always true). 
`resolve` takes one parameter, which is the value you want to return. 

More common, you can also put the function in .then() without naming it.
```js
promise.then((successMessage) => {
  console.log(successMessage);
}.catch((failureMessage) => {
  console.log(failureMessage);
});
```

Let's apply this to the pasta problem:
```js
function boilWater() {
  console.log('Start boiling!');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Water boiled!');
      resolve();
    }, 3000);
  });
}

boilWater().then(() => {
  addPasta();
});
```

`boilWater` returns a `Promise` that resolves after 3 seconds. Since `addPasta` is called inside of `.then()`, it will only happen after the `Promise` is resolved. So you will always add the pasta after the water has been boiled. 

## Try it yourself!
Rewrite washVeggies so it returns a Promise and make sure your veggies are washed before you add them (although tbh I have failed doing this before bc I'm a terrible cook).
Your output should be:
```
Start boiling!
Start washing!
Veggies washed!
Veggies in da pan~
Water boiled!
Pasta in da wata~
```

## Async/await

There are two keywords `async` and `await` that make your code look a lot cleaner. 

You use `async` when you declare a function. It means that the function will return a `Promise`. Even if you don't explicitly return a `Promise`, an async function will return a `Promise`.

```js
async function f() {
  return 1;
}

f().then((result) => {
  console.log(result); // should log 1
});
```

You use `await` before a promise. This keeps the JavaScript from continuing to execute until the promise is resolved, but the CPU can still do other jobs. 

**Important!** You can only use `await` inside of an `async` function.

```js
async function f() {
  return 1;
}

async function main() {
  let result = await f(); // waits until result is filled before moving on
  console.log(result);
}

main();
```

With `await`, we don't need to nest a bunch of `.then()`'s.
This is another way to call the pasta functions so that we will add the pasta after we boil the water.

```js
async function main() {
  await boilWater();
  addPasta();
  await washVeggies();
  addVeggies();
}

main();
```

If we run this, you might notice that it still takes 5 seconds to complete.
How can we run boilWater and washVeggies in parallel?
We can push the two returned promises onto an array and then use `Promise.all()`:
```js
async function main() {
  const allPromises = [];
  allPromises.push(boilWater());
  allPromises.push(washVeggies());
  await Promise.all(allPromises);
  addPasta();
  addVeggies();
}
```

Let's boil 5 pots of water at a time!
```js
async function main() {
  const allPromises = [];
  for (let i = 0; i < 5; i++) {
    allPromises.push(boilWater());
  }
  await Promise.all(allPromises);
  console.log('Done!')
}
```

Another important thing to note about promises is that they can resolve into values. This value can be a string, number, object, etc... Let's have the `Promise` returned by `boilWater` return a success message:
```js
function boilWater() {
  console.log('Start boiling!');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Water boiled!');
      resolve('Success!');
    }, 3000);
  });
}
```
To access this message, save the return result of boilWater() to a variable:
```js
const message = await boilWater();
console.log(message);
```

## Finally! Let's make a request to a server

We're going to use the npm module node-fetch to do this.
First navigate to your folder using `cd`.
Then create a package.json with the command:
```shell
npm init
```
Hit enter for all the default values.

Then install the node-fetch library:
```shell
npm install node-fetch --save
```

In a new file:
```js
const fetch = require('node-fetch');

async function getJokeFromServer() {
  const res = await fetch('http://api.icndb.com/jokes/random');
  return res.json();
}

async function main() {
  const jsonFromServer = await getJokeFromServer();
  // Uncomment the following lines if you want to see the json data you got from the server
  // console.log('This is from the server:');
  // console.log(jsonFromServer);
  console.log(jsonFromServer.value.joke);
}

main();
```

`fetch` returns a promise that is resolved when the first piece of data comes back from the server. It takes in the URL of the data you want to access. (If you came to our previous backend sessions, we made requests to servers using Postman. We are doing the exact same thing here inside Node.)

`res.json()` returns a promise that is resolved to the json data from the server.

What if we want to ask for many jokes at the same time?
```js
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
```

Neat!
```
When Chuck Norris falls in water, Chuck Norris doesn't get wet. Water gets Chuck Norris.
```

## With Express

Remember in previous sessions, we used Express to serve data. Let's serve some data from the Internet Chuck Norris Database!

Install Express:
```shell
npm install express --save
```

In a new file called `index.js`:
```js
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
  res.send(joke);
});

app.listen(3000);
```

To start your server from the command line:
```shell
node ./index.js
```
