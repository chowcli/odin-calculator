// function for add, subtract, multiply, divide
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// function to call the operators function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

// UI
const upperScreen = document.querySelector("#upper");
const bellowScreen = document.querySelector("#bellow");
const clearBtn = document.querySelector("#clearBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const periodBtn = document.querySelector("#period");
const equalBtn = document.querySelector("#equal");

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");

let firstValue = "";
let secondValue = "";
let operator = "";

// function to display clicked button number on the screen
function populateScreen(event) {
  if (bellowScreen.textContent.length < 12) {
    firstValue = event.target.textContent;
    bellowScreen.textContent += firstValue;
  }
  return;
}

numberBtns.forEach(btn => {
  btn.addEventListener("click", populateScreen);
});




// function for delete button
function deleteValue() {
  let length = bellowScreen.textContent.length;
  bellowScreen.textContent = bellowScreen.textContent.slice(0, length - 1);
}

deleteBtn.addEventListener("click", deleteValue);
