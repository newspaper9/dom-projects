const generatePasswordButton = document.getElementById("generate-btn");
const passwordLengthRangeInput = document.getElementById("length-slider");
const passwordLengthOutput = document.getElementById("length-value");
const message = document.getElementById("status-text");
const copyGeneratedPassword = document.getElementById("copy-btn");
const showGeneratedPassword = document.getElementById("password-field");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
  let password = "";
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;

  while (password.length < Number(passwordLengthRangeInput.value)) {
    crypto.getRandomValues(random);
    if (random[0] < limit) {
      password += characters[random[0] % characters.length];
    }
  }

  showGeneratedPassword.value = password;
  message.textContent = "Uses letters, numbers, and symbols.";
};

const generatePasswordFromRange = () => {
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
  generatePassword();
};

generatePasswordButton.addEventListener("click", generatePassword);
passwordLengthRangeInput.addEventListener("input", generatePasswordFromRange);
copyGeneratedPassword.addEventListener("click", () => {
  navigator.clipboard.writeText(showGeneratedPassword.value);
  message.textContent = "Copied to clipboard.";
  copyGeneratedPassword.textContent = "Copied";

  setTimeout(() => {
    message.textContent = "Uses letters, numbers, and symbols.";
    copyGeneratedPassword.textContent = "Copy";
  }, 2000);
});

generatePassword();
