const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

let selectedFamilies = ["red", "amber", "emerald", "sky", "violet", "pink"].map((name) => families.find((family) => name === family.name));

const hslToHex = ({ hue, saturation, lightness }) => {
  const l = lightness / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;
    const value = l - amplitude * Math.max(-1, Math.min(position - 3, 9 - position, 1));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

const colors = document.getElementById("colors");
const statusElement = document.getElementById("status");
const shuffleColors = document.getElementById("shuffle-colors");

const renderColors = () => {
  colors.innerHTML = "";
  selectedFamilies.forEach(({ name, hue, saturation }) => {
    const colorsButton = shades
      .map((shade, index) => {
        const hex = hslToHex({ hue, saturation, lightness: lightness[index] });

        return `<div data-hex="${hex}" class="w-[113.2px] h-[107px] hover:-translate-y-2 ease transition cursor-pointer">
                  <div style="background-color: ${hex}" class="w-[113.2px] h-[64px] mt-[12px] rounded-xl"></div>
                  <div class="text-xs text-[#D4D4D8] flex justify-center items-center">${shade}</div>
                  <div class="text-[9px] text-[#A1A1AA] flex justify-center items-center">${hex}</div>
                </div>`;
      })
      .join("");

    const template = ` 
        <div>
            <div class="text-[#E4E4E7] text-sm capitalize mb-2">${name}</div>
            <div class="flex gap-3">
               ${colorsButton}
          </div>
        </div>`;

    colors.innerHTML += template;
  });
};

shuffleColors.addEventListener("click", () => {
  const remaining = [...families];
  selectedFamilies = [];

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selectedFamilies.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }
  renderColors();
});

colors.addEventListener("click", (event) => {
  const button = event.target.closest("div[data-hex]");
  if (!button) return;
  navigator.clipboard.writeText(button.dataset.hex);

  if (statusElement) {
    statusElement.textContent = `Copied ${button.dataset.hex}!`;
    setTimeout(() => {
      statusElement.textContent = "Ready to explore.";
    }, 2000);
  }
});

renderColors();
