let current = 0;
const screens = document.querySelectorAll(".screen");

/* Navigation */
function nextScreen() {
  screens[current].classList.remove("active");
  current++;

  if (screens[current]) {
    screens[current].classList.add("active");

    // Fireworks only on Happy New Year screen
    if (screens[current].classList.contains("night")) {
      startFireworks();
    }
  }
}

/* Music (click to play) */
const music = document.getElementById("bgm");
document.getElementById("musicBtn").onclick = () => {
  music.play();
};

/* Snow */
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

/* Fireworks (synced to 2026 slide) */
let fireworksStarted = false;

function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;

  const fw = document.createElement("canvas");
  fw.id = "fireworks";
  document.body.appendChild(fw);

  const fctx = fw.getContext("2d");
  fw.width = innerWidth;
  fw.height = innerHeight;

  let particles = [];

  function explode() {
    const x = Math.random() * fw.width;
    const y = Math.random() * fw.height / 2;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x,
        y,
        vx: Math.cos(i) * Math.random() * 3,
        vy: Math.sin(i) * Math.random() * 3,
        life: 60
      });
    }
  }

  function animate() {
    fctx.clearRect(0, 0, fw.width, fw.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      fctx.fillStyle = "gold";
      fctx.fillRect(p.x, p.y, 2, 2);
      if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  setInterval(explode, 800);
  animate();
}

/* Final message */
function celebrate() {
  alert("💙 Friendship sealed forever 💙");
}
