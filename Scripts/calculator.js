const calculatorButtonDecimal = document.querySelector("#calculatorButtonDecimal");
const calculatorButtonEquals = document.querySelector("#calculatorButtonEquals");
const calculatorButtonAdd = document.querySelector("#calculatorButtonAdd");
const calculatorButtonSubtract = document.querySelector("#calculatorButtonSubtract");
const calculatorButtonMultiply = document.querySelector("#calculatorButtonMultiply");
const calculatorButtonDivide = document.querySelector("#calculatorButtonDivide");
const calculatorButtonDelete = document.querySelector("#calculatorButtonDelete");

const calculatorDisplay = document.querySelector("#calculatorDisplay");

let equation = "";
let resetDisplay = false;

function updateDisplay(value) {
    calculatorDisplay.innerText = value;
}

function addNumberToEquation(value) {
    if (resetDisplay) {
        updateDisplay(value === "." ? "0." : value);
        resetDisplay = false;
    } else {
        if (calculatorDisplay.innerText === "0" || calculatorDisplay.innerText === "") {
            if (value === ".") {
                updateDisplay("0.")
            } else {
                updateDisplay(value);
            }
        } else {
            updateDisplay(calculatorDisplay.innerText + value);
        }
    }
    equation += value;
}

function addOperatorToEquation(operator, display) {
    equation += operator;
    updateDisplay(display);
    resetDisplay = true;
}

function calculateResult() {
    try {
        if (!equation) return;
        const result = Function(`return (${equation})`)();
        let displayResult = result;
        if (result % 1 !== 0) {
            displayResult = Math.round(result * 10000) / 10000;
        }
        updateDisplay(displayResult.toString());
        equation = result.toString();
        resetDisplay = true;
    } catch (error) {
        updateDisplay("Error");
        setTimeout(function () {
            updateDisplay("");
        }, 300);
        equation = "";
    }
}

function clearCalculator() {
    equation = "";
    updateDisplay("");
}

//event listeners
for (let i = 0; i <= 9; i++) {
    const button = document.querySelector(`#calculatorButton${i}`);
    if (button) {
        button.addEventListener("click", function () {
           addNumberToEquation(i.toString());
           button.classList.add("calculator_select_button");
           setTimeout(function () {
               button.classList.remove("calculator_select_button");
           }, 150);
        });
    }
}
if (calculatorButtonDecimal) {
    calculatorButtonDecimal.addEventListener("click", function () {
        addNumberToEquation(".")
        calculatorButtonDecimal.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonDecimal.classList.remove("calculator_select_button");
           }, 150);
    });
}
if (calculatorButtonAdd) {
    calculatorButtonAdd.addEventListener("click", function () {
        addOperatorToEquation("+", "+");
        calculatorButtonAdd.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonAdd.classList.remove("calculator_select_button");
           }, 150);
    });
}
if (calculatorButtonSubtract) {
    calculatorButtonSubtract.addEventListener("click", function () {
        addOperatorToEquation("-", "-");
        calculatorButtonSubtract.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonSubtract.classList.remove("calculator_select_button");
           }, 150);
    });
}
if (calculatorButtonMultiply) {
    calculatorButtonMultiply.addEventListener("click", function () {
        addOperatorToEquation("*", "x");
        calculatorButtonMultiply.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonMultiply.classList.remove("calculator_select_button");
           }, 150);
    });
}
if (calculatorButtonDivide) {
    calculatorButtonDivide.addEventListener("click", function () {
        addOperatorToEquation("/", "÷");
        calculatorButtonDivide.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonDivide.classList.remove("calculator_select_button");
           }, 150);
    });
}

if (calculatorButtonEquals) {
    calculatorButtonEquals.addEventListener("click", function () {
        calculateResult();
        calculatorButtonEquals.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonEquals.classList.remove("calculator_select_button");
           }, 150);
    });
}

if (calculatorButtonDelete) {
    calculatorButtonDelete.addEventListener("click", function () {
        clearCalculator();
        calculatorButtonDelete.classList.add("calculator_select_button");
           setTimeout(function () {
               calculatorButtonDelete.classList.remove("calculator_select_button");
           }, 150);
    });
}

