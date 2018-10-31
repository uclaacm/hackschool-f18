# Hackschool Session 4 Backend: Introduction to Express
**Location**: Covel 227  
**Time**: 7:30–8:30pm, October 31, 2018.

**Teacher**: Timothy Gu ([@TimothyGu](https://github.com/TimothyGu))

## Resources

**Slides**
* [Session 4 Backend: Intro to Express](https://docs.google.com/presentation/d/1an6ZLx0g-eRDSchPjTg34yiSvxHBo_3w18jizYduuHU/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* More on Node.js' `require()`
* Splitting a web server into several different pieces

## More on `require()`

Let's create a new directory on the desktop. In this document, we will call it
`hackschool-session-4-backend`, but you can use any name of your choosing.

In this directory, let's first create a file called **`math.js`** with the
following content. This is the file that we are going to `require()` from the
`index.js`.

```js
module.exports = {
  add: (x, y) => {
    return x + y;
  },

  square: (x) => {
    return x * x;
  },

  pi: 3.1415926535897932,
};
```

Then create an **`index.js`** file containing:

```js
const math = require('./math.js');

console.log(math.add(3, 4));
console.log(math.pi * math.square(5));
```

Let's unpack what this does. When we run `node index.js`, Node.js will execute
`require('./math.js')`. It then runs `math.js`, taking whatever value we set
`module.exports` to, and returns that value as the return value of the
`require()` call.

In this case, we set `math.js`'s `module.exports` to an object containing three
properties: `add`, `square`, and `pi`. In `index.js`, we create a constant
variable `math`, setting it to the return value of `require()`. In other words,
`math` in `index.js` _is_ the object containing the three properties we created
in `math.js`. We can then access the object's properties in `index.js` as if we
created the object in `index.js`.

What's crucial to understand here is that the `module` (and therefore
`module.exports`) value is specific to that file. If I try to access
`module.exports` in `index.js`, that object will be different from `math`,
which is `math.js`'s version of `module.exports`.

> The `module` object has some other useful information specific to that file.
> For further reading, check out ["The `module`
> Object"](https://nodejs.org/api/modules.html#modules_the_module_object) in
> the Node.js documentation.

Note, `module.exports` doesn't have to be set to an object. In fact, I could
have a `pi.js` containing `module.exports = 3.1415926535897932;`, and any file
that `require('./pi.js')` file will receive the value of the mathematical
constant _π_!

One last thing, these `require()`'d files can themselves `require()` other
files. For example, assuming I were to create a `pi.js` as described above,
instead of writing `pi: 3.14…` in `math.js` I could do

```js
const pi = require('./pi.js');

module.exports = {
  // ...

  pi: pi,
};
```

## Express Router

Okay, now let's get to actually writing our blog backend! Let's first create a
skeleton for `index.js`.

```js
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000);
```

Let us now look at how to implement `routes/user.js`.

```js
const express = require('express');
const router = new express.Router();

const users = new Map();

router.post('/', (req, res) => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400); // Bad Request
    res.json({ message: 'A user must have a name' });
    return;
  }

  if (users.has(name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(name, { name: name })
  res.status(201); // Created
  res.json({ message: 'User created' });
});

router.get('/:user', (req, res) => {
  const user = users.get(req.params.user);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

module.exports = router;
```
