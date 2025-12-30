let current = 0;
const screens = document.querySelectorAll(".screen");

function nextScreen() {
  screens[current].classList.remove("active");
  current++;
  if (screens[current]) screens[current].classList.add("active");
}

/* MUSIC (CLICK TO PLAY) */
const music = document.getElementById("bgm");
document.getElementById("musicBtn").onclick = () => {
  music.play();
};

/* SNOW EFFECT */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let snow = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 1
}));

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  snow.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += 1;
    if (f.y > canvas.height) f.y = 0;
  });
}, 30);

/* CONFETTI / FINAL MESSAGE */
function celebrate() {
  alert("💙 Friendship sealed forever 💙");
}
