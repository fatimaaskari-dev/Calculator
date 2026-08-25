"use strict";

const display = document.querySelector(".display p");
const keypad = document.querySelector(".keypad");

const delKey = document.querySelector(".key-del");
const resetKey = document.querySelector(".key-reset");
const equalKey = document.querySelector(".key-equal");

const themeToggle = document.querySelector(".theme-toggle");

display.textContent = "0";

let currentNumber = "";
let previousNumber = "";
let operator = "";

let justCalculated = false;

// ======================================
// CALCULATOR
// ======================================

keypad.addEventListener("click", function (e) {
  const clickedElement = e.target;

  if (clickedElement.matches(".number")) {
    const value = clickedElement.textContent.trim();

    // ======================================
    // NUMBER
    // ======================================

    if (justCalculated) {
      previousNumber = "";
      currentNumber = "";
      operator = "";

      display.textContent = "0";

      justCalculated = false;
    }

    if (operator === "") {
      previousNumber += value;

      display.textContent = previousNumber;
    } else {
      currentNumber += value;

      display.textContent = `${previousNumber} ${operator} ${currentNumber}`;
    }
  }

  // ======================================
  // OPERATOR
  // ======================================

  if (clickedElement.matches(".operator")) {
    if (justCalculated) {
      justCalculated = false;
    }

    if (previousNumber !== "") {
      operator = clickedElement.textContent.trim();

      display.textContent = `${previousNumber} ${operator}`;
    }
  }

  if (clickedElement.matches(".assignment")) {
    if (previousNumber === "" || currentNumber === "" || operator === "") {
      return;
    }

    const firstNumber = Number(previousNumber);
    const secondNumber = Number(currentNumber);

    let result;

    if (operator === "+") {
      result = firstNumber + secondNumber;
    }

    if (operator === "-") {
      result = firstNumber - secondNumber;
    }

    if (operator === "x") {
      result = firstNumber * secondNumber;
    }

    if (operator === "/") {
      if (secondNumber === 0) {
        display.textContent = "Cannot divide by 0";

        previousNumber = "";
        currentNumber = "";
        operator = "";

        return;
      }

      result = firstNumber / secondNumber;
    }

    display.textContent = result;

    previousNumber = String(result);

    currentNumber = "";

    operator = "";

    justCalculated = true;
  }

  // ======================================
  // DELETE
  // ======================================

  if (clickedElement.matches(".key-del")) {
    if (justCalculated) {
      previousNumber = "";
      currentNumber = "";
      operator = "";

      display.textContent = "0";

      justCalculated = false;

      return;
    }

    if (operator === "") {
      previousNumber = previousNumber.slice(0, -1);

      display.textContent = previousNumber || "0";
    } else {
      currentNumber = currentNumber.slice(0, -1);

      display.textContent = `${previousNumber} ${operator} ${currentNumber}`;
    }
  }

  // ======================================
  // RESET
  // ======================================

  if (clickedElement.matches(".key-reset")) {
    previousNumber = "";
    currentNumber = "";
    operator = "";

    justCalculated = false;

    display.textContent = "0";
  }
});

// ======================================
// THEME SWITCHER
// ======================================

let currentTheme = 1;

themeToggle.addEventListener("click", function () {
  currentTheme++;

  if (currentTheme > 3) {
    currentTheme = 1;
  }

  document.body.classList.remove("theme-1", "theme-2", "theme-3");

  document.body.classList.add(`theme-${currentTheme}`);
});
