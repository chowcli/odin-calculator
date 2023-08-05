// Object Values
const calculator = {
  currDisplay: "0",
  prevDisplay: "",
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

// Update Current Display
function showCurrDisplay() {
  const currDisplay = document.getElementById("bellow");
  currDisplay.textContent = calculator.currDisplay;
}
showCurrDisplay();

// Update Previous Display
function showPrevDisplay() {
  const { firstOperand, secondOperand, operator, waitingForSecondOperand } =
    calculator;
  const prevDisplay = document.getElementById("upper");
  const visualOperator = {
    "+": "+",
    "-": "-",
    "*": "&#215;",
    "/": "&#247;",
  };

  // Reset the screen
  if (calculator.currDisplay === "0") {
    prevDisplay.textContent = calculator.prevDisplay;
    return;
  }

  // Display only the first operand and the selected operator
  if (waitingForSecondOperand === true && operator != "=") {
    calculator.prevDisplay = `${firstOperand} ${visualOperator[operator]}`;
    prevDisplay.innerHTML = calculator.prevDisplay;
    return;
  }
  // Display full expression when click "=" sign
  if (operator === "=") {
    prevDisplay.innerHTML =
      calculator.prevDisplay + ` ${secondOperand} ${operator}`;
    return;
  }
}

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
  return;
}

// Reset Calculator
function resetCalculator() {
  calculator.currDisplay = "0";
  calculator.prevDisplay = "";
  calculator.firstOperand = null;
  calculator.secondOperand = null;
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
  if (calculator.waitingForSecondOperand === true) {
    calculator.currDisplay = digit;
    calculator.waitingForSecondOperand = false;
    return;
  }
  // prevent user from entering too long number
  if (calculator.currDisplay.length < 13) {
    calculator.currDisplay =
      calculator.currDisplay === "0" ? digit : calculator.currDisplay + digit;
    return;
  }
}

// Input Decimal
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    // prevent digit being appended to the existing value
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
  const { currDisplay, firstOperand, operator, waitingForSecondOperand } =
    calculator;
  const inputValue = parseFloat(currDisplay);

  if (operator && waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    calculator.secondOperand = inputValue;
    const result = calculate(firstOperand, calculator.secondOperand, operator);
    // this condition is for "=" sign
    calculator.currDisplay = `${parseFloat(result.toFixed(7))}`;
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
      return secondOperand; // return result
  }
}
