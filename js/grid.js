// VARIABLES DECLARATION

const grid = document.querySelector("#grid");
const chainBtn = document.querySelector("#chain");
let numberString = sessionStorage.getItem("number");
let number = Number(numberString);
let color1 = sessionStorage.getItem("color1");
let color2 = sessionStorage.getItem("color2");
let color3 = sessionStorage.getItem("color3");
let colors = [color1, color2, color3];
let chainNotFound = true;
var maxLen = {};
var maxLen1 = {};
var maxLen2 = {};
var maxLen3 = {};
var maxLen4 = {};
var maxLen5 = {};
let max;

// EVENT LISTNERS

chainBtn.addEventListener("click", function () {
  let elements = document.querySelectorAll(".grid-item");
  if (color1 === color2 && color2 === color3) {
    chainNotFound = false;
    for (var i = 0; i < number; i++) {
      chainBorder(elements, number * i, number * (i + 1));
    }
  }
  if (chainNotFound) {
    for (x in maxLen) {
      if ((x % number) + (maxLen[x] - x) <= number) {
        chainNotFound = false;
        chainBorder(elements, x, maxLen[x]);
      }
    }
  }
  if (chainNotFound) {
    chainFinder(elements, maxLen, max - 1);
    chainFinderSmall(elements, maxLen1);
  }
  if (chainNotFound) {
    chainFinder(elements, maxLen, max - 2);
    chainFinder(elements, maxLen1, max - 2);
    chainFinderSmall(elements, maxLen2);
  }
  if (chainNotFound) {
    chainFinder(elements, maxLen, max - 3);
    chainFinder(elements, maxLen1, max - 3);
    chainFinder(elements, maxLen2, max - 3);
    chainFinderSmall(elements, maxLen3);
  }
  if (chainNotFound) {
    chainFinder(elements, maxLen, max - 4);
    chainFinder(elements, maxLen1, max - 4);
    chainFinder(elements, maxLen2, max - 4);
    chainFinder(elements, maxLen3, max - 4);
    chainFinderSmall(elements, maxLen4);
  }
  if (chainNotFound) {
    chainFinder(elements, maxLen, max - 5);
    chainFinder(elements, maxLen1, max - 5);
    chainFinder(elements, maxLen2, max - 5);
    chainFinder(elements, maxLen3, max - 5);
    chainFinder(elements, maxLen4, max - 5);
    chainFinderSmall(elements, maxLen5);
  }
});

// FUCTIONS

function makeGrid(rows, cols) {
  grid.style.setProperty("--gridRows", rows);
  grid.style.setProperty("--gridCols", cols);
  for (var i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
  }
}

function fillColor() {
  let elements = document.querySelectorAll(".grid-item");
  for (var j = 0; j < elements.length; j++) {
    color = colors[Math.floor(Math.random() * colors.length)];
    elements[j].style.backgroundColor = color;
  }
}

function chain() {
  let elements = document.querySelectorAll(".grid-item");
  let initialGrid = 0;
  let finalGrid = 0;
  var obj = {};
  for (var k = 1; k <= elements.length; k++) {
    let elementColor = elements[k - 1].style.backgroundColor;
    if (k === elements.length) {
      obj[initialGrid] = finalGrid + 1;
      break;
    }
    if (elements[k].style.backgroundColor === elementColor) {
      finalGrid++;
    } else {
      obj[initialGrid] = finalGrid + 1;
      initialGrid = k;
      finalGrid = k;
    }
  }
  max = obj[0];
  for (x in obj) {
    if (obj[x] - x > max) {
      max = obj[x] - x;
    }
  }
  for (x in obj) {
    if (obj[x] - x === max) {
      maxLen[x] = obj[x];
    }
    if (obj[x] - x === max - 1) {
      maxLen1[x] = obj[x];
    }
    if (obj[x] - x === max - 2) {
      maxLen2[x] = obj[x];
    }
    if (obj[x] - x === max - 3) {
      maxLen3[x] = obj[x];
    }
    if (obj[x] - x === max - 4) {
      maxLen4[x] = obj[x];
    }
    if (obj[x] - x === max - 5) {
      maxLen5[x] = obj[x];
    }
  }
}

function chainFinder(elements, object1, maximum) {
  for (x in object1) {
    let m = x - (x % number) + number;
    let p1 = m - x;
    let p2 = object1[x] - m;
    console.log(m, p1, p2);
    if (p1 === number) {
      chainNotFound = false;
      chainBorder(elements, x, m);
    }
    if (p2 >= number) {
      chainNotFound = false;
      chainBorder(elements, m, m + number);
      if (p2 - number >= number) {
        chainBorder(elements, m + number, m + 2 * number);
      }
    } else if (p1 === p2 && p1 === maximum) {
      chainNotFound = false;
      chainBorder(elements, x, m);
      chainBorder(elements, m, object1[x]);
    } else if (p1 === maximum) {
      chainNotFound = false;
      chainBorder(elements, x, m);
    } else if (p2 === maximum) {
      chainNotFound = false;
      chainBorder(elements, m, object1[x]);
    }
  }
}

function chainFinderSmall(elements, object2) {
  for (x in object2) {
    if ((x % number) + (object2[x] - x) <= number) {
      chainNotFound = false;
      chainBorder(elements, x, object2[x]);
    }
  }
}

function chainBorder(elements, inititalCell, finalCell) {
  let flag = true;
  for (var i = inititalCell; i < finalCell; i++) {
    if (flag) {
      elements[inititalCell].style.borderLeft = "2px solid black";
      elements[finalCell - 1].style.borderRight = "2px solid black";
      flag = false;
    }
    elements[i].style.borderTop = "2px solid black";
    elements[i].style.borderBottom = "2px solid black";
  }
}

makeGrid(number, number);
fillColor();
chain();
