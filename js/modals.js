// Countdown to elections
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');

const countDownDate = new Date('Feb 16, 2019 00:00:00').getTime();


const x = setInterval(() => {

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  day.innerHTML = days + " days";
  hour.innerHTML = hours + " hrs";
  min.innerHTML = minutes + " mins";
  sec.innerHTML = seconds + " secs ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "The 2019 General Election is over.";
  }
}, 1000);
