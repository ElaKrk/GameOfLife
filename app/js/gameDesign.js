document.addEventListener("DOMContentLoaded", function (event) {

  //Create all areas in the game
  (() => {
    const gameArea = document.querySelector(".game");
    for (let i = 0; i < 40; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < 80; j++) {
        const field = document.createElement("div");
        row.appendChild(field);
      }
      gameArea.appendChild(row);
    }
    return gameArea;
  })();
  
  const navButton = document.querySelector(".nav-button");
  const sideNavigation = document.querySelector(".sidenav");
  const mainNavigation = document.querySelector(".nav");
  const title = document.querySelector(".header__title");

  navButton.addEventListener("click", () => {
    sideNavigation.style.width = "60%";
    mainNavigation.style.height = "0";
    title.innerText = "GAME";
    title.setAttribute("class", "header--vertical");
  })

  const closeSign = document.querySelector(".nav__close-sign");
  closeSign.addEventListener("click", () => {
    sideNavigation.style.width = "0";
    mainNavigation.style.height = "50px";
    const horizontalLine = document.createElement("hr");
    horizontalLine.setAttribute("class", "header__line");
    const secondHorizontalLine = horizontalLine.cloneNode(true);
    
    title.innerText = "Game of life";
    title.setAttribute("class", "header__title");
    
    title.insertAdjacentElement('afterbegin', horizontalLine);
    title.appendChild(secondHorizontalLine);
  })

  const startButton = document.querySelector(".box-butons__button--start");
  const stopButton = document.querySelector(".box-butons__button--stop");
  const resetButton = document.querySelector(".box-butons__button--reset");
  const configurationOneButton = document.querySelector(".box-butons__button--ex1");
  const configurationTwoButton = document.querySelector(".box-butons__button--ex2");
  const configurationThreeButton = document.querySelector(".box-butons__button--ex3");


  const oneRow = document.querySelector(".game > div");
  const listOfAreasInOneRow = oneRow.querySelectorAll("div");
  const lengthOfRow = listOfAreasInOneRow.length;
  const allRows = document.querySelectorAll(".game > div");
  const numberOfRows = allRows.length;
  const listOfAreasInGame = document.querySelectorAll(".game > div div");
  const numberOfAreasInGame = listOfAreasInGame.length;

  const indexOfMiddleField = (((numberOfRows / 2) - 1) * lengthOfRow + (lengthOfRow / 2));

  // Set attribute for the area if clicked and unset it if clicked twice
  (() => {
    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].addEventListener("click", () => {
        if (gameStarted == false) {
          if (listOfAreasInGame[k].hasAttribute("class") && gameStarted == false) {
            listOfAreasInGame[k].removeAttribute("class");
          } else if (gameStarted == false) {
            listOfAreasInGame[k].setAttribute("class", "game-area--alive");
          }
        }
      })
    }
  })();

  //Name of interval of showing new stages of population
  let gameloop;
  let gameStarted = false;

  //Count alive neighbours for every area and create list containing those numbers
  function countingNeighbours() {
    let numberOfAliveNeighbours = 0;
    let arrayOfNumberOfNeighbours = [];
    if (arrayOfNumberOfNeighbours.length === 0) {
      //iterating through rows
      for (let i = 0; i < numberOfRows; i += 1) {
        //iterating through areas in a row
        for (let j = 0; j < lengthOfRow; j += 1) {
          //checking in area above and below the current area
          for (let k = -1; k < 2; k += 1) {
            if (i + k >= 0 && i + k < numberOfRows) {
              //checking in area before and after the current area
              for (let l = -1; l < 2; l += 1) {
                if (j + l >= 0 && j + l < lengthOfRow) {
                  //don"t check yourself
                  if (k === 0 && l === 0) {
                    continue;
                  } else {
                    if (listOfAreasInGame[lengthOfRow * (i + k) + (j + l)].hasAttribute("class")) {
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
      arrayOfNumberOfNeighbours = [];
    }
    return arrayOfNumberOfNeighbours;
  }

  function oneCycleOfLife() {
    const arrayOfNumberOfNeighbours = countingNeighbours();
    const lengthOfArrayOfNumberOfNeighbours = arrayOfNumberOfNeighbours.length;

    for (let i = 0; i < lengthOfArrayOfNumberOfNeighbours; i += 1) {
      if (listOfAreasInGame[i].hasAttribute("class")) {
        if (arrayOfNumberOfNeighbours[i] > 3 || arrayOfNumberOfNeighbours[i] < 2) {
          listOfAreasInGame[i].removeAttribute("class");
        }
      } else if (arrayOfNumberOfNeighbours[i] === 3) {
        listOfAreasInGame[i].setAttribute("class", "game-area--alive");
      }
    }
  }

  function gameOfLife() {
    startButton.addEventListener("click", () => {
      gameStarted = true;
      gameloop = setInterval(() => {
        oneCycleOfLife()
      }, 100);
    })
  }

  function countAreasFromTheMiddle(list){
    const listOfAreasCountedFromTheMiddle = [];
    for (let i = 0; i < list.length; i++) {
      listOfAreasCountedFromTheMiddle.push(indexOfMiddleField + list[i]);
      listOfAreasCountedFromTheMiddle.push(indexOfMiddleField - list[i]);
    };
    return listOfAreasCountedFromTheMiddle;
  }
  
  function clearAllAreas(){
    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
  }

  function makeChosenAreasAlive(lengthOfList, list){
    for (let i = 0; i < lengthOfList; i += 1) {
      listOfAreasInGame[list[i]].setAttribute("class", "game-area--alive");
    }
  }
 
  function exampleOne() {
    configurationOneButton.addEventListener("click", () => {
      const listOne = [2, 78, 82, 158, 160, 162];
      const listOfAreasExOne = countAreasFromTheMiddle(listOne);
      const lengthListOfAreasExOne = listOfAreasExOne.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExOne, listOfAreasExOne);
   })
  }

  function exampleTwo() {
    configurationTwoButton.addEventListener("click", () => {
      const listTwo = [2, 78, 82, 157, 159, 160, 161, 163, 236, 238, 242, 244, 315, 317, 323, 325, 396, 404];
      const listOfAreasExTwo = countAreasFromTheMiddle(listTwo);
      const lengthListOfAreasExTwo = listOfAreasExTwo.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExTwo, listOfAreasExTwo);
    })
  }

  function exampleThree() {
    configurationThreeButton.addEventListener("click", () => {
      const listThree = [-1042, -1041, -1040, -1039, -962, -961, -958, -880, -877,
        -799, -798, -562, -561, -482, -481, -402, -401, -330, -251, -249, -236,
        -235, -234, -229, -228, -172, -169, -156, -155, -154, -149, -148, -92,
        -90, -70, -68, -12, -11, -6, -5, -4, 9, 12, 68, 69, 74, 75, 76, 89, 91,
          170, 241, 242, 321, 322, 401, 402, 638, 639, 717, 720, 798, 801, 802,
          879, 880, 881, 882];
      const listOfAreasExThree = [];
      for (let i = 0; i < listThree.length; i++) {
        listOfAreasExThree.push(indexOfMiddleField + listThree[i]);
      };
      const lengthListOfAreasExThree = listOfAreasExThree.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExThree, listOfAreasExThree);
    })
  }
  
  function stopTheGame() {
    stopButton.addEventListener("click", () => {
      gameStarted = false;
      clearInterval(gameloop);
    })
  }

  function stopAndResetAllAreas() {
    resetButton.addEventListener("click", () => {
      gameStarted = false;
      clearInterval(gameloop);
      clearAllAreas();
    })
  }

  gameOfLife();
  stopTheGame();
  stopAndResetAllAreas();
  exampleOne();
  exampleTwo();
  exampleThree();
  });
