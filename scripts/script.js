"use strict";
/* import all the required stuff from the module */
import { play } from "./htmlElements.js"; // play functon that returns an arrya with [pc choice, user choice, the winner]
import { playerResult } from "./htmlElements.js"; // playerResult class to create tailored objects for the gui
import { nextBtn } from "./htmlElements.js"; // function to remove header and playground to add an hurrya page when the player wins
import { htmlObj } from "./htmlElements.js"; // rulebox element and the hurray element in a object
const buttons = [
  document.getElementById("imageRock"),
  document.getElementById("imageScissor"),
  document.getElementById("imagePaper"),
  document.getElementById("ruleBtn"),
  document.getElementById("nxtBtn"),
];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "imageRock": {
        playButton(button.id);
        break;
      }
      case "imagePaper": {
        playButton(button.id);
        break;
      }
      case "imageScissor": {
        playButton(button.id);
        break;
      }

      case "cross": {
        toggleRules();
        break;
      }
      case "ruleBtn": {
        toggleRules();
        break;
      }
      case "nxtBtn": {
        nextBtn();
        console.log("next button");
        break;
      }
    }
  });
});
// function to toggle rules from display block and none
function toggleRules() {
  const crossBtn = document.getElementById("cross");
  crossBtn.addEventListener("click", () => {
    toggleRules();
  });
  const rulesWindow = document.getElementById("rules");
  const rulesStyle = window.getComputedStyle(rulesWindow);
  const displayProperty = rulesStyle.getPropertyValue("display");
  if (displayProperty == "none") {
    rulesWindow.style.display = "block";
  } else {
    rulesWindow.style.display = "none";
  }
}
// handling and keeping scores in the browser local storage retrival of the data if it already exists and creating it if it doest
let currentScore = retriveData();
function retriveData() {
  const scores = {
    pcScore: 0,
    userScore: 0,
  };
  // scores cant be stored as an object so they are parsed as string and back
  let currentScore = JSON.parse(localStorage.getItem("scores"));
  if (!currentScore) {
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  currentScore = JSON.parse(localStorage.getItem("scores"));
  return currentScore;
}

updateScores();
// play button function is called every time the user clicks on either of the buttons 'ROCK' , 'PAPER' , 'SCISSORS'
function playButton(buttonid) {
  const result = play(buttonid);
  if (result[2] == "YOU WIN") {
    currentScore.userScore++;
  } else if (result[2] == "YOU LOST") {
    currentScore.pcScore++;
  }
  localStorage.setItem("scores", JSON.stringify(currentScore)); // update score in the local storege
  append(result); // call the append fuction to perform changes in the DOM

  updateScores(); //update the scores in the html element
}

function updateScores() {
  const pcScoreCard = document.getElementById("pcScore");
  pcScoreCard.innerText = currentScore.pcScore;

  const userScoreCard = document.getElementById("userScore");
  userScoreCard.innerText = currentScore.userScore;
}

/*
this is the main function that appends html elemnts to index.html as per the changes in the gameplay 
*/

function append(arr) {
  //take the array returned from the play function
  if (arr[2] == "YOU WIN") {
    buttons[4].style.display = "inline";
  }
  const winScreen = new playerResult(arr[0], arr[1], arr[2]);
  const element = document.getElementById("mark");
  element.remove();
  const play = document.getElementById("append");
  play.innerHTML = winScreen.createWinnerScreen() + htmlObj.ruleElement;

  //change images in the selections to the appropriate player and computer sellections

  const playerImage = document.getElementById("playerSellection");
  const computerImage = document.getElementById("computerSellection");
  const tieDeletion = document.getElementById("omit");

  // set styling as per result

  if (arr[2] == "TIE UP") {
    tieDeletion.style.display = "none";
  }
  if (arr[1] == "imageRock") {
    playerImage.style.backgroundImage = "var(--rock-img)";
    playerImage.style.border = "20px solid var(--color-rock)";
  } else if (arr[1] == "imageScissor") {
    playerImage.style.backgroundImage = "var(--scissor-img)";
    playerImage.style.border = "20px solid var(--color-scissor)";
  } else if (arr[1] == "imagePaper") {
    playerImage.style.backgroundImage = "var(--paper-img)";
    playerImage.style.border = "20px solid var(--color-paper)";
  }
  if (arr[0] == "imageRock") {
    computerImage.style.backgroundImage = "var(--rock-img)";
    computerImage.style.border = "20px solid var(--color-rock)";
  } else if (arr[0] == "imageScissor") {
    computerImage.style.backgroundImage = "var(--scissor-img)";
    computerImage.style.border = "20px solid var(--color-scissor)";
  } else if (arr[0] == "imagePaper") {
    computerImage.style.backgroundImage = "var(--paper-img)";
    computerImage.style.border = "20px solid var(--color-paper)";
  }
}
