//select dom elements
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const decimalButton = document.getElementById("decimal");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

//application memory state
let currentVal = "0";
let prevVal = null;
let activeOperation = null;
let isResetOnNextKey = false;

//update display that user sees

function updateDisplay() {
  display.innerText = currentVal;
}

//get user input by tracking the numbers they pressed
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const num = button.getAttribute("data-number");

    if (currentVal === "0" || isResetOnNextKey) {
      currentVal = num;
      isResetOnNextKey = false;
    } else {
      currentVal += num;
    }

    updateDisplay();
  });
});

//handling operators
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    prevVal = currentVal;
    activeOperation = button.getAttribute("data-operator");
    isResetOnNextKey = true;
  });
});

//calculating output
equalsButton.addEventListener("click", () => {
  if (!activeOperation || prevVal === null) return;

  const prev = parseFloat(prevVal);
  const current = parseFloat(currentVal);
  let result = 0;

  switch (activeOperation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentVal = String(result);
  prevVal = null;
  activeOperation = null;
  isResetOnNextKey = true;
  updateDisplay();
});
