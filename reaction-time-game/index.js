const panel = document.getElementById("target");
const text1 = document.getElementById("symbol");
const text2 = document.getElementById("message");
const text3 = document.getElementById("hint");
const lastEl = document.getElementById("last");
const bestEl = document.getElementById("best");
const statusEl = document.getElementById("status");

const ICONS = {
  idle: "◎",
  waiting: "•••",
  ready: "!",
  success: "✓",
  fail: "↻",
};

const BG = {
  idle: "#27272A",
  waiting: "#4d0218",
  ready: "#d8fa99",
  result: "#27272A",
};

let state = "idle";
let timerId = null;
let startTime = 0;
let best = null;

function render(s, icon, title, sub) {
  state = s;
  panel.style.backgroundColor = BG[s];
  text1.innerHTML = icon;
  text2.textContent = title;
  text3.textContent = sub;

  text1.style.color = s === "ready" ? "black" : "white";
  text2.style.color = s === "ready" ? "black" : "white";
  text3.style.color = s === "ready" ? "black" : "white";

  statusEl.textContent = s === "idle" ? "Ready to start." : title + ". " + sub;
}

function startRound() {
  render("waiting", ICONS.waiting, "Wait for green", "Not yet. Stay ready.");
  const delay = 1500 + Math.random() * 3000;
  timerId = setTimeout(() => {
    startTime = performance.now();
    render("ready", ICONS.ready, "Click now!", "Go go go");
  }, delay);
}

function tooSoon() {
  clearTimeout(timerId);
  render("result", ICONS.fail, "Too soon", "Click to try again");
}

function finish() {
  const ms = Math.round(performance.now() - startTime);
  best = best === null ? ms : Math.min(best, ms);
  lastEl.textContent = ms + " ms";
  bestEl.textContent = best + " ms";
  render("result", ICONS.success, ms + " ms", "Click to play again");
}

function handleClick() {
  if (state === "idle" || state === "result") startRound();
  else if (state === "waiting") tooSoon();
  else if (state === "ready") finish();
}

panel.addEventListener("click", handleClick);
panel.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    handleClick();
  }
});

render("idle", ICONS.idle, "Ready when you are", "Click to start");
