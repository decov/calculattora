// botões de números e operadores
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");

// [DEL], [AC] e [=]
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

// operandos (anterior e atual)
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clear();
    }

    // formatação responsiva
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

    // função de deletar dígito do output
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // função de cálculo
    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand); // anterior
        const _currentOperand = parseFloat(this.currentOperand); // atual

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            // adição
            case "+":
                result = _previousOperand + _currentOperand;
                break;

            // subtração
            case "-":
                result = _previousOperand - _currentOperand;
                break;

            // divisão
            case "÷":
                result = _previousOperand / _currentOperand;
                break;

            // multiplicação
            case "*":
                result = _previousOperand * _currentOperand;
                break;

            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    // função de limpar o output
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    // função de atualizar o output
    updateDisplay() {
        // anterior
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
            this.previousOperand
        )} ${this.operation || ""}`;

        // atual
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(
            this.currentOperand
        );
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

// botões de números
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

// botões de operadores
for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

// função realizada após clicar no botão [AC]
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

// função realizada após clicar no botão [=]
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

// função realizada após clicar no botão [DEL]
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});