let currentDisplay = "";
let previousNum = "";
let isCalculationDone = false;
let displayElement = document.getElementById("displayNumber");
let previousOperationElement = document.getElementById("previous-operation")

function registerNumber(button) {
  let numberString = button.getAttribute("data-number");
  currentDisplay += numberString;
  displayElement.textContent = currentDisplay;
  if(isOperatorPresent()) {
    colocaEmCima(currentDisplay);
    calculateExpression();
  }
};

function isOperator(character) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(character);
}

function registerOperator(button) {
  if (currentDisplay === '') {
    return; 
  }

  const operatorString = button.getAttribute("data-operator");
  const lastCharacter = currentDisplay[currentDisplay.length - 1];

  if (isOperator(lastCharacter)) {
    currentDisplay = currentDisplay.slice(0, -1) + operatorString;
  } else {
    currentDisplay += operatorString;
  }

  displayElement.textContent = currentDisplay;
  colocaEmCima(currentDisplay);
};

function isOperatorPresent() {
  const operators = ["+", "-", "*", "/"];
  for (i = 0; i < operators.length; i++) {
    if (currentDisplay.includes(operators[i])) {
      return true;
    }
  }
  return false;
};

function reset() {
  currentDisplay = "";
  displayElement.textContent = "";
  previousOperationElement.textContent = "";
};

function colocaEmCima(oqueColocar) {
  previousOperationElement.textContent = oqueColocar
};

function calculateExpression() {
  const lastCharacter = currentDisplay[currentDisplay.length - 1];

  if (isOperator(lastCharacter)) {
    return reset();
  }

  let expression = previousOperationElement.textContent
  var operands = expression.split(/[-+*/]/);
  var operators = expression.split(/[\d.]+/).filter(Boolean);

  // Applying operators sequentially
  var result = parseFloat(operands[0]);
  for (var i = 0; i < operators.length; i++) {
    var operator = operators[i];
    var operand = parseFloat(operands[i + 1]);
    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if(operand == 0) {
          return reset()
        }
        result /= operand;
        break;
    }
  }

  let formattedNumber = parseFloat(result.toFixed(20)).toFixed(3);

  if (formattedNumber.indexOf('.') !== -1) {
    formattedNumber = formattedNumber.replace(/\.?0*$/, '');
  }

  return displayElement.textContent = formattedNumber
}



