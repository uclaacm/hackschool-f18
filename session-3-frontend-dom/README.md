# Session 3: Frontend 🎨

## JavaScript and the DOM

## Introduction

This session we'll be making a super cool web page that shows a clock that
changes color based on the current time. But first we need to understand exactly
what this "DOM" thing is.

## The DOM

So, "DOM" stands for "Document Object Model" and this is basically a **concept**
(read: not anything concrete, not a specific file, not a certain browser, not
anything like that) that thinks about HTML documents and web pages as a
hierarchy of parent components and child components. Generally, the most
parent-level "component" would be the `<html>` tag, containing two children: a
`<head>` and a `<body>`. Also generally, the `body` component will contain many,
many children.

Something that tripped me up wrapping my head around the DOM was: _"Ok, well_
_what's the alternative then? How is the "DOM" different from the actual HTML_
_page? They look absolutely identical."_

Well, in most cases, they will! But let's take an example (absolutely beautiful)
web page:

![dog.png](https://lh6.googleusercontent.com/9cfjehIDb6_rYkUgq8bf_-skpsxf8WexJ0E0fwfsL7jyjYExLX6-2CYtx-cEyfJpUCLPx0u3LPLBOf1bmpnbFlgOVG6o3mjIDNlS3A7Uow_5JwqBnhLvjYdm0PCB2l8aCcUea79Y)

This is what the browser returns to us, as the user. It parses a certain HTML
file and generates this output. This is **not** the DOM! This is the web page!

Ok, so then let's take a look at that HTML file!

![html.png](https://lh4.googleusercontent.com/8kQzMWUNUEaHauG_bC8gGmc9J-I7HeIskOKT7Cfxm_WYswp4fAz-mF-aHWj5KPvHXZNRnmuI8Z4V3pUCmkagVfjUDrtF1zcPp_rzeAA8=s1263)

As you can see, we have a `head` and a `body` and within that body we have a
heading `h1`, an image `img`, and a paragraph `p`. This is a pretty simple web page and the structure of the HTML file is not at all complicated. But this is still **not** the DOM! What's the difference?

Well, let's say that I made a mistake in my HTML file. Whoops! I accidentally
forgot to close my `<p>` tag, oh no! Now my HTML file isn't valid anymore!
But... when I go into Google Chrome, everything's fine! What gives?

This is where the differences between the HTML (the "source code" if you will)
and the DOM start to become apparent. The DOM is the representation the browser,
and ultimately, the user, have of a certain web page. And so, if the browser is
smart and/or kind enough, it will say "Oh, hey, you left out the closing p tag
here, but when I'm making the DOM, I'm pretty sure I knew what you meant so my
DOM is still just gonna have a regular paragraph, cool? 👌" And we say "Yes,
very cool thanks!!" (Don't do this in public, for some reason people are
uncomfortable if you talk to your computer 🤷‍)

The difference in the HTML file and the DOM become absolutely **huge** when you
start getting into JavaScript that renders HTML for you like React or Vue (this
is for another workshop though, one thing at a time!). The HTML file is often
incredibly simple, containing only a single `<div>` named "app" and some meta
information in the `<head>` whereas the DOM will be a fully-functional web app
with headers and sidebars and images of dogs everywhere!

That brings us to \*drum roll\* **the DOM!!!**, at last the elusive creature.

![dom.png](https://lh3.googleusercontent.com/IARepkHoCwf_08xyes2LLwlsjHqmU-1B6O8abtED9ZQs7G5C60X4TMfc-Btr4jd4uJPHnDCijmE-3NTBLSGNvMreZvbZSt3mLm42qgrt=s978)

## Step 1: Setup

Go ahead and open up Sublime. We're getting ready to build! ⚡️

## Step 2: HTML

Before doing anything, let's save our file and get our directories set up!

Save the empty file by pressing `Command+S` or going to "File" > "Save" in the
Sublime toolbar. This will bring up a dialog/popup that allows you to save your
file, nothing new to you most likely.

Navigate to your **Desktop** or wherever you're going to keep your folders for
all your cool CS projects and kick-ass code. 😎

If you're on a Mac, you should see a button in the lower left hand corner of
Finder that says "New Folder." We're going to use that. Click "New Folder" and
name the folder `hexclock`.

Now, name the file inside the folder `index.html`.

Make sure to give the proper extension (`.html`) so that both Sublime and the
browser know that this is an HTML file!

### General Structure

Even though the final product is gonna be super snazzy, we don't a super complex
HTML file for this one. It mostly just consists of a big clock time, a paragraph
to show the current color, and a button to change it all. This is going to all
be in the `body` of the page and the `head` will be even more simple, just
containing a title and linking to the CSS file.

Without further adieu, add this to your `index.html` file:

```html
<html>
  <head>
    <title>Hex Clock</title>
  </head>
  <body>

  </body>
</html>
```

Notice that the body is empty right now! Let's fix that.

### Body Content

We want a button so our user can change the "color modes" of our clock, some big
text showing the current time, and then some smaller text somewhere on the
bottom probably showing the current color of the clock.

Sounds pretty straightforward to me! Add this to your `body`:

```html
<button id="changeColorMode">Change color mode!</button>
<h1 id="clock">00:00:00</h1>
<p id="hex"></p>
```

If you need a refresher from our first workshop, the `id` attributes are how you
target a specific element. Before, we used this for CSS styling, but this time
around, it's even more important! This time, we'll be using the `id` attributes
to manipulate the DOM! We need a unique `id` for each of our elements for easier
manipulation and since this is a smaller web page, it's no problem at all to
make these IDs. 💪

Believe it or not, our HTML file is (almost mostly) done! Let's move on to
styling.

## Step 3: Styles

Create a new file called `style.css` in the same `hexclock` directory we made.
You want this to be in the same folder as the `index.html` at any rate.

### Fonts

We here at ACM are big on branding! And like any good/bad developers we love our
fonts. ✏️ We're gonna be importing our main font "Poppins" from Google Fonts.

Add this line to the beginning of your `style.css` file:

```css
@import url("https://fonts.googleapis.com/css?family=Poppins:700");
```

This basically loads in the Poppins font (at a weight of 700 in case you
wondering about the number) so that we can use it in our styles super simply.

### Body Styles

I'm a big fan of having no margin, no padding `body`s. To use our lovely font
Poppins imported above, we're just gonna treat it like any other font, with the
exception that you have to put quotes around its name when referencing it.

Copy and paste this CSS rule into your file:

```css
body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  font-size: 64px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

If you're not familiar with flex boxes, well get ready because next week we're
gonna have a whole workshop on the magic and the madness of CSS centering. For
now, just know that the body is going to align everything nice and pretty for
us. ✨✨✨

### Paragraph and Button

These styles are pretty simple. Just add the following:

```css
p {
  font-size: 24px;
}
button {
  padding: 1em 2em;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  border-radius: 10px;
}
```

The button styles are just to give it some nice padding so it looks big and
clickable (and to give it that good branding 🚀).

### Linking

Last step for styling. We need to link the `style.css` file into the
`index.html` so it can get our sweet stylings.

Open up your `index.html` file and add the following into the `<head>`
component:

```html
<link rel="stylesheet" type="text/css" href="./style.css">
```

### ⚠️ Pit Stop ⚠️

Haha, I lied. _One more_ step for styling. Just one, I promise!

Double check that your `index.html` file looks like this:

```html
<html>
    <head>
        <title>Hex Clock</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
    </head>
    <body id="body">
        <button id="changeColorMode">Change color mode!</button>
        <h1 id="clock">00:00:00</h1>
        <p id="hex"></p>
    </body>
</html>
```

And your `style.css` like this:

```css
@import url("https://fonts.googleapis.com/css?family=Poppins:700");

body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  font-size: 64px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
p {
  font-size: 24px;
}
button {
  padding: 1em 2em;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  border-radius: 10px;
}
```

And if you have any questions at all, even if your files are fine, **ask a**
**mentor**! We're here to help!

## Step 4: Scripting

Alrighty, folks. The time has arrived.

**JavaScript**

### Baby Steps 👶

First things first! Create a file inside the `hexclock` directory called
`script.js`.

### No-Coding Time

Ok, so this next part is all conceptual. But that doesn't mean it's easy! So
listen up!

_How do you turn a time into a color?_

If you are confused about this, as you probably should be, then keep reading!
Let's first take a little detour into how time works. ⏰

It's 6:30:45 pm right now (even if it's not, pretend!). If it's 6:30:45 pm, then
in military/24-clock time, that means that it's 18:30:45, meaning that it is the
18th hour of the day, the 30th minute of the hour, and the 45th second of the
minute. There are 24 hours in one day, 60 minutes in one hour, and 60 seconds in
one minute.

Ok, that was enough _time_ for that. Let's talk about color. 🌈

Computers think about color in many different ways. But one of the most common
is called "RGB" which stands for "red, green, and blue." This just means that
the computer thinks that every color can be broken up into some amount of red,
some amount of green, and some amount of blue. When you combine these colors,
you get a whole brand new color to look at.

For example, white is red, green, and blue all maxed out. Black is red, green,
and blue all at 0. But what exactly do I mean by "maxed out"? There's a certain
**number** for red???

Yes! And that number is 255, for very math-y, computer science-y reasons.
Reasons that I won't be going over today, but you can read about
[here](https://en.wikipedia.org/wiki/RGB_color_model#Numeric_representations) if
you want feed your brain extra well today! 🧠

So, for now, let's just go under the assumption there are 255 different values for
red. 0 is no red, 255 is **_maximum_** red. The same goes for green and blue.
So, to make pure red, you would have an RGB representation of:

```
red = 255
green = 0
blue = 0
```

This gives you 100% pure, blinding red, and absolutely no green or blue. (Note
that most pretty, nice to look at colors fall somewhere within the range of 255
for all three values).

Back to time!

If the above was confusing at all, there's only one thing I want you to take
away from it:

1. You can measure time and you can measure color.

If you can measure how many hours there are in a day out of 24 hours per day,
and you can measure how much red there is out 255 different values for red, you
can make each a fraction and convert!

So, if it was noon (the 12th hour) this would be:

```
12/24 = 0.5
```

And converting to red, it would be:

```
0.5 * 255 = 127.5
```

You can see this illustrated below:

![graphic.png](https://lh4.googleusercontent.com/O8Psult6Dv9v4z7USPPCvE9Ukr0U2Rsl350aP9v4_fx9sYcxytjpSTOOjTTQdYc7TjIwrgaV--nmAmHFbs7uJ7-Vab5_uyU8Ugdxf54Z=s1412)

![red.png](https://lh4.googleusercontent.com/U1_auu7dzGhrNxD3ieoHXXqP0Zz8V9Jzu8XVn0GGKBKBJMZEDUQcNW3AwsJTbt701ndUByIdhKyVIEZzUeWabH1pUi6-3G7BTY3e2rUB=s1440)

So, to complete our Alice In Wonderland mathematics, **noon is half red**. So
simple right? 🎩🐰🍵

In math, this process is called _mapping_. We are mapping the current hour to a
value of red, the current minute to a value of green, and the current second to
a value of blue.

### Coding Time!

Time to get back to those keyboards.

We need to use the DOM to get the elements we defined in our HTML file. To do
this, start off with:

```javascript
let time = document.getElementById("clock");
```

So the `time` variable is where we are going to be setting the current time
(i.e. 6:30:45 pm);

But we need more than just time! We need :

1. a way to access the button to see if it was clicked

2. a way to show the current color being displayed

3. a background to put that color on

So, define three more variables by accessing the `document` object's
`getElementById` method.

```javascript
let hex = document.getElementById("hex");
let body = document.getElementById("body");
let button = document.getElementById("changeColorMode");
```

### Button Handling

First and foremost, let's define what we want our button to do. I think it'd be
pretty cool if instead of the default background color getting set, you could
set the text color instead. To keep track we're going to need:

1. a variable to tell us the current "mode" of color we're in (i.e. _are we_
   _changing the background color or the text color?_)

2. a function to call when the button is clicked

Lucky for us, there are pretty simple. Add the following into `script.js`
underneath your existing variables:

```javascript
let colorIsBg = true;

function changeColorMode() {
  colorIsBg = !colorIsBg;
}

button.onclick = changeColorMode;
```

Here we define a function called `changeColorMode` that will set our tracker
variable `colorIsBg` to the opposite of whatever it was before. This is called
_toggling_.

Lastly, we once again use the DOM's built-in `onclick` detection to make our
lives wayyyyy easier. Basically, we can access any element we want on the page,
set its `onclick` property to any function we want, and the browser will do all
the heavy-lifting! Isn't the DOM magical? ✨🔮✨

### Time to Find the Time

Okay, so here's the real bulk of the project. Let's start off just by defining a
function called `updateClock`:

```javascript
function updateClock() {}
```

Notice that our function takes in no parameters!

Just like above, we're going to need some variables to help us keep track of the
time. Define them like so:

```javascript
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let ampm = '';
```

Notice that we use the `Date` object which is built into JavaScript by default.
It is **super** useful.

### Color Calculation 1️⃣+1️⃣=🔴

Since we have the benefit of working on a project that Hack has already ran
through and tested, we know that we are going to need another function to
calculate the color, or else things will look ugly and we don't want that! Make
one like this:

```javascript
let color = 'rgb(' + time2color(hours, minutes, seconds) + ')';
```

And then **outside** of your existing `updateClock` function, define the
`time2color` function like this:

```javascript
function time2color(hours, minutes, seconds) {}
```

Basically, the `time2color` function will return a string (i.e. a bit of text)
that looks like this: `128, 14, 240`. Sadly, the browser does not know that
those numbers are RGB values, so we have to tell it that by wrapping them in the
`rgb(...)` specifier for CSS.

Put together, the `color` variable will be a string that looks like this:
`rgb(128, 14, 240)`, which is _just_ how you set color in regular CSS even
without all this crazy JavaScript.

### ⚠️ Pit Stop ⚠️

Take a break and relax a bit! Have some food, chat up your partner, or talk to a
mentor. But also make sure that your `script.js` file looks like the following
by now:

```javascript
let time = document.getElementById('clock');
let hex = document.getElementById('hex');
let body = document.getElementById('body');
let button = document.getElementById('changeColorMode');
let colorIsBg = true;

function changeColorMode() {
  colorIsBg = !colorIsBg;
}

button.onclick = changeColorMode;

function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = '';

  let color = 'rgb(' + time2color(hours, minutes, seconds) + ')';
}

function time2color(hours, minutes, seconds) {}
```

When you're done stretching your fingers from all this exercise, come back and
let's do some more work on these functions! 🤓

### Hours Are The New Red

This next section is going to happen all within your `timeToColor` function! So
make sure of that!

Basically, we are going to be using an array, which is just a list of values,
and we are going to "push" (or "add") values to that array. Specifically, we are
going to be adding the red, green, and blue values that we calculate.

But how do we do this crazy calculation?

Well! Fret not! It is actually a pretty simple calculation. In words, we are
going to be:

1. getting the fraction of the time that it is
2. multipling that fraction by 255 to get the equivalent fraction of color

First, define that array I mentioned:

```javascript
let result = [];
```

Now, let's calculate red. Red is going to be based on the current hour. Since
there are 24 hours in a day, and we get the hour in 24-hour format (i.e. if it's
6pm we get 18 for the hour), then this actually works out great. Insert this
underneath your array:

```javascript
let rawRed = (hours / 24) * 255;
```

You might be wondering _Why "raw" red?_ Well, this is because Safari is buggy
with fractional RGB values, so we are going to have to round this value.

Round like this:

```javascript
let roundedRed = Math.round(rawRed);
```

`Math` is a pre-installed JavaScript library that has a small number of useful
function like square root, rounding, and exponentials.

The rest is pretty similar, with the very notable exception that there are
**not** 24 minutes in an hour, nor are there 24 seconds in a minute. So when you
calculate, take note of that.

```javascript
let rawGreen = (minutes / 60) * 255;
let roundedGreen = Math.round(rawGreen);

let rawBlue = (seconds / 60) * 255;
let roundedBlue = Math.round(rawBlue);
```

Cool! We've done our calculations. Now, let's add these nice, rounded values to
the array.

```javascript
result.push(roundedRed);
result.push(roundedGreen);
result.push(roundedBlue);
```

**Note** that the order here matters! If you change the order, you will no
longer be mapping the same time measurement to the same color value.

To wrap up `time2color`, let's return this array as a string by calling another
built-in function called `join`, which will basically go through this array and
create a string, separating the values with whatever character we give it. (i.e.
if result was [240, 14, 134], after calling `join` it would be "240, 14, 134").

```javascript
return result.join(',');
```

Congratulations! 🎉 Your `time2color` function is done! We're almost there.

But, first, make sure your function in its entirety is this:

```javascript
function time2color(hours, minutes, seconds) {
  let result = [];

  let rawRed = (hours / 24) * 255;
  let roundedRed = Math.round(rawRed);

  let rawGreen = (minutes / 60) * 255;
  let roundedGreen = Math.round(rawGreen);

  let rawBlue = (seconds / 60) * 255;
  let roundedBlue = Math.round(rawBlue);

  result.push(roundedRed);
  result.push(roundedGreen);
  result.push(roundedBlue);
  return result.join(',');
}
```

### 12 Hour Clock Problems

Even though it makes our lives more difficult, people are generally accustomed
to seeing 12 hour clocks. You can go ahead and skip this part if you're fine
showing a 24-hour clock, but for everyone used to "AM" and "PM," follow me!
(Digitally, I mean, not in real life.)

**Note** that we are back to working in our `updateClock` function.

The first step is pretty straightforward:

```javascript
if (hours >= 12) {
  ampm = 'PM';
} else {
  ampm = 'AM';
}
```

If it is greater than 12 hours, then it is PM. Otherwise, it's AM.

Some more formatting stuff is that, even if you only just noticed it now, clocks
never show minutes or seconds that are less than 10 without a leading zero (i.e.
you will never see 6:4:8 PM, you would see 6:04:08 PM (why the hours aren't
padded is above my paygrade)).

To handle this, add the following:

```javascript
if (seconds < 10) {
  seconds = '0' + seconds;
}
if (minutes < 10) {
  minutes = '0' + minutes;
}
```

Basically, if it is less than 10 minutes, the number has only one digit, and we
very nicely and simply prepend (add to the beginning) a 0. Aren't we considerate
devs! 😁

Ok, now it's time to actually convert the hour to its 12-hour clock version. We
do this using the scarily-named _modulo operator_. This is basically just fancy
talk for "remainder" in division. So, how it works is `13 modulo 12` is 1,
because 12 goes into 13 once with 1 left over. `18 modulo 12 == 6` because 12
goes into 18 with 6 left over. And anything less than 12 just returns itself
(i.e. `8 modulo 12` is 8 because technically 12 goes into 8 zero times with 8
left over, math is weird, yeah).

In JavaScript, instead of writing `modulo` we write `%`.

```javascript
if (hours != 12) {
  hours = hours % 12;
}

if (hours == 0) {
  hours = 12;
}
```

If hours is NOT equal to 12, then take its modulo. If it is 12, then it would
become 0, so we just leave it as 12, or else we would show noon as 0. However,
this does not account for the 24th hour, which is NOT 12, so we take the modulo
of it, which is 0 since `24 % 12 = 0` (12 goes into 24 twice with 0 left over).

Once again, math is weird.

But despite all the math weirdness, the rest from here on out is pure coding!

### Making Use of Our Time

It will reassure you to know that all our values are calculated and it is
_finally_ time put them into use.

First, we wanna format our time in a way that most users are familiar with
(including you!). For most, this is:

`[hour]:[minute]:[second] AM/PM`

Basically, colon-separated followed by AM or PM. (If you are doing 24 hour
clock, you can leave off the AM/PM, but I would still recommend the colons).

Remember that `time` variable we defined oh-so-long-ago? Well, it's time to
finally use it! Use all them in fact! ✨🦄✨

```javascript
time.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
```

Every DOM object has an `innerHTML` property that allows you to pass it in HTML
to render. We aren't passing in HTML, really, just plain text, but we're going
to use this method nonetheless.

Let's pass in the RGB value we calculated into the `hex` element that's going to
display that for us.

```javascript
hex.innerHTML = color;
```

### Pull The Lever! (Or Not)

Remember how we also had the variable that we toggled depending on if the button
was clicked? Well it's time to finally use that too.

Basically, the behavior we want is that **if** the `colorIsBg` variable is set
to true, as it is by default, we want to change the background color. If
**not**, then we are going to change the text color. In code, this behavior
looks like this:

```javascript
if (colorIsBg) {
  time.style.color = 'white';
  hex.style.color = 'white';
  body.style.backgroundColor = color;
} else {
  body.style.backgroundColor = 'white';
  time.style.color = color;
  hex.style.color = color;
}
```

You have to set the `time.style.color` and other values to `white` or else they
will never get reset and will always remain some random color, which we don't
want!

### ⚠️ Pit Stop ⚠️

Your `updateClock` function should look like this:

```javascript
function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = '';

  let color = 'rgb(' + time2color(hours, minutes, seconds) + ')';

  if (hours >= 12) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours != 12) {
    hours = hours % 12;
  }

  if (hours == 0) {
    hours = 12;
  }

  time.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

  hex.innerHTML = color;

  if (colorIsBg) {
    time.style.color = 'white';
    hex.style.color = 'white';
    body.style.backgroundColor = color;
  } else {
    body.style.backgroundColor = 'white';
    time.style.color = color;
    hex.style.color = color;
  }
}
```

### Finishing Touches

Ooooooooookay, this is all looking super cool and neat, but we haven't actually
_called_ the functions yet. So if you were to run this file, nothing would
happen.

Let's change that!

Underneath your `updateClock` function, type out this:

```javascript
updateClock();
setInterval(updateClock, 1000);
```

`setInterval` is a built-in JavaScript function that will call any function we
give it at a certain time interval we give it. In this case, it will call
`updateClock` every 1000 milliseconds (1 second).

We call `updateClock` manually as a small edge case because if we don't, then
the page will be white for a second upon loading! 😱

### Finishing Finishing Touches

Now that this is all done, let's finally link in the script into our
`index.html`.

Underneath your `<p id="hex">`, right **before** the body closes, insert this:

```html
<script type="text/javascript" src="./script.js"></script>
```

## Step 5: oooh pretty clock!

Open up the `index.html` file in your browser and you should have a working Hex
Clock! (On that note, the name is technically wrong. The original version of
this clock used hex codes instead, but why do the extra conversion? Anyways, it
should be RGB clock)

But naming aside, throw a round of applause for yourself! 👏👏👏 You did it!

Oh and by the way, do you happen to have the time? <sup><sup>hahahahahaha</sup></sup>
