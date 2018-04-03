document.addEventListener("DOMContentLoaded", function (event) {

  function clearGameArea() {
    const gameArea = document.querySelector(".js-game");
    gameArea.innerText = "";
  }

  //Create all areas in the game
  function createAllareas(widthOfWindow) {
    const gameArea = document.querySelector(".js-game");
    for (let i = 0; i < 80; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < widthOfWindow; j++) {
        const field = document.createElement("div");
        row.appendChild(field);
      }
      gameArea.appendChild(row);
    }
  }
  
  function createGame(window) {
    if (window.innerWidth > 768) {
      createAllareas(160);
    } else {
      createAllareas(80);
      
    }
  };

  function adjustBackgroundSizeToWindowHeight(window) {
    const headerArea = document.querySelector(".header-box");
    const height = parseFloat(window.innerHeight);
    headerArea.style.height = `${height}px`;
  }

  const navButton = document.querySelector(".js-nav-button");
  const sideNavigation = document.querySelector(".js-sidenav");
  const mainNavigation = document.querySelector(".nav");
  const title = document.querySelector(".header__title");
  const headerContainer = document.querySelector(".box--large");
  const headerButton = document.querySelector(".header__button");
  const closeSign = document.querySelector(".js-nav__close-sign");
  const game = document.querySelector(".js-game");

  navButton.addEventListener("click", () => {
    headerButton.style.display = "none";
    sideNavigation.style.width = "60%";
    mainNavigation.style.height = "0";
    title.innerText = "GAME";
    title.setAttribute("class", "header--vertical");
    headerContainer.setAttribute("class", "grid-container grid-header");
  })

  closeSign.addEventListener("click", () => {
    headerButton.style.display = "block";
    sideNavigation.style.width = "0";
    mainNavigation.style.height = "50px";
    const horizontalLine = document.createElement("hr");
    horizontalLine.setAttribute("class", "header__line");
    const secondHorizontalLine = horizontalLine.cloneNode(true);
    headerContainer.setAttribute("class", "box--large");

    title.innerText = "Game of life";
    title.setAttribute("class", "header__title");

    title.insertAdjacentElement('afterbegin', horizontalLine);
    title.appendChild(secondHorizontalLine);
  })

  function adjustSizeOfGame(event) {
    if (window.innerWidth > 768) {
      const widthOfTheGame = game.offsetWidth;
      game.style.height = `${widthOfTheGame/2}px`
    } else {
      const widthOfTheGame = game.offsetWidth;
      game.style.height = `${widthOfTheGame}px`
    }
  }

   
  adjustBackgroundSizeToWindowHeight(window);
  adjustSizeOfGame();
  createGame(window);
  

  window.addEventListener("resize", () => {
    adjustBackgroundSizeToWindowHeight(window);
    adjustSizeOfGame();
    clearGameArea();
    createGame(window);
  });


  const startButton = document.querySelector(".js-box-butons__button--start");
  const stopButton = document.querySelector(".js-box-butons__button--stop");
  const resetButton = document.querySelector(".js-box-butons__button--reset");
  const configurationOneButton = document.querySelector(".js-box-butons__button--ex1");
  const configurationTwoButton = document.querySelector(".js-box-butons__button--ex2");
  const configurationThreeButton = document.querySelector(".js-box-butons__button--ex3");

  const oneRow = document.querySelector(".js-game > div");
  const listOfAreasInOneRow = oneRow.querySelectorAll("div");
  const lengthOfRow = listOfAreasInOneRow.length;
  const allRows = document.querySelectorAll(".js-game > div");
  const numberOfRows = allRows.length;
  const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
  const numberOfAreasInGame = listOfAreasInGame.length;

  const indexOfMiddleField = (((numberOfRows / 2) - 1) * lengthOfRow + (lengthOfRow / 2));

  // Set attribute for the area if clicked and unset it if clicked twice
  (() => {
    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].addEventListener("click", () => {
        if (gameStarted == false) {
          console.log("click");
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

  function countAreasFromTheMiddle(list) {
    const listOfAreasCountedFromTheMiddle = [];
    for (let i = 0; i < list.length; i++) {
      listOfAreasCountedFromTheMiddle.push(indexOfMiddleField + list[i]);
      listOfAreasCountedFromTheMiddle.push(indexOfMiddleField - list[i]);
    };
    return listOfAreasCountedFromTheMiddle;
  }

  function clearAllAreas() {
    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
  }

  function makeChosenAreasAlive(lengthOfList, list) {
    for (let i = 0; i < lengthOfList; i += 1) {
      listOfAreasInGame[list[i]].setAttribute("class", "game-area--alive");
    }
  }

  function exampleOne() {
    configurationOneButton.addEventListener("click", () => {
      const listOne = [-1042, -1041, -1040, -1039, -962, -961, -958, -880, -877,
      -799, -798, -562, -561, -482, -481, -402, -401, -330, -251, -249, -236,
      -235, -234, -229, -228, -172, -169, -156, -155, -154, -149, -148, -92,
      -90, -70, -68, -12, -11, -6, -5, -4, 9, 12, 68, 69, 74, 75, 76, 89, 91,
        170, 241, 242, 321, 322, 401, 402, 638, 639, 717, 720, 798, 801, 802,
        879, 880, 881, 882];
      const listOfAreasExOne = [];
      for (let i = 0; i < listOne.length; i++) {
        listOfAreasExOne.push(indexOfMiddleField + listOne[i]);
      };
      const lengthListOfAreasExOne = listOfAreasExOne.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExOne, listOfAreasExOne);
    })
  }

  function exampleTwo() {
    configurationTwoButton.addEventListener("click", () => {
      const listTwo = [77, 76, 156, 157, -2, -83, -84, 316, 315, 395, 396, 478,
        559, 562, 642, 712, 792, 872, 871, 790, 4, -76, 85, 86, 166, 167, 247,
        326, 8, 9, -70, -151, -152, -232, -231, -312, -393, -472, -471, -391,
        -148, -228, -67, -307, -306, -386, -225, -145, -65, 15, -64, -61, -141,
        -60, -139, -219, -299, -300, -301, -458, -457, -536, -616, -697, -698,
        -619, -539, -790, -789, -869, -870, -1257, -1258, -1259, -725, -805, -885,
        -1043, -1042, -1041, -648, -568, -569, -649, -657, -658, -578, -579, -739,
        -823, -905, -985, -1065, -827, -908, -909, -989, -1069, -1148, -1147, -1226,
        -1225, -1305, -1224, -1223, -1143, -1142];
      const listOfAreasExTwo = [];
      for (let i = 0; i < listTwo.length; i++) {
        listOfAreasExTwo.push(indexOfMiddleField + listTwo[i]);
      };
      const lengthListOfAreasExTwo = listOfAreasExTwo.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExTwo, listOfAreasExTwo);
    })
  }

  function exampleThree() {
    configurationThreeButton.addEventListener("click", () => {
      const listThree = [2, 78, 82, 158, 160, 162];
      const listOfAreasExThree = countAreasFromTheMiddle(listThree);
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
