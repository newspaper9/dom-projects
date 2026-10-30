// document.addEventListener("DOMContentLoaded", () => {
//   const hoursEl = document.getElementById("hours");
//   const minutesEl = document.getElementById("minutes");
//   const secondsEl = document.getElementById("seconds");
//   const statusEl = document.getElementById("status");
//   const mainCard = document.querySelector("main");

//   let startTime = 0;
//   let elapsedTime = 0;
//   let timerInterval = null;
//   let isRunning = false;

//   function formatTime(ms) {
//     const totalSeconds = Math.floor(ms / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return {
//       hours: String(hours).padStart(2, "0"),
//       minutes: String(minutes).padStart(2, "0"),
//       seconds: String(seconds).padStart(2, "0"),
//     };
//   }

//   function updateDisplay() {
//     elapsedTime = Date.now() - startTime;
//     const timeObj = formatTime(elapsedTime);

//     hoursEl.textContent = timeObj.hours;
//     minutesEl.textContent = timeObj.minutes;
//     secondsEl.textContent = timeObj.seconds;
//   }

//   mainCard.addEventListener("click", () => {
//     if (!isRunning) {
//       startTime = Date.now() - elapsedTime;
//       timerInterval = setInterval(updateDisplay, 1000);
//       isRunning = true;
//       statusEl.textContent = "Running";
//       statusEl.className = "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400";
//     } else {
//       clearInterval(timerInterval);
//       isRunning = false;
//       statusEl.textContent = "Paused";
//       statusEl.className = "rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400";
//     }
//   });

//   mainCard.addEventListener("contextmenu", (e) => {
//     e.preventDefault();
//     clearInterval(timerInterval);
//     isRunning = false;
//     elapsedTime = 0;
//     startTime = 0;

//     hoursEl.textContent = "00";
//     minutesEl.textContent = "00";
//     secondsEl.textContent = "00";
//     statusEl.textContent = "Ready";
//     statusEl.className = "rounded-full border border-[#c5d9bd]/15 bg-[#b5cbb2]/5 px-3 py-1 text-xs font-medium text-[#c5d9bd]";
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const hoursEl = document.getElementById("hours");
//   const minutesEl = document.getElementById("minutes");
//   const secondsEl = document.getElementById("seconds");
//   const statusEl = document.getElementById("status");
//   const startBtn = document.getElementById("start");
//   const stopBtn = document.getElementById("stop");
//   const resetBtn = document.getElementById("reset");

//   let startTime = 0;
//   let elapsedTime = 0;
//   let timerInterval = null;

//   function formatTime(ms) {
//     const totalSeconds = Math.floor(ms / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return {
//       hours: String(hours).padStart(2, "0"),
//       minutes: String(minutes).padStart(2, "0"),
//       seconds: String(seconds).padStart(2, "0"),
//     };
//   }

//   function updateDisplay() {
//     elapsedTime = Date.now() - startTime;
//     const timeObj = formatTime(elapsedTime);

//     hoursEl.textContent = timeObj.hours;
//     minutesEl.textContent = timeObj.minutes;
//     secondsEl.textContent = timeObj.seconds;
//   }

//   startBtn.addEventListener("click", () => {
//     startTime = Date.now() - elapsedTime;
//     timerInterval = setInterval(updateDisplay, 1000);

//     startBtn.disabled = true;
//     stopBtn.disabled = false;
//     resetBtn.disabled = false;

//     statusEl.textContent = "Running";
//   });

//   stopBtn.addEventListener("click", () => {
//     clearInterval(timerInterval);

//     startBtn.disabled = false;
//     stopBtn.disabled = true;

//     statusEl.textContent = "Paused";
//   });

//   resetBtn.addEventListener("click", () => {
//     clearInterval(timerInterval);
//     elapsedTime = 0;
//     startTime = 0;

//     hoursEl.textContent = "00";
//     minutesEl.textContent = "00";
//     secondsEl.textContent = "00";

//     stopBtn.disabled = true;
//     resetBtn.disabled = true;

//     statusEl.textContent = "Ready";
//   });
// });

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const statusEl = document.getElementById("status");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let intervalId = null;
let startTime = 0;

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
};

const startTimer = () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  statusEl.textContent = "Running";
};

const stopTimer = () => {
  clearInterval(intervalId);
  intervalId = null;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusEl.textContent = "Paused";
  startBtn.textContent = "Resume";
};

const resetTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  formatTime(startTime);

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  statusEl.textContent = "Ready";
  startBtn.textContent = "Start";
};

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
