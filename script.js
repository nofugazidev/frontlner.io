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
    const num = button.getAttribute('data-number');

    if(currentVal === '0' || isResetOnNextKey){
        currentVal = num;
        isResetOnNextKey = false;
    } else {
        currentVal += num;
    }

    updateDisplay()
  });
});

//handling operators

