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