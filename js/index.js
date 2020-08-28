// VARIABLES DECLARATION

const color1 = document.querySelector("#colour1");
const color2 = document.querySelector("#colour2");
const color3 = document.querySelector("#colour3");
const input = document.querySelector("#grid-input");
const button = document.querySelector("#submit");
let colorValue1;
let colorValue2;
let colorValue3;

// EVENT LISTNERS

color1.addEventListener("change", colorSelector, false);
color2.addEventListener("change", colorSelector, false);
color3.addEventListener("change", colorSelector, false);
button.addEventListener("click", function () {
  colorValue1 = color1.value;
  colorValue2 = color2.value;
  colorValue3 = color3.value;
  sessionStorage.setItem("color1", colorValue1);
  sessionStorage.setItem("color2", colorValue2);
  sessionStorage.setItem("color3", colorValue3);
  sessionStorage.setItem("number", input.value);
});

// FUNCTIONS

function colorSelector(event) {
  let colorValue = event.target.value;
}
