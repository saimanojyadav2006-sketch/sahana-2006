let current = 0;
const screens = document.querySelectorAll(".screen");

function nextScreen() {
  if (current >= screens.length - 1) return;
  screens[current].classList.remove("active");
  current++;
  screens[current].classList.add("active");

  if (screens[current].classList.contains("night")) {
    startFireworks();
  }
}

function flip(card) {
  card.classList.toggle("flipped");
}

/* MUSIC */
const music = document.getElementById("bgm");
const btn = document.getElementById("musicBtn");

let enabled = localStorage.getItem("music") === "on";
btn.innerText = enabled ? "🎵 Music ON" : "🎵 Music OFF";

btn.onclick = () => {
  enabled = !enabled;
  localStorage.setItem("music", enabled ? "on" : "off");
  btn.innerText = enabled ? "🎵 Music ON" : "🎵 Music OFF";
  enabled ? music.play() : music.pause();
};

/* SNOW */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let snow = Array.from({length: 100}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 1
}));

setInterval(() => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  snow.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y += 1;
    if (f.y > canvas.height) f.y = 0;
  });
}, 30);

/* CONFETTI */
function celebrate() {
  alert("💙 Friendship sealed forever 💙");
}

/* FIREWORKS */
let fireworksStarted = false;
function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;

  const fw = document.createElement("canvas");
  fw.id = "fireworks";
  document.body.appendChild(fw);
}
