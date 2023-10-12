"use strict";
console.log("Test");
import { play } from "./htmlElements.js";
import { playerResult } from "./htmlElements.js";
import { nextBtn } from "./htmlElements.js";
import { ruleBox } from "./htmlElements.js";
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
let currentScore = retriveData();
console.log(currentScore);
function retriveData() {
  const scores = {
    pcScore: 0,
    userScore: 0,
  };

  let currentScore = JSON.parse(localStorage.getItem("scores"));
  if (!currentScore) {
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  currentScore = JSON.parse(localStorage.getItem("scores"));
  return currentScore;
}

updateScores();

function playButton(buttonid) {
  const result = play(buttonid);
  if (result[2] == "YOU WIN") {
    currentScore.userScore++;
  } else if (result[2] == "YOU LOST") {
    currentScore.pcScore++;
  }
  console.log(
    `computer score ${currentScore.pcScore} player score ${currentScore.userScore}`
  );
  localStorage.setItem("scores", JSON.stringify(currentScore));
  append(result);

  updateScores();
}

function updateScores() {
  const pcScoreCard = document.getElementById("pcScore");
  pcScoreCard.innerText = currentScore.pcScore;

  const userScoreCard = document.getElementById("userScore");
  userScoreCard.innerText = currentScore.userScore;
}

function append(arr) {
  console.log("append happned");
  console.log(arr);
  if (arr[2] == "YOU WIN") {
    buttons[4].style.display = "inline";
  }
  const winScreen = new playerResult(arr[0], arr[1], arr[2]);
  const element = document.getElementById("mark");
  element.remove();
  const play = document.getElementById("append");
  play.innerHTML = winScreen.createWinnerScreen() + ruleBox.ruleElement;

  //change images in the selections to the appropriate player and computer sellections

  const playerImage = document.getElementById("playerSellection");
  const computerImage = document.getElementById("computerSellection");
  const tieDeletion = document.getElementById("omit");
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
