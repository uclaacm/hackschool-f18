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

Since today's workshop will be used to help you get started on the final project, instead of doing a stand-alone demo, the code we'll be writing today will directly implement some of the features of the final blog app.

## Review React

In the last session, we learned why people use React for frontend development today. Then, we learned javascript classes as a foundation for learning how to write React components. With components, we learned about the importance of props and state. Here are the most important takeaways from our previous lecture on React.

1. React lets us write reusable pieces of front-end code called *components*.
2. Components are like "custom HTML tags" that can be used inside other HTML tags or even other components.
3. Components don't have to be the same every time - they can be passed data through a custom *attribute* which gives data to the component's *props*.
4. Each component can optionally keep track of some data that is only used for itself, this data is tracked in the *state* object.
5. The props of a component are passed down to child components' state, but seldom in the other direction.

## What is Dynamic Content?

When you first hear dynamic content, you might be tempted to think that this refers to anything that moves on a page. But, we aren't talking about fancy animations or effects on a webpage when we talk about dynamic content. Dynamic content is used to refer to the capability of a web page to serve customized content and run or serve code seemingly "on the fly" in the browser using data from the user's computer or data from another computer or server connected to the internet. Serving dynamic content is a powerful feature of many popular websites. 

## Dynamic Content with Fetch

What is fetch and how is it related to dynamic content? Fetch is a way for client code (i.e. the frontend) to run code in the user's browser to ask for and process data from other websites. During the lecture I'll show how fetch is commonly used to implement "endless scrolling" features on popular social media websites. While fetch is powerful for its ability to grab data from anywhere online, it can also be used to get data from our own servers on our computer. This is exactly what we'll be doing for the blog app!

## Blog App Frontend

First, you'll want to download the frontend template project for the blog app. If you are viewing this README on GitHub, just scroll to the top of the page and click the green button. You will have the option of using `git clone` or downloading the folder as a zip file.

## Fetch to Add Posts

There are many components and behaviors that the blog needs to support. Today, we'll implement one important feature together so you can use it as an example to complete everything else that needs to be done. Together we'll make a React form component for adding new posts. The submit button for this form will use fetch to add the newly submitted post to our backend's database!

From the `src` folder of the `frontend-folder`, open `BlogForm.js`. Go ahead and open up the `api.js` file in the same directory level as well.

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
There are a lot of things going on in this little piece of code. First, notice that we've created an async function. Don't worry about this too much, it just means that adding a post to the database can take a while so we want to make sure we account for that. Next, notice how we use `fetch` here. Fetch is given two parameters, a `URL` string and an optional object that is used for special things we want our fetch call to do. In this case, we aren't just using fetch for its default behavior (which is to retrieve data from the database). Instead, we telling our backend to *add* data to the database. These options are provided as a javascript object, and they'll be familiar if you remember the HTTP workshop and the work we've done with Postman so far. First we specify that we are making a POST request to our backend code. Then, we note that the data we are sending is in JSON format. Finally, we convert our data, which is the `post` parameter, to the JSON format like we said we would do in the previous option we set in the header of our request.

Whew! This function is pretty short, but there's a lot to unpack and understand here. Please ask the mentors or the presenter about any questions you may have about this code!

With this function we have a way, in our frontend code, to let users of our application add blog posts. Now we need to make the React form that we can tie this feature to.

## Adding a React Form for new Posts

Next, let's create the form that users can submit new posts through. Go ahead and open the `BlogForm.js` file. This is the last place we'll be writing code today.

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

This code starts our component. Our form will be made up of two inputs for the title and body of the new post and a button to submit the form. Next, lets implement the function that adds the new post using our api:

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

Finally, lets write the code that builds the structure of our component. It looks like a lot but I'll explain as I go; we're really just adding the inputs and submit tags with some initial properties.

```javascript
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
				);
```

Here, we've added the inputs and button. Additionally, we've set their default values and, most importantly, attached the `newPost` function to the button with the `onclick` attribute.

With this implemented, let's start the blog app and see what we have. Please follow these steps:

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

Today you've learned how to write a React form and use fetch to get data from backend that we have access to! Unfortunately, this is all we have time for today. Get started on the rest of the blog!!!

## Finishing the Blog App

With the frontend-template project we've been working on in today's workshop, all of the backend code has been provided to you. However, there are some gaps in the frontend code that need to be completed. In the `api.js` there are additional functions that use fetch that need to be implemented.

Finally, yes we know that the blog doesn't look particularly amazing. We're counting on you to transform the version of the blog we've given you using what you've learned about CSS animations, flexbox, and React! This is your chance to transform the blog into something personalized that you can be proud of!

You'll have the next few weeks to fill out the remaining code to get all of the features of the blog app working.
