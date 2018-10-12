# HackSchool Session 2: Introduction to Backend Development
**Location**: Covel 227
**Time**: 6-8pm

**Teachers**
* Galen Wong

# Resources

**Slides**
* [Session 2 - Introduction to Backend Development](TODO)

**ACM Membership Attendance Portal**
* [Portal](http://members.uclaacm.com/login)

**Questions**
* [Ask your question here!](http://goo.gl/forms/xyeFXLx9mrAXolCG3)

**Install Node.js**
* [Install Node.js](https://nodejs.org/en/download/)

# What we'll be learning today
* What is a "Server"?
* Basic JavaScript
* Command Line
* Node.js
* NPM

# Goal of today
* Create your own server in node.js

## JavaScript
Open Console in your Chrome Browser Developer's Tool:
* <strong>Right</strong> click on any where on a webpage
* Click `Inspect`
* Click `Console`

Write a line of code, which are just instructions to the computer. JavaScript is executed line by line, once you hit enter. Chrome will execute your code. 

### 1. Variables
`Variable` is a fundamental concept in programming. Variables are __assigned__ values. 

Let's create/__declare__ a variable called age. 
```JS
let age;
// note that semicolon (;) is not a must in JavaScript
// It is just nice to have. 
```

We can assign a value to it with an equal sign (`=`). <br> Then output it with `console.log(age)`
```JS
age = 9;
console.log(age);
```

We can overwrite/change its value by assigning another value to it. 
```JS
age = 10;
console.log(age);
```

We can declare a variable and assign a value to it at the same time.
```JS
let x = 5;
```
Now we have a variable named `x` and has the value of 5.

We can do some math with variables.
```JS
console.log(x + 2)
// 7
```

We can think of a variable as a box with a name tag that contains some value.

If you never reassign your vairable, you can use `const` to declare the variable to make it a constant. 

```JS
const thisMustBeOne = 1;
```
If you try to change it, the browser will throw an error.
```JS
thisMustBeOne = 2;
// Uncaught TypeError: Assignment to constant variable.
```

>Side note: the "lowerCaseUpperCase" naming convention is used by a lot of programmers. (Technically called "Camel Case") You can also use underscore_naming_method instead.

Variable can also be "strings", which are a bunch of characters in quotes. 

```JS
let name = "Kristie";
console.log(name);
```

> For you C++/Java folks, there is no need to specify a type of variable/constant. JavaScript handles typing for you :)

In JavaScript, we can use single quotes or double quotes. Both are valid.
```JS
name = 'Galena';
```
You can "add" strings togeter. This is called __concatenation__, meaning joining two things together.
```JS
console.log("Hello " + name);
// Hello Galena
```

#### Exercise: What are the outputs?

Case 1
```JS
const num = 1;
console.log(num + num);
```
Case 2
```JS
const str = '1';
console.log(str + str);
```

Answer: 
* Case 1: `2`
* Case 2: `11`

### 2. Functions
Beside numbers and strings, you can also assign functions to variables. 

A function is something that performs some action and returns a value. 

Syntax of function in JavaScript looks like this.
```JS
// Syntax 1
const functionName = (input1, input2) => {
    //actions and statements...
}
// Syntax 2
function functionName (input1, input2) {
    //actions and statements...
}
```

Let's write a plus function.
```JS
const plus = (addend1, addend2) => {
    return addend1 + addend2;
}
```
To call/use the function,
```JS
plus(5, 2);
```
This does not do anything since you are not "capturing" the valued returned from a function. 

We can "save" the returned value with a variable.
```JS
const s = plus(5, 2);
console.log(s);
// 7
```

Inputs are called "parameters" or "arguments". 


We can also have function without input parameters
```JS
const saySomething = () => {
    return "I'm giving up on you";
}
```

We can also have function that returns nothing.
```JS
const printHello = () => {
    console.log("Heeeeeeeeeeello");
    // no return statement
}
```

We can have as much statements in function as we plaese.
```JS
const printNoot = () => {
    console.log("noot");
    console.log("noot noot");
    console.log("noot noot noot");
}
```

We can call other functinos within some function
```JS
const quickMath = () => {
    return plus(2, 2) - 1;
}
```

### 3. Obejcts
Objects are collection of data. 
Let's make an object called `person` and he goes to school in UCLA.

Here is the syntax.

```JS
let person = {
    age: 18, // notice the comma
    school: 'UCLA'
};
```
You see object can hold different types of data.

We can add more data to it. 
```JS
person.birthday = "9 Nov 1800";
person['name'] = "M&M"; // alternative syntax, notice the quote
```

We can change existing data. 
```JS
person.age = 218;
```

We can put function in to objects as data as well.
```JS
person.rap = () => {
    console.log("I'm beginning to feel like a web god, web god.");
}
```

We can tell M&M to rap for us by calling the rap function like this. 
```JS
person.rap()
// I'm beginning to feel like a web god, web god.
```

## CLI (Command Line Interface)

### GUI vs CLI
GUI stands for __Graphical User Interface__. GUI are nice because they have nice buttons and images for you to intuitively interact with your computer.
<br>
Some examples are Chrome, Sublime, Microsoft Word

CLI, on the other hand, allows you to interact with computer with text only.
<br>
You type something, then computer responses to whatever you typed.

### Terminal
Terminal is the application that has a command line interface for you to interact with your computer. 

On Mac, goes to plotlight search and type `terminal` and hit `Enter`.

On Window, hit and Windows key and type `powershell` and hit `Enter`. 

When you first enter, you are in your "`HOME`" directory. This is the current direcotry that you are working with. Imagine that you are in a folder. 

To see the directory/folder that you are currently in. Use the `pwd` command. `pwd` stands for "print working directory".
```bash
$ pwd
# output: /user/galenw/
```

If you are in a folder, very naturally you should be able to see what is in your current folder/directory. Use `ls` command, which stands for "list".
```bash
$ ls 
# output: Desktop Document file.txt
```

You should also be able to go to another folder. Let's say I want to go to my `Desktop` folder that is in my current directory. Use `cd` command, which stands for "change directory", followed by the name of the directory.
```bash
$ cd Desktop
```
Now type `pwd` again. You should see some thing like
```bash
$ pwd
# output: /user/galenw/Desktop/
```

`pwd`, `ls`, and `cd` are all commands that you tell the computer. That's why it is called COMMAND line interface.

## Node

### What is Node?
Node is a JavaScript runtime environment. It basically allows you to run JavaScript in your local computer instead of inside a browser.

### Exmaple: Explore node
If you have installed node correctly, run `node -v` in terminal.
```bash
$ node -v
```

You can also run `node` command. 
Since you have already installed node, your CLI should have a new command called `node` (just as `ls`, `cd`, which are all commands that can be called from the terminal)
<code id="galen-bash">
```bash
$ node 
> 
```
</code>
<script>
function remove() {
    document.getElementbyId("galen-bash").innerHTML = "```\nbash\n$ node\n > \n``` \n";
    setTimeout(add, 500);
}
function add() {
    document.getElementbyId("galen-bash").innerHTML = " ```\nbash \n$ node \n> ▌ \n```\n ";
    setTimeout(remove, 500);
}
add();
</script>

Write JavaScript as you would do in a browser.
```JavaScript
let x = 1;
console.log(x + 1);
```
Type Ctrl-c twice to exit.


### Example: `node sum.js` 
We create a folder on Desktop called `hackschool-2` and create a file named `sum.js` inside. 

In `sum.js`,
```JS
const sum = (x, y) => {
    return x + y;
}

console.log(sum(1 ,2));
```

Now, we navigat to the directory/folder containing `sum.js`. Use `ls` to check if it is there.

```bash
$ cd Desktop/hackschool-2
$ ls 
sum.js
```

Instead of typing our code out, we can use `node` to run our JavaScript file instead.
```bash
$ node sum.js
```
`node` keyword evokes the node program. We tell the node program which JavaScript file to process, in this case `sum.js`.

Output "3" as expected.


