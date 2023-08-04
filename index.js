// Object Values
const calculator = {
  currDisplay: "0",
  prevDisplay: "",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

// Update Current Display
function showCurrDisplay() {
  const currDisplay = document.getElementById("bellow");
  currDisplay.textContent = calculator.currDisplay;
}
showCurrDisplay();

// Handle Key Press
const controlBtn = document.querySelector(".bigBtn");
controlBtn.addEventListener("click", handleControlBtn);

function handleControlBtn(event) {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.matches("#clearBtn")) {
    resetCalculator();
    showCurrDisplay();
    showPrevDisplay();
    return;
  }
  if (target.matches("#deleteBtn")) {
    deleteDigit();
    showCurrDisplay();
    return;
  }
}

const keys = document.querySelector(".smallBtn");
keys.addEventListener("click", handleNumAndOpBtn);

function handleNumAndOpBtn(event) {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.id);
    showCurrDisplay();
    showPrevDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.id);
    showCurrDisplay();
    return;
  }

  inputDigit(target.id);
  showCurrDisplay();
  showPrevDisplay();
  return;
}

// Reset Calculator
function resetCalculator() {
  calculator.currDisplay = "0";
  calculator.prevDisplay = "";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

// Delete Digit
function deleteDigit() {
  if (calculator.currDisplay.length < 2) {
    calculator.currDisplay = "0";
    return;
  }

  calculator.currDisplay = calculator.currDisplay.slice(0, -1);
}

// Input Digit
function inputDigit(digit) {
  if (calculator.currDisplay.length < 13) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.currDisplay = digit;
      calculator.waitingForSecondOperand = false;
      return;
    }

    calculator.currDisplay =
      calculator.currDisplay === "0" ? digit : calculator.currDisplay + digit;
  }
}

// Input Decimal
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.currDisplay = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.currDisplay.includes(dot)) {
    calculator.currDisplay += dot;
    return;
  }
}

// Handle Operator
function handleOperator(nextOperator) {
  const {
    currDisplay,
    prevDisplay,
    firstOperand,
    operator,
    waitingForSecondOperand,
  } = calculator;
  const inputValue = parseFloat(currDisplay);

  if (operator && waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.currDisplay = `${parseFloat(result.toFixed(13))}`;
    calculator.firstOperand = result;
  }

  calculator.operator = nextOperator;
  calculator.waitingForSecondOperand = true;
}

// Calculator Logic
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}
