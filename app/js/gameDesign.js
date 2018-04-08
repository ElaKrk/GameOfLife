document.addEventListener("DOMContentLoaded", function (event) {

  //Name of interval of showing new stages of population
  let gameStarted = false;
  let gameloop;

  function clearGameArea() {
    const gameArea = document.querySelector(".js-game");
    gameArea.innerText = "";
  }

  //Create all areas in the game
  function createAllareas(heightOfWindow, widthOfWindow) {
    const gameArea = document.querySelector(".js-game");
    for (let i = 0; i < heightOfWindow; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < widthOfWindow; j++) {
        const field = document.createElement("div");
        row.appendChild(field);
      }
      gameArea.appendChild(row);
    }
  }

  function createGame(window) {
    if (window.innerWidth < 768) {
      createAllareas(40, 40);
    } else if (window.innerWidth < 1024) {
      createAllareas(40, 80);
    } else {
      createAllareas(80, 160);
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

  const startButton = document.querySelector(".js-box-butons__button--start");
  const stopButton = document.querySelector(".js-box-butons__button--stop");
  const resetButton = document.querySelector(".js-box-butons__button--reset");
  const configurationOneButton = document.querySelector(".js-box-butons__button--ex1");
  const configurationTwoButton = document.querySelector(".js-box-butons__button--ex2");
  const configurationThreeButton = document.querySelector(".js-box-butons__button--ex3");

  function calculateTheLengthOfOneRow() {
    const oneRow = document.querySelector(".js-game > div");
    const listOfAreasInOneRow = oneRow.querySelectorAll("div");
    const lengthOfRow = listOfAreasInOneRow.length;

    return lengthOfRow;
  }

  function calculateTheIndexOfMiddleField() {
    const lengthOfRow = calculateTheLengthOfOneRow();
    const allRows = document.querySelectorAll(".js-game > div");
    const numberOfRows = allRows.length;

    const indexOfMiddleField = (((numberOfRows / 2) - 1) * lengthOfRow + (lengthOfRow / 2));
    
    return indexOfMiddleField;
  }


  // Set attribute for the area if clicked and unset it if clicked twice
  function setAttributeAliveIfClicked() {
    const indexOfMiddleField = calculateTheIndexOfMiddleField();
    
    const lengthOfRow = calculateTheLengthOfOneRow();
    
    const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
    const numberOfAreasInGame = listOfAreasInGame.length;

    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].addEventListener("click", () => {
        const listOfAreasInGame = document.querySelectorAll(".js-game > div div");

        if (gameStarted == false) {
          console.log(indexOfMiddleField - k);
          if (listOfAreasInGame[k].hasAttribute("class") && gameStarted == false) {
            listOfAreasInGame[k].removeAttribute("class");
          } else if (gameStarted == false) {
            listOfAreasInGame[k].setAttribute("class", "game-area--alive");
          }
        }
      })
    }
  };

  //Count alive neighbours for every area and create list containing those numbers
  function countingNeighbours() {
    const allRows = document.querySelectorAll(".js-game > div");
    const numberOfRows = allRows.length;
    const lengthOfRow = calculateTheLengthOfOneRow();
    
    const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
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
    const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
    

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

  function stopTheGame(event) {
    gameStarted = false;
    clearInterval(gameloop);
  }

  function stopTheGameOnClick() {
    stopButton.removeEventListener("click", stopTheGame);
    stopButton.addEventListener("click", stopTheGame);
  }

  function stopAndResetAllAreas() {
    gameStarted = false;
    clearInterval(gameloop);
    clearAllAreas();
  }

  function stopAndResetAllAreasOnClick() {
    resetButton.removeEventListener("click", stopAndResetAllAreas);
    resetButton.addEventListener("click", stopAndResetAllAreas);
  }

  function gameOfLife (e) {
    gameStarted = true;
    gameloop = setInterval(() => {
      oneCycleOfLife();
    }, 100);

    stopTheGameOnClick();
    stopAndResetAllAreasOnClick();
  }

  function gameOfLifeOnClick() {
    startButton.removeEventListener("click", gameOfLife)
    startButton.addEventListener("click", gameOfLife)
  }

  function clearAllAreas() {
    const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
    const numberOfAreasInGame = listOfAreasInGame.length;

    for (let k = 0; k < numberOfAreasInGame; k += 1) {
      listOfAreasInGame[k].removeAttribute("class");
    }
  }

  function makeChosenAreasAlive(lengthOfList, list) {
    const listOfAreasInGame = document.querySelectorAll(".js-game > div div");
    
    for (let i = 0; i < lengthOfList; i += 1) {
      listOfAreasInGame[list[i]].setAttribute("class", "game-area--alive");
    }
  }

  function chooseListOfIndexedDependingOnWindowWidth(listForSmall, listForMedium, listForLarge) {
    if (window.innerWidth < 768) {
      return listForSmall;
    } else if (window.innerWidth < 1024) {
      return listForMedium;
    } else {
      return listForLarge;
    }
  }

  function exampleOne() {

    configurationOneButton.addEventListener("click", () => {

      const indexOfMiddleField = calculateTheIndexOfMiddleField();
      const listOfAreasInGame = document.querySelectorAll(".js-game > div div");

      const indexesForSmallWidth = [76, 75, 74, 34, 35, 36, -162, -202, -242, -241, -201, -161, -36, 
        -76, -75, -35, -34, -74, 161, 162, 202, 242, 241, 201, 442, 441, 481, 482, 480, 479, 438, 397, 
        358, 359, 400, 69, 29, 28, 68, -12, -52, -91, -130, -89, -49, -10, -442, -482, -481, -441, -480, 
        -479, -438, -397, -358, -359, -400, -29, -69, -68, -28, 12, 52, 91, 130, 89, 49, 10];
      const indexesForMediumWidth = [-1042, -1041, -1040, -1039, -962, -961, -958, -880, -877,
        -799, -798, -562, -561, -482, -481, -402, -401, -330, -251, -249, -236,
        -235, -234, -229, -228, -172, -169, -156, -155, -154, -149, -148, -92,
        -90, -70, -68, -12, -11, -6, -5, -4, 9, 12, 68, 69, 74, 75, 76, 89, 91,
          170, 241, 242, 321, 322, 401, 402, 638, 639, 717, 720, 798, 801, 802,
          879, 880, 881, 882];
      const indexesForLargeWidth = [156, 315, 314, 154, 155, -642, -802, -962, -961, -801, -316, 316, -641,
      -156, -155, -315, -314, -154, 641, 642, 802, 962, 961, 801, 149, 148, 309, 308, -12, -172, -331, -490, 
      -329, -169, -10, -1762, -1761, -1921, -1922, -1920, -1919, -1758, -1597, -1438, -1439, -1600, -309,
    -148, -149, -308, 12, 172, 331, 490, 329, 169, 10, 1761, 1921, 1762, 1922, 1920, 1919, 1758, 1597, 1438, 1439, 1600];

      const listOne = chooseListOfIndexedDependingOnWindowWidth(indexesForSmallWidth, indexesForMediumWidth, indexesForLargeWidth);

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
     
      const indexOfMiddleField = calculateTheIndexOfMiddleField();
      const listOfAreasInGame = document.querySelectorAll(".js-game > div div");

      const indexesForSmallWidth = [241, -241, -280, -239, -278, -237, 280, 239, 278, 237, 
        -282, -243, -360, -401, -399, 7, -34, 46, -73, 87, 126, -114, 9, 50, -30, 282, 243,
        360, 401, 399 ,-7, 34, -46, 73, -87, -126, 114, -9, -50, 30];
      const indexesForMediumWidth = [77, 76, 156, 157, -2, -83, -84, 316, 315, 395, 396, 478,
        559, 562, 642, 712, 792, 872, 871, 790, 4, -76, 85, 86, 166, 167, 247,
        326, 8, 9, -70, -151, -152, -232, -231, -312, -393, -472, -471, -391,
        -148, -228, -67, -307, -306, -386, -225, -145, -65, 15, -64, -61, -141,
        -60, -139, -219, -299, -300, -301, -458, -457, -536, -616, -697, -698,
        -619, -539, -790, -789, -869, -870, -1257, -1258, -1259, -725, -805, -885,
        -1043, -1042, -1041, -648, -568, -569, -649, -657, -658, -578, -579, -739,
        -823, -905, -985, -1065, -827, -908, -909, -989, -1069, -1148, -1147, -1226,
        -1225, -1305, -1224, -1223, -1143, -1142];
      const indexesForLargeWidth = [156, 155, 317, 476, 636, 635, 475, 955, 1115, 1114,
      954, 1277, 1438, 1441, 1601, 1751, 1911, 2071, 2070, 1909, 163, 323, 484, 485,
      645, 646, 806, 965, 327, 328, 169, 8, 7, -152, -153, -313, -474, -472, -632, -633, 
      172, 11, -149, -308, -307, -467, -146, 14, 174, 175, 334, 178, 18, 179, 20, -140, -300,
      -301, -302, -780, -940, -619, -618, -777, -937, -1098, -1099, -1271, -1431, -1430, -1270, 
      -1764, -1763, -1762, -1446, -1286, -1126, -970, -969, -809, -810, -978, -979, -819, 
      -820, -1140, -1304, -1466, -1626, -1786, -2106, -2266, -2105, -2104, -1944, -1943, -2107,
      -1948, -1949, -1790, -1630, -1469, -1470, -1308, -2218, -2219, -2220];

      const listTwo = chooseListOfIndexedDependingOnWindowWidth(indexesForSmallWidth, indexesForMediumWidth, indexesForLargeWidth);

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
      const indexOfMiddleField = calculateTheIndexOfMiddleField();
      
      const indexesForSmallWidth = [2, -2, -78, -80, -38, -82, -42, 78, 80, 38, 82, 42];
      const indexesForMediumWidth = [2, -2, 78, -78, 82, -82, 158, -158, 160, -160, 162, -162];
      const indexesForLargeWidth = [2, -2, 320, -320, -322, 322, -162, 162, 158, -158, 318, -318];

      const listThree = chooseListOfIndexedDependingOnWindowWidth(indexesForSmallWidth, indexesForMediumWidth, indexesForLargeWidth);

      const listOfAreasExThree = [];
      for (let i = 0; i < listThree.length; i++) {
        listOfAreasExThree.push(indexOfMiddleField + listThree[i]);
      };
      const lengthListOfAreasExThree = listOfAreasExThree.length;
      clearAllAreas();
      makeChosenAreasAlive(lengthListOfAreasExThree, listOfAreasExThree);
    })
  }

  adjustBackgroundSizeToWindowHeight(window);
  createGame(window);
  setAttributeAliveIfClicked();
  exampleOne();
  exampleTwo();
  exampleThree();
  gameOfLifeOnClick();


  window.addEventListener("resize", (e) => {
    gameStarted = false;
    clearInterval(gameloop);
    clearAllAreas();
    adjustBackgroundSizeToWindowHeight(window);
    clearGameArea();
    createGame(window);
    setAttributeAliveIfClicked();
    exampleOne();
    exampleTwo();
    exampleThree();
    gameOfLifeOnClick();
  });
});
