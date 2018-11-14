'use strict';

const express = require('express');
const router = express.Router();
const {
	addPost,
	//getPost,
	//getCurrentPosts,
	//deletePost,
} = require('../database/index.js');

/**
* endpoint: /
* method: GET
* description: Get all posts in chronological order, latest first
* responses: an array of blog object
* blog: { id: string, title: string, body: string, creationTime: JS-timestamp }
*/

// TODO: add a route at '/' that returns to the frontend a list of all of the posts as JSON objects


/**
* endpoint: /
* method: POST
* description: Create a new blog post
* body: { title: string, body: string }
* responses: { message: 'ok' }
*/

// TODO: add a route at '/' that lets the frontend create a post on the database
router.post('/', async (req, res, next) => {
	try {
		const id = await addPost(req.body);
		res.end(id);
	} catch (err) {
		next(err);
	}
});

/**
* endpoint: /:id
* method: GET
* description: Get one post with ID == id
* responses: 
*   - one blog object (200)
*   - { message: 'not found' } (400)
* blog: { id: string, title: string, body: string, creationTime: JS-timestamp }
*/

// TODO: add a route at '/:id' that lets the frontend retrieve a single post from the database


/**
* endpoint: /:id
* method: DELETE
* description: Delete a blog post with ID == id
* responses: { message: 'ok' } (200)
*/

// TODO: add a route at '/:id' that lets the frontend delete a single post from the database based on a given 'id'


// Register an error handler as well.
router.use((err, req, res) => {
	try {
		// Normally, we try to send out a nice error.
		res.status(500).json({ message: err.message });
	} catch(e) {
		// However, if that fails, we try to just end the response immediately.
		try {
			res.end();
		} catch(e) {
			// If even _that_ fails, we just ignore any error.
		}
	}
});

module.exports = router;
