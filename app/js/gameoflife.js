window.onload = function() {
  initial();
  game();
  stop();
  reset();
  exampleone();
  exampletwo();
  examplethree();
}
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const configurationOneButton = document.getElementById("con1");
const configurationTwoButton = document.getElementById("con2");
let configurationThreeButton = document.getElementById("con3");
let firstRow = document.querySelector("#firLine");
let secondRow = document.querySelector("#secLine");
let thirdRow = document.querySelector("#thiLine");
let fourthRow = document.querySelector("#fouLine");
let fifthRow = document.querySelector("#fifLine");
let sixthRow = document.querySelector("#sixLine");
let seventhRow = document.querySelector("#sevLine");
let eighthRow = document.querySelector("#eigLine");
let ninthRow = document.querySelector("#ninLine");
let tenthRow = document.querySelector("#tenLine");
let elethRow = document.querySelector("#eleLine");
let twethRow = document.querySelector("#tweLine");
let thithRow = document.querySelector("#thitrLine");
let fouthtRow = document.querySelector("#foutLine");
let fifthtRow = document.querySelector("#fiftLine");
let sixthtRow = document.querySelector("#sixtLine");
let sevthtRow = document.querySelector("#sevthLine");
let eigthtRow = document.querySelector("#eigthLine");
let ninthtRow = document.querySelector("#ninthLine");
let twenthRow = document.querySelector("#twenLine");

let gameStarted = false;
let gameloop;
let allRows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow, sixthRow,
  seventhRow, eighthRow, ninthRow, tenthRow, elethRow, twethRow, thithRow,
  fouthtRow, fifthtRow, sixthtRow, sevthtRow, eigthtRow, ninthtRow, twenthRow];
let listOfAreasInGame = [];
let lengthOfRow = firstRow.childElementCount;
let numberOfRows = allRows.length;
// Create references to every area in the game
for (let i = 0; i < numberOfRows; i += 1) {
  for (let j = 0; j < lengthOfRow; j += 1) {
    let newArea = allRows[i].children[j];
    listOfAreasInGame.push(newArea);
  }
}
let lengthListOfAreasInGame = listOfAreasInGame.length;

function initial() {
  // Set attribute for the area if clicked and unset it if clicked twice
  for (let k = 0; k < lengthListOfAreasInGame; k += 1) {
    listOfAreasInGame[k].onclick = function() {
      if (listOfAreasInGame[k].hasAttribute("class") && gameStarted == false) {
          listOfAreasInGame[k].removeAttribute("class");
      } else if (gameStarted == false){
          listOfAreasInGame[k].setAttribute("class", "life");
      }
    }
  }
}


function countingNeighbours() {
  let numberOfAliveNeighbours = 0;
  let arrayOfNumberOfNeighbours = [];
  if (arrayOfNumberOfNeighbours.length == 0) {
    for (let i = 0; i < numberOfRows; i += 1) {
      for (let j = 0; j < lengthOfRow; j += 1) {
        for (let k = -1; k < 2; k += 1){
          if (i + k >= 0 && i + k < numberOfRows) {
            for (let l = -1; l < 2; l += 1){
              if (j + l >= 0 && j + l < lengthOfRow){
                if (k == 0 && l == 0) {
                  continue;
                } else {
                  if ( allRows[i + k].children[j + l].hasAttribute("class")) {
                    numberOfAliveNeighbours += 1;
                  }
                }
              }
            }
          }
        }
        arrayOfNumberOfNeighbours.push(numberOfAliveNeighbours);
        numberOfAliveNeighbours = 0;
      }
    }
  } else {
    arrayOfNumberOfNeighbours = []
  }
  return arrayOfNumberOfNeighbours;
}


function game() {
  startButton.onclick = function() {
    gameStarted = true;
    gameloop = setInterval( function() {
    gamestart() }, 100);
    function gamestart(){
      let arrayOfNumberOfNeighbours = countingNeighbours();
      let lengthOfArrayOfNumberOfNeighbours = arrayOfNumberOfNeighbours.length;
      for (let i = 0; i < lengthOfArrayOfNumberOfNeighbours; i += 1) {
        if (listOfAreasInGame[i].hasAttribute("class")) {
          if (arrayOfNumberOfNeighbours[i] > 3) {
            listOfAreasInGame[i].removeAttribute("class");
         }
        } else if (arrayOfNumberOfNeighbours[i] === 3) {
          listOfAreasInGame[i].setAttribute("class", "life");
        }
      }
    }
  }
}

function exampleone() {
  configurationOneButton.onclick = function() {
    let listone = [297, 337, 377, 417, 457, 299, 301, 341, 381, 421, 461, 459];
    let lengthOfListone = listone.length;
    gameStarted = false;
    for (let k = 0; k < lengthListOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
    for (let i = 0; i < lengthOfListone; i += 1) {
      listOfAreasInGame[listone[i]].setAttribute("class", "life");
    }
  }
}
function exampletwo() {
  configurationTwoButton.onclick = function() {
    let listtwo = [339, 340, 381, 421, 460, 459, 418, 378, 301, 342, 303, 262,
    223, 264, 462, 501, 542, 503, 544, 583, 498, 457, 496, 537, 576, 535, 298, 337, 257, 296, 216, 255];
    let lengthOfListtwo = listtwo.length;
    gameStarted = false;
    for (let k = 0; k < lengthListOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
    for (let i = 0; i < lengthOfListtwo; i += 1) {
      listOfAreasInGame[listtwo[i]].setAttribute("class", "life");
    }
  }
}
function examplethree() {
  configurationThreeButton.onclick = function() {
    let listthree = [41, 81, 42, 681, 721, 722, 757, 758, 718, 78, 118, 77, 60, 99, 101, 740, 701, 699];
    let lengthOfListthree = listthree.length;
    gameStarted = false;
    for (let k = 0; k < lengthListOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
    for (let i = 0; i < lengthOfListthree; i += 1) {
      listOfAreasInGame[listthree[i]].setAttribute("class", "life");
    }
  }
}
function stop() {
  stopButton.onclick = function() {
    gameStarted = false;
    clearInterval(gameloop);
  }
}
function reset() {
  resetButton.onclick = function() {
    gameStarted = false;
    for (let k = 0; k < lengthListOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
  }
}
