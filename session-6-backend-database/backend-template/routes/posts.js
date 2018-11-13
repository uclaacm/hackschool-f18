'use strict';

const express = require('express');
const router = express.Router();
const {
	addPost,
	getPost,
	getCurrentPosts,
	deletePost,
} = require('../database/index.js');

/**
* endpoint: /
* method: GET
* description: Get all posts in chronological order, latest first
* responses: an array of blog object 
* blog: { id: string, title: string, body: string, creationTime: JS-timestamp }
*/
router.get('/', async (req, res, next) => {
	try {
		res.json(await getCurrentPosts());
	} catch (err) {
		next(err);
	}
});

/**
* endpoint: /
* method: POST
* description: Create a new blog post
* body: { title: string, body: string }
* responses: { message: 'ok' }
*/
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
router.get('/:id', async (req, res, next) => {
	try {
		const post = await getPost(req.params.id);
		if (post === null) {
			res.status(404).json({ message: 'not found' });
			return;
		}
		res.json(post);
	} catch (err) {
		next(err);
	}
});

/**
* endpoint: /:id
* method: DELETE
* description: Delete a blog post with ID == id
* responses: { message: 'ok' } (200)
*/
router.delete('/:id', async (req, res, next) => {
	try {
		await deletePost(req.params.id);
		res.json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
});

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
