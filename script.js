/* =========================
   SCREEN NAVIGATION
========================= */
let current = 0;
const screens = document.querySelectorAll(".screen");

function nextScreen() {
  if (current < screens.length - 1) {
    screens[current].classList.remove("active");
    current++;
    screens[current].classList.add("active");

    // 🎆 Start fireworks when 2026 screen appears (Screen 3)
    if (screens[current].classList.contains("night")) {
      startFireworks();
    }
  }
}

/* =========================
   FLIP CARDS
========================= */
function flip(card) {
  card.classList.toggle("flipped");
}

/* =========================
   MUSIC TOGGLE
========================= */
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
  enabled ? music.play() : music.pause();
};

/* =========================
   SNOWFALL ANIMATION
========================= */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

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

  snowflakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
  });

  ctx.fill();
  moveSnow();
}

function moveSnow() {
  snowflakes.forEach(f => {
    f.y += Math.pow(f.d, 2) + 1;
    if (f.y > canvas.height) {
      f.y = 0;
      f.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawSnow, 33);

/* =========================
   SECRET MESSAGE
========================= */
function revealSecret() {
  document.getElementById("secret").style.display = "block";
}

/* =========================
   CONFETTI CELEBRATION
========================= */
function celebrate() {
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.background =
      ["#ff4d4d", "#ffd700", "#4da6ff"][Math.floor(Math.random() * 3)];
    confetti.style.animation = "fall 2s linear";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
  alert("💙 Friendship sealed forever 💙");
}

/* =========================
   FIREWORKS (2026 SCREEN)
========================= */
let fireworksStarted = false;

function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;

  const fwCanvas = document.createElement("canvas");
  fwCanvas.id = "fireworks";
  document.body.appendChild(fwCanvas);

  const fctx = fwCanvas.getContext("2d");
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;

  let particles = [];

  function createFirework() {
    const x = Math.random() * fwCanvas.width;
    const y = Math.random() * fwCanvas.height / 2;

    for (let i = 0; i < 50; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 2,
        life: 60
      });
    }
  }

  function animateFireworks() {
    fctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;

      fctx.fillStyle = "gold";
      fctx.fillRect(p.x, p.y, 2, 2);

      if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animateFireworks);
  }

  setInterval(createFirework, 900);
  animateFireworks();
}
