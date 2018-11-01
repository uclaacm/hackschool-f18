# Hackschool Session 4 Frontend: CSS Layout
**Location**: Covel 227  
**Time**: 6:15–7:15pm, October 31, 2018.

**Teacher**: Kristie Lim

## Resources

**Slides**
* [Session 4 Frontend: CSS Layout](https://docs.google.com/presentation/d/1MgSTUCc4XTaRoWGQ-hclmRazYeexAsV6GSfg4CpJrDM/edit?usp=sharing)

**ACM Membership Attendance Portal**
* [Portal](https://members.uclaacm.com/login)

## What we'll be learning today

* Flexbox

## The `display` property

Let's create a new directory on the desktop. In this document, we will call it
`hackschool-session-4-frontend`, but you can use any name of your choosing.

In this directory, let's first create a file called **`index.html`** with the
following content. This is to set up the project. 

```html
<!DOCTYPE html>
<html>
<head>
	<title>Ghosts</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1>ghost dance party</h1>
	<h1>dance dance dance</h1>
</body>
</html>
```

Then create a **`style.css`** file containing:

```css
html {
	height: 100%;
}

body {
	background-color: black;
	height: 100%;
}

h1 {
	font-family: 'Comic Sans MS'
}
```

When you open your html file in Google Chrome and inspect element, it should look like this. Notice that each element takes up the full width and the next element goes directly below the previous. 

![display: block;](images/displayblock.png)

This is what happens when the `display` property is set to `block`. By default most items are set to `display: block;`. CSS can be tricky since there are a lot of default values that you might not be aware of, which causes confusing layout problems.

Let's add some images:
```html
<html>
<head>
	<title>Ghosts</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1>ghost dance party</h1>
	<h1>ghost dance party</h1>
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
</body>
</html>
```

```css
img {
	height: 100px;
}
```

Notice that by default, the `img` tag has a `display` property of `inline-block`. So the ghosts will appear in a horizontal line. 

![display: inline-block;](images/inlineblock.png)

## Containers

If we want to center some items, the browser needs to know what element we're centering the items inside of. This element is called the container. In the DOM, elements are modeled as a tree with parent elements and child elements. The parent element is the container, and the child elements are the items.

Let's put our ghosts in a container:
```html
<div class="ghost-container">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
</div>
```

I'm also going to add a border around the container element and make the height 300px.
```css
.ghost-container {
	border: solid 2px blue;
	height: 300px;
}
```

Now we can start using Flexbox!

## Flexbox

To turn a container into a flexbox, you set its `display` property to `flex`.
```css
.ghost-container {
	border: solid 2px blue;
	height: 300px;
	display: flex;
}
```

A flexbox has a main axis and a cross axis. By default, the main axis is horizontal. To change this, we set the `flex-direction` property to `column` on the container.
```css
.ghost-container {
	border: solid 2px blue;
	height: 300px;
	display: flex;
	flex-direction: column;
}
```

I'm going to set it back to row, so delete the `flex-direction: column;` line. 

One very useful property of flexbox is `justify-content`, which moves your items along the main axis. 

A similar property that moves your items along the cross axis is `align-items`.

```css
.ghost-container {
	height: 300px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
```

We can also set properties of the child flex items. For example, let's use the `align-self` property to put our ghosts in dance formation:

```css
.down {
	align-self: flex-end;
}

.up {
	align-self: flex-start;
}
```

Here I'm creating two new classes, `up` and `down`. I'll alternate the classes in my html:
```html
<div class="ghost-container">
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
</div>
```

For a complete list of properties and their values, see [CSS-Tricks: A Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

For a fun way to practice, see [Flexbox Froggy](http://flexboxfroggy.com/)


## Grid layout

A lot of websites use a grid for layout, saying how wide each element should be. 
To do this in flexbox, we can set the `flex` property of our child items. 

The goal of the next few steps is to have two ghost containers, one that is on the right half of the screen and one that is on the left half. 

To do this, I'm going to have my body act as a flex container and my ghost-container act as a flex item. It's important to note that you can nest flexboxes.

Add a second ghost-container:
```html
<body>
	<div class="ghost-container">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	</div>
	<div class="ghost-container">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
		<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	</div>
</body>
```

Make the body a flexbox:
```css
body {
	background-color: black;
	height: 100%;
	display: flex;
}
```

Use the `flex` property to set what percentage of the screen you want the width to be:
```css
.ghost-container {
	border: solid 2px blue;
	height: 300px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex: 0 0 50%;
}
```

## Responsive web design

Responsive web design means that your website will look good even on different screen sizes (it "responds" to the screen size). 

With a grid layout, this might mean that a column that used to take 50% of a full desktop screen should now take 100% of a smaller screen.

To change styling based on the size of a screen, we can use something in CSS called a media query. In this media query, we're saying that when the screen width is less than 1000px, the ghost-container will start taking 100% of the width. 
```css
@media (max-width: 1000px) {
	.ghost-container {
		flex: 0 0 100%;
	}
}
```

Comment out the borders:
```css
* {
	margin: 0;
	padding: 0;
	/* border: solid 2px red; */
}

.ghost-container {
	/* border: solid 2px blue; */
	height: 300px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex: 0 0 50%;
}
```

The child items will be too big for their parent, but I still want them to wrap around on the screen. So I can set the `flex-wrap` property.
```css
body {
	background-color: black;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
```

Now if you make your screen smaller, the ghosts won't disappear off the edge of the screen. 

## Making this a dance party

This section has nothing to do with flexbox, so you can skip it if you want. I just want to make this a real dance party.

I want to center my heading in my container. How would I do this? Let's try putting the `h1` element inside my container. 
```html
<div class="ghost-container">
	<h1>ghost dance party</h1>
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="up" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
	<img class="down" src="https://cdn2.iconfinder.com/data/icons/halloween-avatar/260/halloween_avatar-25-512.png">
</div>
```

The `h1` element is positioned relative to the ghosts, so it shows up next to them in a line just like any other flex item. 
![position: relative;](images/relative.png)

To take the `h1` element out of the flow of its siblings, you set the `position` property to `absolute` (by default, `position` is set to `relative`).
```css
h1 {
	position: absolute;
	color: white;
	font-family: 'Comic Sans MS';
}
```

Since we centered everything earlier with flexbox, this is what it should look like:
![position: absolute;](images/absolute.png)

To animate the ghosts:
```css
@keyframes dance {
	0% {transform: rotate(5deg);}
	50% {transform: rotate(-5deg);}
	100% {transform: rotate(5deg);}
}

img {
	height: 100px;
	width: 100px;
	animation: dance 1s linear infinite;
}

.down {
	align-self: flex-end;
	animation-delay: 0.5s;
}
```

Here I'm creating a dance animation that rotates the ghost back and forth. I set the `down` class to have an animation delay, so ghosts in different rows rotate in opposite directions. 

Add another `h1` tag to the other ghost container and we're done!

![done](images/done.png)
