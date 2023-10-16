/* A class to create HTML elements for the result 
takes 3 parameters, pcSelection which is the chosen option by the computer
playerSelection which is choosen by the user and the winner which is the actual winner
*/

class playerResult {
  constructor(pcSelection, playerSelection, winner) {
    this.pcSelection = pcSelection;
    this.playerSelection = playerSelection;
    this.winner = winner;
  }

  createWinnerScreen() {
    let playerClass, computerClass;

    if (this.winner === "TIE UP") {
      playerClass = "noAnimation"; // animantion and noanimation classes are css classes to display boxshadow animation on the requires elements
      computerClass = "noAnimation";
    } else {
      playerClass = this.winner === "YOU WIN" ? "Animation" : "noAnimation";
      computerClass = this.winner === "YOU WIN" ? "noAnimation" : "Animation";
    }
    let htmlElement = `<div id='tobeomited' class="resultWindow">
    <div id="playerSellection" class="${playerClass}"></div>
    <div id="resultDeclaration" class="result">
      <label class="actualResult">${this.winner}</label>
      <label id="omit" class="actualResult">AGAINST PC</label>
      <button onclick="window.location.reload()" id="againBtn">PLAY AGAIN</button>
    </div>
    <div id="computerSellection" class="${computerClass}"></div>
  </div>`;

    return htmlElement;
  }
}

/* here is an object with residual html elemnts which are necessary for few functionality ie, rules and the winner's next page  */

const htmlObj = {
  ruleElement: `<div id="rules" class="rulesWindow">
                   <div id="cross" class="crossBtn">
                    <button>X</button>
                  </div>
                      <div class="ruleBox">
                      <label>Game Rules</label>
                    <ul>
                      <li>
                        Rock beats scissors, scissors beat paper, and paper beats rock.
                      </li>
                      <li>
                        Agree ahead of time whether you’ll count off “rock, paper,
                        scissors, shoot” or just “rock, paper, scissors.”
                      </li>
                      <li>
                        Use rock, paper, scissors to settle minor decisions or simply play
                        to pass the time
                      </li>
                      <li>
                        If both players lay down the same hand, each player lays down
                        another hand
                      </li>
                    </ul>
                  </div>
                </div>`,

  hurrayElement: `  <div id="test1" class="hurray">
                      <img id="str1" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str2" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str3" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str4" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str5" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str6" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str7" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="str8" class="stars" src="./assets/Star.svg" alt="" />
                      <img id="trophy" src="./assets/Victory.svg" alt="" />
                      <label id="cheer" class="hurrayText">HURRAY!!</label>
                      <label id="cheerChild" class="hurrayText">YOU WON THE GAME</label>
                      <button onclick="window.location.reload()" id="againBtn">PLAY AGAIN</button>
                    </div>`,
};

/* why are these not inside the class?
 to maintain functions as global and reusable 
 the function play initiate the user move and its parameters are the button of what the user picked 
 this function also calls pickcomputer move which uses Math.random to pic a number between 0 to 1 and these intervals are divided in between the choices of ROCK, PAPER, SCISSORS these choices are then placed in a varable PC and cmpared against the user's move
 this function ultimately returns an array of [pc choice, user choice, the winner]
 */

function pickcomputerMove() {
  const reference = Math.random(); // pick a radom move using math.radom
  let computerMove = "";
  if (reference >= 0 && reference < 1 / 3) {
    computerMove = "imageRock";
  } else if (reference >= 1 / 3 && reference < 2 / 3) {
    computerMove = "imagePaper";
  } else if (reference >= 2 / 3 && reference < 1) {
    computerMove = "imageScissor";
  }
  return computerMove;
}

function play(buttonid) {
  let PC = pickcomputerMove(); // place the computer move in the variable
  if (PC == buttonid) {
    // console.log("tie");
    return [PC, buttonid, "TIE UP"]; // check for tie before hand
  } else {
    switch (buttonid) {
      case "imageRock": {
        if (PC == "imageScissor") {
          return [PC, buttonid, "YOU WIN"];
        } else {
          return [PC, buttonid, "YOU LOST"];
        }
        break;
      }

      case "imagePaper": {
        if (PC == "imageRock") {
          return [PC, buttonid, "YOU WIN"];
        } else {
          return [PC, buttonid, "YOU LOST"];
        }

        break;
      }
      case "imageScissor": {
        if (PC == "imagePaper") {
          return [PC, buttonid, "YOU WIN"];
        } else {
          return [PC, buttonid, "YOU LOST"];
        }
        break;
      }
    }
  }
}

function nextBtn() {
  const next = document.getElementById("nxtBtn");
  const header = document.getElementById("scorewindow");
  const playarea = document.getElementById("tobeomited");

  header.remove();
  playarea.remove();
  next.remove();
  const play = document.getElementById("append");
  play.innerHTML = htmlObj.hurrayElement + htmlObj.ruleElement;
  play.style.height = "calc(var(--window-height) * 1.4)";
}

// export all the required classes, objects and functions

export { nextBtn };
export { play };
export { playerResult };
export { htmlObj };
