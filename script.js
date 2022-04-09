// Selecionando os botões
let numbersButtons = document.querySelectorAll(".data-number");
let operationButtons = document.querySelectorAll(".data-operator");
let resultButton = document.querySelector(".data-result");
let deleteButton = document.querySelector(".delete");
let allClearButton = document.querySelector(".all-clear");
let previousNumber = document.querySelector(".data-previous");
let currentNumber = document.querySelector(".data-current");

// Classe Calculadora
class Calculator {
  constructor(previousNumber, currentNumber) {
    this.previousNumber = previousNumber;
    this.currentNumber = currentNumber;
    this.clear();
  }
  calculate() {
    let result;

    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) {
      return;
    }

    switch (this.operation) {
      case "+":
        result = previousOperandFloat + currentOperandFloat;
        break;
      case "-":
        result = previousOperandFloat - currentOperandFloat;
        break;
      case "÷":
        result = previousOperandFloat / currentOperandFloat;
        break;
      case "*":
        result = previousOperandFloat * currentOperandFloat;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  choseOperation(operation) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") {
      return;
    }
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousNumber.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentNumber.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

const calculator = new Calculator(previousNumber, currentNumber);

for (const numbersButton of numbersButtons) {
  numbersButton.addEventListener("click", () => {
    calculator.appendNumber(numbersButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.choseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

resultButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
