# HackSchool Session 1: Introduction to Web Development
**Location**: Covel 227
**Time**: 6-8pm

**Teachers**
* Kristie Lim
* Prateek Singh

# Resources

**Slides**
* [Session 1 - Introduction to Web Development](http://tinyurl.com/hackschool2018-1)

**ACM Membership Attendance Portal**
* [Portal](http://members.uclaacm.com/login)

**Questions**
* [Ask your question here!](http://goo.gl/forms/xyeFXLx9mrAXolCG3)


# What we'll be learning today

* Basic Dev Environment Setup
* Basic Web Structure
  * Frontend
  * Backend
* HTML
* CSS

## Basic Dev Environment Setup
### 1. Browser with a debugger
Get [Google Chrome](https://www.google.com/chrome/).

### 2. Text Editor
There is NO best editor for everyone. There is only the best editor for yourself.
Here are some common ones that people use.

Get [Sublime Text](https://www.sublimetext.com/).

Get [VS Code](https://code.visualstudio.com/).

Get [Atom](https://atom.io/).

## What happens when you type a URL and hit enter?
Let's say Tim made this fantastic webpage that he wants to share with the world.  

![Hello World](images/helloworld.png)

So he puts the code for his webpage on a computer that's always running. This computer can **serve** your page whenever a **client** computer requests it. An example of a client in this situation could be your personal laptop, and an example of a server in this situation could be an AWS server in Arizona.  

![IP Address](images/ipaddress.png)

How does your laptop know which server to ask for the webpage from? All computers have an address called an IP address. Think of it as a mailing address for computer. Each **domain name** (for example, helloworld.com) corresponds to an IP address to a server. So when you type in a [domain name](https://dyn.com/blog/dns-why-its-important-how-it-works/) from your computer, you are making a request to a server with that corresponding address.

![Client](images/hiidlike.png)
![Server](images/yanoprobs.png)
*These not actually the words computers use to communicate. The words that computers actually use to communicate is called a "protocol," and the protocol that web browsers and servers use to communicate is called HTTP or [HyperText Transfer Protocol](https://www.lifewire.com/hypertext-transfer-protocol-817944)*  
  
After all of this, you can view the web page on your computer through a browser like Google Chrome.  

In fact we can see this in action using Google Chrome! If you right click on a webpage and select "Inspect," you open Chrome developer tools. 
![Inspect](images/inspect.png)  
Then navigate to the "Network" tab and hit refresh. All the files that you see have been delivered by the server through the network to the client. Notice in particular the different file types. We'll be learning more about the code in the documents, stylesheets, and scripts that you see here.
![Network](images/network.png)
![Network files](images/networkfiles.png)

For more about what happens when you type a URL in the browser, check out this [article](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a ).

## What is web development?

Web development is building sites and applications for the World Wide Web. To do this, we need to write code. Computers are just signal processing machines. So we need code to give them descriptions and instructions for what to do.  
  
Developers write code that describes what is shown in the browser--this is what we call "front-end development" or "client-side code." An example of this would be: show bold text that says "Hello World."  
  
Developers also write code that describe what should be sent to the browser (among other things that need to happen before the client sees anything)--this is what we call "back-end development" or "server-side code." An example of this would be: when you go to the endpoint /about, send over the about page. Backend development also includes what to do when the client sends over data. For example, you might want to add that data to a database or process it in some way. 
  
This first session is focused on the basics of front-end. The foundations of front-end development are: HTML, CSS, and JavaScript. 

## HTML (Hyper Text Markup Language)
HTML is just text with some extra tags that describe the **structure** and the **content** of the page. Let's write some HTML!

### HTML Setup
1. Make a new folder.
2. Open the folder in Sublime. File -> Open...
3. Make a new file. File-> New File (shortcut is Ctrl/Cmd n)
4. Save the file as `index.html`. Make sure to save in the folder you just created.

Add the following code:
```HTML
<!DOCTYPE html>
<html>
<head>
	<title>Landing page</title>
</head>
<body>
	// Stuff will go here!
</body>
</html>
```
- `<!DOCTYPE html>` lets the browser know it’s an HTML doc
- `<html>` and `</html>` tags denote where the content of HTML goes
- `<head>` tag includes information that isn’t displayed, such as the title of the webpage
- `<title>` tag defines a title for the page used in the browser toolbar and search results
- `<body>` tag surrounds all visible content. Put all visible content in here.

### **Tag**: Header
```HTML
<h1> HELLO WORLD </h1>
```
><h1> HELLO WORLD </h1>
- A **header** tag can be from `h1`-`h6`, with 1 being the most important/largest, to 6 being the least important/smallest
- Use header tags to express section headers and other important information

### **Pitfall**: New Lines and spaces 

```HTML
<!-- Example 1 -->
<h2>
  HELLO WORLD
</h2>

<!-- Example 2 -->
<h2> HELLO WORLD </h2>

<!-- Example 3 -->
<h2> HELLO      WORLD </h2>
```

- The above code are exactly the same
- New lines and spaces does not matter

### **Tag**: Image
```HTML
<img src="https://i.ytimg.com/vi/ZHgtIyZX_q8/maxresdefault.jpg">
```
> <img src="https://i.ytimg.com/vi/ZHgtIyZX_q8/maxresdefault.jpg" width=200>

- Use `img` tag to insert image
- the `src` attribute specify a URL to the image, which can be local or online

### **Tag**: Paragraph
```HTML
<p>I am a paragraph</p>
```
> <p>I am a paragraph</p>

### **Tag**: Ordered List
```HTML
<ol>
  <li>First ordered list item</li>
  <li>Second ordered list item</li>
</ol>
```
> <ol> <li>First ordered list item</li> <li>Second ordered list item</li> </ol>

- There is also unordered list with tag `<ul>`. Items are still marked with `<li>`

### **Tag**: Button
```HTML
<button>Click Me</button>
```
> <button>Click Me</button>

### **Tag**: Links
```HTML
<a href="http://acm.cs.ucla.edu/">ACM Website!</a>
```
> <a href="http://acm.cs.ucla.edu/">ACM Website!</a>
- The `href` attribute specifies the URL 

### **Tag**: Inputs
```HTML
<input types="text" placeholder="input stuff here">
```
><input types="text" placeholder="input stuff here">
- The `<input>` tag is used to gather input from users.
- The `types` attribute specifies the type of input. It can be “text”, “number”, or “submit” based on what you want the user to input.


## CSS (Cascading Style Sheet)

HTML should only represent the content. A different language called CSS is used to create rules about *style*. With CSS, you can create rules like "This text should be red." or "There should be 20 pixels between these two elements." or "This navigation bar should stick to the top of the screen."

### **Stylish**: Create and Link your CSS file to HTML
- Create a file named `style.css` and save it to the same folder as your HTML file. Then add the following line to your HTML file in order to link the two:  
```HTML
<!-- Inside the head tag -->
<link rel="stylesheet" type="text/css" href="style.css">
```
- You can also directly put all CSS code in a `<style>` tag. But separating them into two files is cleaner.

### **About Selection**: Class and ID
All HTML tags have the attribute `class` and `id`. These 2 attributes can be used by CSS code to target the element to add style to. For example, let's say we only want to change the styles on the last three headings. We can specify a class named `noot` for these three headings like this in `index.html`:
```HTML
<h1>Hello World</h1>
<h1 class="noot">Noot</h1>
<h1 class="noot">Noot noot</h1>
<h1 class="noot">Noot noot noot</h1>
```
Then in `style.css`, add the following:
```CSS
.header {
  color: green;
}
```

Now let's say that we want the very last header to be special and have its own style. We can identify a single element with the `id` attribute. In `index.html`:
```HTML
<h1>Hello World</h1>
<h1 class="noot">Noot</h1>
<h1 class="noot">Noot noot</h1>
<h1 id="last" class="noot">Noot noot noot</h1>
```
Then in `style.css`, add the following:
```CSS
#last {
	color: purple;
}
```

Notice that in CSS, ids begin with a `#` and classes begin with a `.`. Also notice that the style for the id overrides the style for the class. This is part of the "cascading" nature of "cascading style sheets". 

```CSS
* {
  border: 2px solid aquamarine;
}
```
- We can select everything with the `*` operator


### **Stylish**: Text Properties

```CSS
.header {
  color: blue;
  /* the following are some text-related properties */
  text-align: right;
  font-weight: bold;
}
```
- [`text-align`](https://www.w3schools.com/cssref/pr_text_text-align.asp) defines how the text is aligned.
- try changing `text-align` to `center`/`left`/`justify` and see what happens.
- [`font-weight`](https://www.w3schools.com/cssref/pr_font_weight.asp) defines how thick or thin the text is going to be.

### **Stylish**: Formatting Properties

```CSS
button {
  padding: 10px;
}
```
- The [`padding`](https://www.w3schools.com/css/css_padding.asp) property is used to generate space around an element's content, inside of any defined borders.

```CSS
button {
  /* padding: 10px; */
  /* changed from padding to margin */
  margin: 10px;
}
```
- The [`margin`](https://www.w3schools.com/css/css_margin.asp) property is used to create space around elements, outside of any defined borders.

- Can you see the difference between `padding` and `margin`? `padding` adds space "inside" while `margin` adds "outside".


## JS (JavaScript)

### What is DOM (Document Object Model)? 

- Let's check it out in the broswer
- Left click on any page. Click `Inspect`.
- You should see something like this.

<img src="DOM.png" width="500px" style="margin-left: 41px"/>

- This is the "HTML representation" of the DOM. 
- We can manipulate the DOM through JavaScript

### **Manipulate**: Create a JavaScript file and link it to your HTML
- Create a file named `script.js`. Under the same directory as your HTML file.
```HTML
<!-- Inside the body tag -->
<script src="script.js"></script>
```
- You can also put all the JavaScript code within the `script` tag. 


### **Manipulate**: Click and Open Sesame

In your `index.html` file, 
```HTML
<li id="last">Second ordered list item</li>
```

In your `script.js` file,
```javascript
document.getElementById('last').onclick = () => {
	document.getElementById('last').innerHTML = 'Secret message';
};
```
- The `() => {}` syntax is a fancy way to declare function. Don't worry. We will be covering those later.
- `document` is another global variable that represents the DOM.
- The first line is saying "after the `window` has loaded (`onload`), execute the following function".
- The second and third line means "for the element with id `last` from the DOM (`document`), and when it is clicked (`onclick`), we change its `innerHTML` content to 'Secret message'.
