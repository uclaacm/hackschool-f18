# Hackschool Session 6 Backend: Databases with Firebase
**Location**: Covel 227
**Time**: 7:30-8:30pm, November 14, 2018.

**Teacher**: Prateek Singh

##Resources

**Slides**
* [Session 6 Backend: Databases with Firebase](https://docs.google.com/presentation/d/1zZLfPrK6_qjVlIH2yVD2nagibSlYdH64HsMAWOtO_Sc/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## Today's Questions

* What is a database?
* Why are they important?
* How can I use a database in my own applications?

## What is a database?

A database is a system that stores application data in an organized fashion. A database makes it easy to access, update, and delete our data.

## Why are they important?

So far, the applications we've written either get data from an API and do some kind of operation with it (display it on a page, use it to perform a calculation on the server, etc.) or write our manually-inputted data into a temporary array or object. The backend code for these types of applications is generally not too difficult to manage, as we only need to deal with routing and each route can have its own object or array that it uses to manage its data.

Consider an app like a Todo List. In this app we can add new tasks and cross off tasks that we've already completed. Using what you've learned so far, you can build something like this!. BUT, there is one big issue. Let's say I've added a few tasks and marked some of them as completed. If I close this application and start it again, my Todo List will have no items!

Databases are very important to us because they give us the power of persistent storage to our applications.

If the tasks of a Todo List are stored in a database instead of an array managing all of the tasks, the next time we open up the application, the Todo List will be able to ask the database for the current set of tasks and remember where we left off from last time!

## How can I use a database in my own applications?

Most database systems can be installed by simply going to a website and "downloading" (i.e. like most other software, and like the way we installed Node.js during previous workshops). Likewise, they usually have a terminal / console window that can be used to interact with the database using special commands. Using these types of databases, the application data that we save is stored on our own computers.

However, today we'll be using a database that's a little different: Firebase.

Firebase is a "cloud platform", which means that it provides many services online rather than having to download them on to our computer to use locally. Our data in the Firebase database will be stored online, i.e. "on the cloud". This means that the database and all of our data inside it will be living online on a different computer. In the next steps, we'll learn how to use Firebase for the blog app we'll be making!


## Blog App Backend

First, you'll want to download the backend template project for the blog app. If you are viewing this README on GitHub, just scroll to the top of the page and click the green button. You will have the option of using `git clone` or downloading the folder as a zip file.


## Set up Firebase Account

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







## Run the demo

First clone the repository from this github using `git clone`. Read more about it [here](https://git-scm.com/docs/git-clone).

Make sure you have [set up a Firebase project](https://firebase.google.com/). 
Click on "GET STARTED" and follow along.

In the Firebase console, click on the setting button, go to "project settings". 
Click on Service accounts and click "Generate new private key".

Rename the downloaded JSON file to `firebase-key.json`.
Put this JSON file into the directory`18HackschoolFinalProject/backend/` that we just cloned from GitHub.

To start the backend, 

```shell
cd 18FHackschoolFinalProject
cd backend
npm install
node index.js
```
`cd` should be `dir` in Windows CMD.

To start the frontend,
```shell
cd ..
cd frontend
npm install
npm start
```

You should be able to see app at localhost:3000


