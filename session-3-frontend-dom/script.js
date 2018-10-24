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
updateClock();
setInterval(updateClock, 1000);

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
