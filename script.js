let current = 0;
const screens = document.querySelectorAll(".screen");

function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  if (current < screens.length) {
    screens[current].classList.add("active");
  }
}

function flip(card) {
  card.classList.toggle("flipped");
}

/* MUSIC */
const music = document.getElementById("bgm");
const btn = document.getElementById("musicBtn");

let enabled = localStorage.getItem("music") === "on";

if (enabled) {
  btn.innerText = "🎵 Music ON";
}

btn.onclick = () => {
  enabled = !enabled;
  localStorage.setItem("music", enabled ? "on" : "off");
  btn.innerText = enabled ? "🎵 Music ON" : "🎵 Music OFF";
  if (enabled) music.play();
  else music.pause();
};
// Snowfall animation
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

for (let i = 0; i < 100; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < snowflakes.length; i++) {
    let f = snowflakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveSnow();
}

function moveSnow() {
  for (let i = 0; i < snowflakes.length; i++) {
    let f = snowflakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    if (f.y > canvas.height) {
      snowflakes[i] = {
        x: Math.random() * canvas.width,
        y: 0,
        r: f.r,
        d: f.d
      };
    }
  }
}

setInterval(drawSnow, 33);
