let age;
age = 19;
console.log(age);
age = 100;
console.log(age);

let x = 5;
console.log(x + 2);

const thisMustBeOne = 1;
thisMustBeOne = 2; // error

let name = 'Kristie';
console.log(name);
name = "Galen";
console.log(name);
console.log('Hello ' + name);

// to illustrate the difference between numbers and strings
let num = 1;
let str = '1';
console.log(num + num);
console.log(str + str);
console.log(str + num);

let plus = (x, y) => {
  return x + y;
}

const sum = plus(5, 2);
console.log(sum);

let getSong = () => {
  return 'Never gonna give you up';
};
getSong();

let printNoot = () => {
  console.log('Noot');
  console.log('Noot');
};

let person = {
  age: 19,
  school: 'UCLA'
};

person.birthday = '9 Nov 1800';

person['name'] = 'M&M';

person.age = 218;

person.rap = () => {
  console.log("I'm beginning to feel like a web god, web god.");
};
