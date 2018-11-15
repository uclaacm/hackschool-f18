# Hackschool Session 6 Frontend: Dynamic Content
**Location**: Covel 227
**Time**: 6:15-7:15pm, November 14, 2018.

**Teacher**: Prateek Singh

## Resources

**Slides**
* [Session 6 Frontend: Databases with Firebase](https://docs.google.com/presentation/d/1izU_-yczSm9IJa__8trmClNN0UMSajW-uA4f5kgO37E/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## Today's Topics

* Review React
* What is dynamic content?
* Dynamic content with fetch

## Note

Since today's workshop will be used to help you get started on the final project, instead of doing a stand-alone demo, the code we'll be writing today will help you practice what I've taught today and it'll be part of your final blog app.

## Review React

In the last session, we learned why people use React for frontend development today. Then, we learned javascript classes as a foundation for learning how to write React components. With components, we learned about the importance of props and state. Here are the most important takeaways from our previous lecture on React.

1. React lets us write reusable pieces of front-end code called *components*.
2. Components are like "custom HTML tags" that can be used inside other HTML tags or even other components.
3. Components don't have to be the same every time - they can be passed data through a custom *attribute* which gives data to the component's *props*.
4. Each component keeps track of some data that is only used for itself, this data is tracked in the *state* object.
5. The props of a component are passed down to child components, but never in the other direction.

## What is dynamic content?

This quarter, we've been learning how to build web applications - websites that have some client-server communication. In all of the demos we've done so far our applications have

## 




## Blog App Backend

First, you'll want to download the backend template project for the blog app. If you are viewing this README on GitHub, just scroll to the top of the page and click the green button. You will have the option of using `git clone` or downloading the folder as a zip file.

## Set up the Firebase Account

Since Firebase is an online platform, we'll need to make an account through Google to be able to connect our application to the online database we make. Please follow these steps:

1. Go to the [Firebase website](firebase.google.com)
2. Make a Google account if you do not already have one, otherwise sign in with your account
3. Click "Go To Console" on the home page
4. Create a new project by clicking "Add project"
5. In your new project, click the gear symbol next to "Project Overview" and click "Project settings"
6. There should be a row of tabs at the top of the page, please click on "Service accounts"
7. On this page, click on "Generate new private key" on the bottom of the page; this will download a file with information that will help our blog application connect to our online Firebase database. Rename this file to "firebase-key.json" and save it in the blog template folder you downloaded in the previous step.
8. Finally, click on the "Database" section from the sidebar on the left
9. Here, make sure that the dropdown next to the "Database" header on the page is set to "Cloud Firestore" rather than "Realtime Database"

Now, if you look at the file we just downloaded, you'll notice that it contains many pieces of identification and administration information in one big JSON object. Firebase has taken care of generating all of this for us, and don't worry if you don't understand what each field means - our application code will make it easy for us to use this information to connect to the database.

## Integrating Firebase in our Application Code

First, make sure we have all of our project dependencies locally by running `npm install` in the backend-template folder. Then, within this folder, find the "database" folder and open up the `index.js` file. All of the code we'll write today will be in this file.

At the top of the file, we'll need to tell our application that we have administrator access to a Firebase database. We can do this by showing our application proof - the `firebase-key.json` file.

```javascript
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

admin.initializeApp({
	credential: admin.credential.cert(require('../firebase-key.json')),
});
```
Next, we need to create a variable that has access to the actual database that we've created. Then, we'd like to create a collection called "posts" in the database.

``` javascript
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const postsCollection = db.collection('posts');
```

**Aside**

On top of being quick to set up, Firebase is supported by very thorough and readable documentation. For instance, almost everything I've explained so far can be found in the Firebase documentation on a single page [here](https://firebase.google.com/docs/admin/setup). There are many Firebase details, and I may not be able to cover them all in the time that we have. For anything you are not clear about, please read the documentation as it should be able to solve most of your issues.

Remember that Firebase stores data objects as "documents" while we use javascript objects in the code that we write. To make sure we can use what Firebase gives us, we need to write a function to convert between data formats.

``` javascript
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
```

## Writing Database Code

Finally, we get to show interaction between data in our online database and code in our application. We can't have a blog without being able to write posts! Let's write a function to do this.

``` javascript
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
```
There's a few things to note here. Remember that we use async functions for operations that may take a long time. Writing to, deleting from, and updating a database takes time. This means that whenever we want to change the state of the database or ask it for some data, its best to write async functions. The `FieldValue` is used to keep track of when a post was created on the database, you can read more about it [here](https://firebase.google.com/docs/reference/js/firebase.firestore.FieldValue).

With this implemented, let's start the blog app and see what we have so far. Please follow these steps:

To start the backend,

```shell
cd backend
npm install
node index.js
```
Remember, `cd` should be `dir` in Windows CMD.

To start the frontend,
```shell
cd ..
cd frontend
npm install
npm start
```

You should be able to see app at localhost:3000

Let's try to COMPOSE a post on this page. After you've done so, what do you notice? We can't see the post! Let's head over to our Firebase console to see what's happening. Click on "Database" on the left sidebar. What do you notice now?

You've learned how to save application data onto a database! Unfortunately, this is all we have time for today. Get started on the rest of the blog!!!

## Finishing the Blog App

With the backend-template project we've been working on in today's workshop, all of the front end code has been provided to you. However, there are many gaps in the backend code that need to be completed. In the `index.js` file and the "routes" folder's `posts.js` file we've written many TODOs where code needs to be added. You'll have the next few weeks to fill out this code to get all of the features of the blog app working.
