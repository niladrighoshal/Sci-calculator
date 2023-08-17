// Get references to the input and output boxes
const inputBox = document.getElementById("inputBox");
const outputBox = document.getElementById("outputBox");

// Function to handle button clicks
function handleButtonClick(buttonText) {
  // Handle special cases
  if (buttonText === "AC") {
    inputBox.value = "";
    outputBox.value = "";
    inputBox.textContent = "0"; // Reset the input box
    return;
  }

  if (buttonText === "=") {
    const expression = inputBox.value.trim();
    try {
      const result = evaluateExpression(expression);
      outputBox.value = result;
    } catch (error) {
      outputBox.value = "Error";
    }
  } else if (buttonText === "√") {
    // Square root
    inputBox.value += "sqrt(";
  } else if (buttonText === "^2") {
    // Square
    inputBox.value += "**2";
  } else if (buttonText === "^3") {
    // Cube
    inputBox.value += "**3";
  } else {
    // Check for special function buttons
    const specialFunctions = {
      reciprocal: "1/(",
      pow: "**",
      log: "Math.log10(",
      ln: "Math.log(",
      sin: "Math.sin(",
      cos: "Math.cos(",
      tan: "Math.tan(",
      combin: " nCr ",
      "open-paren": "(",
      "close-paren": ")",
    };

    const specialFunctionValue = specialFunctions[buttonText];
    if (specialFunctionValue !== undefined) {
      inputBox.value += specialFunctionValue;
    } else {
      inputBox.value += buttonText;
    }
  }
}

// Function to evaluate mathematical expressions using a parser
function evaluateExpression(expression) {
  // Replace the '×' and '÷' symbols with '*' and '/' respectively
  expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

  // Define special functions that need custom evaluation
  const specialFunctions = {
    sqrt: (arg) => Math.sqrt(arg),
    square: (arg) => Math.pow(arg, 2),
    cube: (arg) => Math.pow(arg, 3),
    log: (arg) => Math.log10(arg),
    ln: (arg) => Math.log(arg),
    sin: (arg) => Math.sin(arg),
    cos: (arg) => Math.cos(arg),
    tan: (arg) => Math.tan(arg),
  };

  // Regular expression to match any special function
  const specialFunctionRegex = /(\w+)\(([^)]+)\)/;

  // Custom evaluation for special functions
  expression = expression.replace(
    specialFunctionRegex,
    (match, funcName, arg) => {
      const func = specialFunctions[funcName];
      if (func) {
        return func(Number(arg));
      } else {
        return match; // If function not found, return the original match
      }
    }
  );

  // Evaluate the expression using Function constructor
  return Function(`'use strict'; return (${expression});`)();
}

// Add click event listener to all buttons inside .basic-keys
const basicKeysButtons = document.querySelectorAll(
  ".basic-keys button:not(.pink)"
);
basicKeysButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.textContent);
  });
});

// Add click event listener to the decimal point button
const decimalButton = document.querySelector(".period");
decimalButton.addEventListener("click", () => {
  if (!inputBox.value.includes(".")) {
    handleButtonClick(".");
  }
});

// Add click event listener to the DEL button
const delButton = document.querySelector(".del");
delButton.addEventListener("click", () => {
  inputBox.value = inputBox.value.slice(0, -1);
});

// Add click event listener to the AC button
const acButton = document.querySelector(".ac");
acButton.addEventListener("click", () => {
  handleButtonClick("AC");
});

// Add click event listener to the center-shift button
const centerShiftButton = document.querySelector(".center-shift");
if (centerShiftButton) {
  centerShiftButton.addEventListener("click", () => {
    // Add the desired functionality when the center-shift button is clicked
  });
}

// Add click event listener to the center-alpha button
const centerAlphaButton = document.querySelector(".center-alpha");
if (centerAlphaButton) {
  centerAlphaButton.addEventListener("click", () => {
    // Add the desired functionality when the center-alpha button is clicked
  });
}

// Add click event listener to the square root button
const squareRootButton = document.querySelector(".sqrt");
squareRootButton.addEventListener("click", () => {
  handleButtonClick("sqrt");
});

// Add click event listener to the square button
const squareButton = document.querySelector(".square");
squareButton.addEventListener("click", () => {
  handleButtonClick("square");
});

// Add click event listener to the power (^) button
const powerButton = document.querySelector(".pow");
powerButton.addEventListener("click", () => {
  handleButtonClick("^");
});

// Add click event listener to the log button
const logButton = document.querySelector(".log");
logButton.addEventListener("click", () => {
  handleButtonClick("log");
});

// Add click event listener to the ln button
const lnButton = document.querySelector(".ln");
lnButton.addEventListener("click", () => {
  handleButtonClick("ln");
});

// Add click event listener to the cube button
const cubeButton = document.querySelector(".cube");
cubeButton.addEventListener("click", () => {
  handleButtonClick("cube");
});

// Add click event listener to the sin button
const sinButton = document.querySelector(".sin");
sinButton.addEventListener("click", () => {
  handleButtonClick("sin");
});

// Add click event listener to the cos button
const cosButton = document.querySelector(".cos");
cosButton.addEventListener("click", () => {
  handleButtonClick("cos");
});

// Add click event listener to the tan button
const tanButton = document.querySelector(".tan");
tanButton.addEventListener("click", () => {
  handleButtonClick("tan");
});

// Add click event listener to the nCr button
const ncrButton = document.querySelector(".combin");
ncrButton.addEventListener("click", () => {
  handleButtonClick("combin");
});

// Add click event listener to the equals button
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
  const expression = inputBox.value.trim(); // Remove leading and trailing whitespaces
  const result = evaluateExpression(expression);
  outputBox.value = result;
});
