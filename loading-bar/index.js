document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  const loadingStatus = document.getElementById("loading-status"); // HTML дээрх ID-тай тохируулав
  const loadingBar = document.getElementById("loading-bar");

  let startTime = null;

  const LOADING_DURATION_MS = 5000; // 5 секунд
  const messages = ["Preparing your space", "Bringing everything together", "Adding the finishing touches", "All set. Welcome in!"];

  const renderProcess = (percentage) => {
    const roundedPercentage = Math.floor(percentage);

    const currentStage = roundedPercentage >= 100 ? 3 : roundedPercentage >= 85 ? 2 : roundedPercentage >= 35 ? 1 : 0;

    counter.textContent = roundedPercentage;
    loadingBar.style.width = `${roundedPercentage}%`;
    loadingStatus.textContent = messages[currentStage]; // Массиваас [] хаалтаар утгыг авна
  };

  const updateProcess = (timestamp) => {
    if (!startTime) startTime = timestamp;

    // Хувийг нарийн тооцоолох
    const percentage = Math.min(((timestamp - startTime) / LOADING_DURATION_MS) * 100, 100);

    renderProcess(percentage);

    if (percentage < 100) {
      requestAnimationFrame(updateProcess);
    } else {
      // 100% болсны дараа хийх үйлдэл (Жишээ нь: Шилжих)
      setTimeout(() => {
        // window.location.href = "welcome.html";
        console.log("Loading completed!");
      }, 400);
    }
  };

  requestAnimationFrame(updateProcess);
});
