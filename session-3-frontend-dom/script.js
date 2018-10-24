var time = document.getElementById("clock");
var hex = document.getElementById("hex");
var body = document.getElementById("body");
var button = document.getElementById("changeColorMode");
var colorIsBg = true;

function changeColorMode() {
  colorIsBg = !colorIsBg;
}

button.onclick = changeColorMode;

function updateClock() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = "";

  var color = "rgb(" + time2color(hours, minutes, seconds) + ")";

  if (hours >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours != 12) {
    hours = hours % 12;
  }

  if (hours == 0) {
    hours = 12;
  }

  time.innerHTML = hours + ":" + minutes + ":" + seconds + " " + ampm;

  hex.innerHTML = color;

  if (colorIsBg) {
    time.style.color = "white";
    hex.style.color = "white";
    body.style.backgroundColor = color;
  } else {
    body.style.backgroundColor = "white";
    time.style.color = color;
    hex.style.color = color;
  }
}
updateClock();
setInterval(updateClock, 1000);

function time2color(hours, minutes, seconds) {
  var result = [];

  let rawRed = (hours / 24) * 255;
  let roundedRed = Math.round(rawRed);

  let rawGreen = (minutes / 60) * 255;
  let roundedGreen = Math.round(rawGreen);

  let rawBlue = (seconds / 60) * 255;
  let roundedBlue = Math.round(rawBlue);

  result.push(roundedRed);
  result.push(roundedGreen);
  result.push(roundedBlue);
  return result.join(",");
}
