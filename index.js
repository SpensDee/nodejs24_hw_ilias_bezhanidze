// TASK 1
const string = "Node.js course";

console.log(string.length);


// TASK 2
const number = 33;

function multiply(value, multiply) {
  if (value && typeof value === "number") {
    let getValStrLen = (value += '').length;

    return value * multiply * getValStrLen;
  } else {
    return "Value is Not a Number";
  }
}

console.log(multiply(number, 2));
