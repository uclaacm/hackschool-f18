# Hackschool Session 6 Frontend: Dynamic Content
**Location**: Covel 227
**Time**: 6:15-7:15pm, November 14, 2018.

**Teacher**: Prateek Singh

## Resources

**Slides**
* [Session 6 Frontend: Dynamic Content](https://docs.google.com/presentation/d/1izU_-yczSm9IJa__8trmClNN0UMSajW-uA4f5kgO37E/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## Today's Topics

* Review React
* What is dynamic content?
* Dynamic content with fetch

## Note

Since today's workshop will be used to help you get started on the final project, instead of doing a stand-alone demo, the code we'll be writing today will directly implement some of the features of the blog app.

## Review React

In the last session, we learned why people use React for frontend development today. Then, we learned javascript classes as a foundation for learning how to write React components. With components, we learned about the importance of props and state. Here are the most important takeaways from our previous lecture on React.

1. React lets us write reusable pieces of front-end code called *components*.
2. Components are like "custom HTML tags" we write that can be nested inside other HTML tags or even other components.
3. Components can be dynamic: they can be passed data through a custom *attribute* which gives data to the component's *props*.
4. Each component can optionally manage its own data, this data is tracked in the *state* object.
5. A common pattern you will often see is the props of a component being passed down to child components using an attribute, these props often become part of the child components' state.

## What is Dynamic Content?

When you first hear "dynamic content", you might be tempted to think this refers to anything that moves on a page. But, we aren't talking about fancy animations or effects on a webpage. Dynamic content is often used to refer to the capability of a web page to serve customized content and run code seemingly "on the fly" in the browser using data from the user's computer or data from another computer or server connected to the internet. Serving dynamic content is a powerful feature of many popular websites.

## Dynamic Content with Fetch

What is fetch and how is it related to dynamic content? `fetch()` is a JavaScript function which lets client code (i.e. the frontend) in the user's browser ask for and process data from other websites. Soon, we'll see how fetch is commonly used to implement features such as "endless scrolling" which are popular on social media websites. While fetch is powerful for its ability to grab data from anywhere online, it can also be used to get data from our own servers on our computer. This is exactly what we'll be doing for the blog app!

## Blog App Frontend

First, you'll want to download the frontend template project for the blog app. If you are viewing this README on GitHub, just scroll to the top of the page and click the green button. You will have the option of using `git clone` or downloading the folder as a zip file.

## Fetch to Add Posts

There are many components and behaviors that need to be implemented for the blog to work. Today, we'll implement one important feature together. Use this as an example to complete everything else that needs to be done! Together we'll make a React form component for adding new posts. The submit button for this form will use fetch to add the newly submitted post to our backend's database!

From the `src` folder of the `frontend-folder`, open `BlogForm.js`. Go ahead and open up the `api.js` file from the same directory level as well.

First, we need to write a function that uses fetch to add posts to the database. I'll explain what this code does after we've written the function. Let's add the following function to the `api.js` file:

```javascript
const addPost = async (post) => {
    const resp = await fetch(APIURL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(post)
    });
    if (!resp.ok) {
        throwError(resp);
    }
};
```
There are a lot of new things going on in these few lines of code. First, notice that we've created an async function. Adding a post to our database may not be instantaneous. So, we want to make sure that wherever we use the `addPost()` function in our code, we wait for it to complete before moving on to the next line of code. If you'd like a more in-depth explanation, please go over the resources [here](https://github.com/uclaacm/hackschool-f18/tree/master/session-5-backend-async). Next, notice that we've called `fetch()`! Fetch is a JavaScript function that takes two parameters, a `URL` string and an optional object that is used to tell fetch about anything special about how we want to fetch our data. In this case, we aren't just using fetch for its default behavior (which is to retrieve data from a given URL). Instead, we want to tell our backend to *add* data to the database. To do this, we've provided options as a javascript object - they'll be familiar if you remember the HTTP workshop and the work we've done with Postman so far. If you'd like a refresher on this material please read [here](https://github.com/uclaacm/hackschool-f18/tree/master/session-3-backend-api). First we specify that we are making a POST request to the route at APIURL which our server is providing to add data to our database. Then, we note that the data we are sending is in JSON format with the `Content-Type` field. Finally, we convert our data, which is the `post` object in the parameter, to the JSON format like we said we would do in the previous option we set in the `Content-Type`.

Whew! This function is pretty short, but there's a lot to unpack and understand here. Please ask the mentors or the presenter about any questions you may have about this code!

With this function we have a way, in our frontend code, to let users of our application add blog posts. Now we need to make the React form that we can tie this feature to.

## Adding a React Form for new Posts

Next, let's create the form that users can submit new posts with. Go ahead and open the `BlogForm.js` file. Here, we'd like to create a component that lets the user type in a `title` and `body`. Additionally, we want to give the user a `send` button that adds the post with the given information. Let's start with some initial code for creating any component:

```javascript
const initState = {
    title: '',
    content: ''
};

class BlogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    updateTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    updateContent = (e) => {
        this.setState({
            content: e.target.value
        });
	}
```

Here you'll notice that we set our component's state to `initState`. We do this because we want the form's initial text for title and body to be empty. Then, we've written two functions that listen for changes to either of the input fields and accordingly update the values of our state object to reflect the user's changes. Let's implement the function that adds the new post using our api:

```javascript
newPost = () => {
        const { title, content } = this.state;
        if (title === '') {
            alert('Title is empty');
            return;
        } else if (content === '') {
            alert('Content is empty');
            return;
        }

        const newPost = {
            title,
            body: content
        };
        try {
            api.addPost(newPost);
            this.props.onSend();
            this.setState(initState);
        } catch (err) {
            alert(err);
        }
}
```

The first thing we do here is check whether the title or body of a post about to be submitted is empty. We don't want to show posts with no title or body! Finally, we turn the new post into an object and use the `addPost()` function we wrote earlier to execute the update to the database through our server. Now, lets write the code that builds the structure of our component. It seems like many lines of code, but we're really specifying the inputs and submit tags and giving them some nice visual properties;

```javascript
render(){
    const onFocusHidePH = (e) => { e.target.placeholder = ''; };
        const titlePH = 'Title';
        const contentPH = 'Content';
        const onBlurShowPH = (ph) => {
            return (e) => { e.target.placeholder = ph; };
        };
    return (
        <div>
            <div className="blog-form">
                <input 
                    className="title-in custom-in" 
                    placeholder={titlePH}
                    onFocus={onFocusHidePH}
                    onBlur={onBlurShowPH(titlePH)}
                    onChange={this.updateTitle}
                    value={this.state.title}
                />
                <textarea
                    className="content-in custom-in" 
                    placeholder={contentPH}
                    onFocus={onFocusHidePH}
                    onBlur={onBlurShowPH(contentPH)}
                    rows="30"
                    onChange={this.updateContent}
                    value={this.state.content}
                />
                <button
                    className="send-btn" 
                    onClick={this.newPost}
                >
                    Send!
                </button>
            </div>
        </div>
    )
}
```

With our component implemented, let's run the blog app to see our results. Please follow these steps:

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

Let's try to COMPOSE a post on this page. After you've done so, what do you notice?

Today you've learned how to write a React form and use fetch to request data from our own server! Unfortunately, this is all we have time for today. Get started on the rest of the blog!!!

## Finishing the Blog App

With the frontend-template project we've been working on in today's workshop, all of the backend code has been provided to you. However, there are some features in the frontend code that need to be completed. In the `api.js` there are additional functions that use fetch that need to be implemented.

Finally, we know that the blog doesn't look particularly amazing. We're counting on you to transform the version of the blog we've provided into something amazing and personal to you. Draw from what you've learned about CSS animations, flexbox, and React throughout the quarter (along with cool stuff you might have learned on your own)! This is your chance to transform the blog into a project that you can be proud of!
