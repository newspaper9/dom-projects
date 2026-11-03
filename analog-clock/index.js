const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

const markers = document.getElementById("markers");
const numbers = document.getElementById("numbers");

for (let i = 0; i < 60; i++) {
  const marker = document.createElement("div");
  marker.className = "absolute inset-0 flex pt-3 justify-center";
  marker.style.transform = `rotate(${i * 6}deg)`;

  const tick = document.createElement("span");

  const isMajor = i % 5 === 0;
  tick.className = isMajor ? "w-[2px] h-3 bg-gray-500 rounded-full" : "w-px h-2 bg-gray-300 rounded-full";

  marker.appendChild(tick);
  markers.appendChild(marker);
}

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("span");
  number.textContent = i;
  const angle = (i * Math.PI) / 6;
  number.className = "absolute -translate-x-1/2 -translate-y-1/2 text-gray-800 font-bold text-lg";

  number.style.left = `${50 + 38 * Math.sin(angle)}%`;
  number.style.top = `${50 - 38 * Math.cos(angle)}%`;

  numbers.appendChild(number);
}

const runtime = () => {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  secondHand.style.transform = `rotate(${seconds * 6}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
  hourHand.style.transform = `rotate(${hours * 30}deg)`;

  requestAnimationFrame(runtime);
};

runtime();
