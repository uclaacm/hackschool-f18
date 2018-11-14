# Hackschool Session 6 Backend: Databases with Firebase
**Location**: Covel 227
**Time**: 7:30-8:30pm, November 14, 2018.

**Teacher**: Prateek Singh

## Resources

**Slides**
* [Session 6 Backend: Databases with Firebase](https://docs.google.com/presentation/d/1zZLfPrK6_qjVlIH2yVD2nagibSlYdH64HsMAWOtO_Sc/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## Today's Questions

* What is a database?
* Why are they important?
* How can I use a database in my own applications?

## Note

To preface this session, I'd like to note that this session will be more theoretical. I want to make sure everyone understands the role of a database and how to use one in their applications. Instead of the demo and exercise, you'll be able to practice the concepts you learn today (and all the concepts you've learned so far) by building the backend portion of the blog app!

## What is a database?

A database is a system that stores application data in an organized fashion. A database makes it easy to access, update, and delete our data.

## Why are they important?

So far, the applications we've written either get data from an API and do some kind of operation with it (display it on a page, use it to perform a calculation on the server, etc.) or write our manually-inputted data into a temporary array or object. The backend code for these types of applications is generally not too difficult to manage, as we only need to deal with routing and each route can have its own object or array that it uses to manage its data.

Consider an app like a Todo List. In this app we can add new tasks and cross off tasks that we've already completed. Using what you've learned so far, you can build something like this! BUT, there is one big issue. Let's say I've added a few tasks and marked some of them as completed. If I close this application and start it again, my Todo List will have no items!

Databases are very important to us because they give us the power of persistent storage to our applications.

If the tasks of a Todo List are stored in a database instead of an array managing all of the tasks, the next time we open up the application, the Todo List will be able to ask the database for the current set of tasks and remember where we left off from last time!

## How can I use a database in my own applications?

Most database systems can be installed by simply going to a website and "downloading" (i.e. like most other software, and like the way we installed Node.js during previous workshops). Likewise, they usually have a terminal / console window that can be used to interact with the database using special commands. Using these types of databases, the application data that we save is stored on our own computers.

However, today we'll be using a database that's a little different: Firebase.

Firebase is a "cloud platform", which means that it provides many services online rather than having to download them on to our computer to use locally. Our data in the Firebase database will be stored online, i.e. "on the cloud". This means that the database and all of our data inside it will be living online on a different computer. In the next steps, we'll learn how to use Firebase for the blog app we'll be making!


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
