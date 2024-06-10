const calculatorScreen = document.querySelector("#calculator-screen");
const buttons = document.querySelectorAll(".button");

let currentInput = "";
let shouldResetScreen = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    if ((action >= "0" && action <= "9") || action === ".") {
      handleNumberInput(action);
    } else if (action === "clear") {
      clearInput();
    } else if (action === "delete") {
      deleteInput();
    } else if (action === "=") {
      calculate();
    } else {
      handleOperator(action);
    }
    updateScreen();
  });
});

function handleNumberInput(action) {
  if (shouldResetScreen) {
    currentInput = "";
    shouldResetScreen = false;
  }
  if (action === "." && currentInput.includes(".")) return;
  currentInput += action;
}

function clearInput() {
  currentInput = "";
}

function deleteInput() {
  currentInput = currentInput.slice(0, -1);
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    shouldResetScreen = true;
  } catch {
    currentInput = "Error";
    shouldResetScreen = true;
  }
}

function handleOperator(action) {
  if (shouldResetScreen) shouldResetScreen = false;
  if (currentInput === "") return;
  const lastChar = currentInput[currentInput.length - 1];
  if ("+-*/".includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += action;
}

function updateScreen() {
  calculatorScreen.textContent = currentInput || "0";
}
