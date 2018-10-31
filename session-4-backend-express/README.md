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

### User endpoints

Let us now look at how to implement `routes/user.js`. Let's first think of how we
would do it if it were an app by itself:

```js
const express = require('express');
const app = express();

const users = new Map();

app.use(express.json());

app.post('/user', (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: 'User created' });
});

app.get('/user/:user', (req, res) => {
  const user = users.get(req.params.user);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

app.listen(3000);
```

> A `Map` object is like a dictionary, mapping from one value to another. It is
> like an object in that it also represents a collection of key-value pairs,
> but is faster for data storage.

### Introducing `express.Router`

However, we notice that in our case, the `/user` endpoints are not an app by
themselves. In fact, they are only part of the bigger blog app, and will later
be `require()`'d by `index.js`.

Express supports this use case through `express.Router()`. By calling that
function, it creates a "router" object that is functionally similar to the
`app` object we get by calling `express()`, but the resultant object doesn't
allow calling `.listen()` on it. This is perfect for our use case, since the
router would represent part of an app rather than an app in itself, and we
would only listen on one port rather than many.

We make the following changes, with the red lines that start with `-`
indicating lines to delete and the green lines starting with `+` indicating
lines to add in their place.

```diff
-const app = express();
+const router = express.Router();
```

```diff
-app.use(express.json());
```

This is a tricky one. We know that we will be using the `/user` endpoints from
`index.js`, and `index.js` already includes this line. That's why we don't need
this in `routes/user.js` anymore and can delete it.

```diff
-app.post('/user', (req, res) => {
+router.post('/user', (req, res) => {
```
 
```diff
-app.get('/user/:user', (req, res) => {
+router.get('/user/:user', (req, res) => {
```

```diff
-app.listen(3000);
+module.exports = router;
```

Note, instead of running the web app, we are exporting the `router` object we
created.

### Using user endpoints in the main app

What we will then do in `index.js` is to utilize the `/user` endpoints we wrote
in `routes/user.js`.

```js
const express = require('express');
const userEndpoints = require('./routes/user.js');

const app = express();

app.use(express.json());

app.use(userEndpoints);

app.listen(3000);
```

### Scoping `/user` endpoints to a specific router

What we now notice is that all endpoints in `routes/user.js` start with
`/user`, which can seem redundant. Express allows us to remove that redundancy
by _scoping_ only `/user` requests to that router.

We first change `index.js` to account for this change, by adding another
argument to `app.use()`:

```diff
app.use('/user', userEndpoints);
```

With that done, we can now remove the extraneous `/user` bits from
`routes/user.js`.

```diff
-router.post('/user', (req, res) => {
+router.post('/', (req, res) => {
```

```diff
-router.get('/user/:user', (req, res) => {
+router.get('/:user', (req, res) => {
```

----

What we should now have is:

**`index.js`**

```js
const express = require('express');
const userEndpoints = require('./routes/user.js');

const app = express();

app.use(express.json());

app.use('/user', userEndpoints);

app.listen(3000);
```

**`routes/user.js`**

```js
const express = require('express');
const router = express.Router();

const users = new Map();

router.post('/', (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: 'User already exists' });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: 'User created' });
});

router.get('/:user', (req, res) => {
  const userObj = users.get(req.params.user);
  if (userObj !== undefined) {
    res.json(userObj);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'User not found' });
  }
});

module.exports = router;
```

### More scopes, more endpoints

With all the `/user` endpoints done, we can now create the `/post` endpoints.
We create a new file **`routes/post.js`**, and in it we will just copy the
content from `routes/user.js`, as they are very similar. However, there are a
few modifications necessary:

1. We will rename all the variables called `user` to instead say `post`.

2. We will also change the key when we use the map to be
   <code><var>user</var>/<var>post</var></code> rather than just the username,
   as we want to allow different users to post their own posts with the same
   name.

3. Finally, we will allow another key in the body for `POST /post/:user`,
   `content`, which is the content of the post.

We should get something like this:

```js
const express = require('express');
const router = express.Router();

const posts = new Map();

// POST /post/:user
router.post('/:user', (req, res) => {
  const body = req.body;
  const key = req.params.user + '/' + body.name;

  if (posts.has(key)) {
    res.status(400); // Bad Request
    res.json({ message: 'Post already exists' });
    return;
  }

  posts.set(key, {
    name: body.name,
    content: body.content
  });
  res.status(201); // Created
  res.json({ message: 'Post created' });
});

// GET /post/:user/:post
router.get('/:user/:post', (req, res) => {
  const postObj = posts.get(req.params.user + '/' + req.params.post);
  if (postObj !== undefined) {
    res.json(postObj);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: 'Post not found' });
  }
});

module.exports = router;
```

Similarly, we will modify `index.js` to account for the new `/post` endpoints.

```js
const postEndpoints = require('./routes/post.js');

// ...

app.use('/post', postEndpoints);
```
