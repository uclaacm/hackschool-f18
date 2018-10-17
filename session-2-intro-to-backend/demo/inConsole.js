// Variables

let age;
age = 9;
console.log(age);
age = 10;
console.log(age);

let x = 5;
console.log(x + 2);

const thisMustBeOne = 1;
const pi = 3.1415926535897932;

thisMustBeOne = 2; // error
pi = pi * 2; // error

let name = 'Kristie';
console.log(name);

name = 'Galena';
console.log('Hello ' + name);

// to illustrate the difference between numbers and strings
let num = 1;
let str = '1';
console.log(num + num);
console.log(str + str);

// Functions

const plus = (x, y) => {
  return x + y;
};

const s = plus(5, 2);
console.log(s);

const saySomething = () => {
  return "I'm giving up on you";
};
saySomething();

const printHello = () => {
  console.log('Heeeeeeeeeeello');
  // no return statement
};
printHello();

const printNoot = () => {
  console.log('noot');
  console.log('noot noot');
  console.log('noot noot noot');
};
printNoot();

const quickMaths = () => {
  return plus(2, 2) - 1;
};
console.log(quickMaths());

// Objects

let person = {
  age: 18,
  school: 'UCLA'
};

person.birthday = '9 Nov 1800';

person['name'] = 'M&M';

person.age = 217;

person.rap = () => {
  console.log("I'm beginning to feel like a web god, web god.");
};

person.rap();
