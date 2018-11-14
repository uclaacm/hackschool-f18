'use strict';

const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

admin.initializeApp({
	credential: admin.credential.cert(require('../firebase-key.json')),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const postsCollection = db.collection('posts');

// Converts a Firebase document to a JavaScript object we could JSON-stringify.
function docSnapshotToData(doc) {
	const { title, body, creationTime } = doc.data();
	return {
		id: doc.id,
		title,
		body,
		creationTime: creationTime.toMillis(),
	};
}

// post is an object with the following fields:
// - title (string)
// - body (string): body of the post in HTML
async function addPost(post) {
	const doc = await postsCollection.add({
		title: post.title,
		body: post.body,
		creationTime: FieldValue.serverTimestamp(),
	});
	return doc.id;
}

async function getPost(id) {
	const doc = await postsCollection.doc(id).get();
	if (!doc.exists) {
		return null;
	}
	return docSnapshotToData(doc);
}

async function getCurrentPosts() {
	const snapshot = await postsCollection.orderBy('creationTime', 'desc').get();
	return snapshot.docs.map(docSnapshotToData);
}

async function deletePost(id) {
	return postsCollection.doc(id).delete();
}

module.exports = {
	addPost,
	getPost,
	getCurrentPosts,
	deletePost,
};
