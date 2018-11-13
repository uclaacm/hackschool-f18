'use strict';

const express = require('express');

const postsRouter = require('./routes/posts.js');

const PORT = 8080;

const app = express();

app.use(express.json());

app.use('/posts', postsRouter);

app.listen(PORT, () => {
	console.log('App is running on port ' + PORT);
});
