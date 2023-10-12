class playerResult {
  constructor(pcSelection, playerSelection, winner) {
    this.pcSelection = pcSelection;
    this.playerSelection = playerSelection;
    this.winner = winner;

    this.ruleElement = `<div id="rules" class="rulesWindow">
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
              </div>`;
  }

  createWinnerScreen() {
    let playerClass, computerClass;

    if (this.winner === "TIE UP") {
      playerClass = "noAnimation";
      computerClass = "noAnimation";
    } else {
      playerClass = this.winner === "YOU WIN" ? "Animation" : "noAnimation";
      computerClass = this.winner === "YOU WIN" ? "noAnimation" : "Animation";
    }
    let htmlElement = `<div class="resultWindow">
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

function pickcomputerMove() {
  const reference = Math.random();
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
  let PC = pickcomputerMove();
  if (PC == buttonid) {
    // console.log("tie");
    return [PC, buttonid, "TIE UP"];
  } else {
    switch (buttonid) {
      case "imageRock": {
        if (PC == "imageScissor") {
          // console.log("you win");
          return [PC, buttonid, "YOU WIN"];
        } else {
          // console.log(" you loose");
          return [PC, buttonid, "YOU LOST"];
        }
        break;
      }

      case "imagePaper": {
        if (PC == "imageRock") {
          // console.log("you win");
          return [PC, buttonid, "YOU WIN"];
        } else {
          // console.log("you loose");
          return [PC, buttonid, "YOU LOST"];
        }

        break;
      }
      case "imageScissor": {
        if (PC == "imagePaper") {
          // console.log("you win");
          return [PC, buttonid, "YOU WIN"];
        } else {
          // console.log("you loose");
          return [PC, buttonid, "YOU LOST"];
        }
        break;
      }
    }
  }
}

export { play };
export { playerResult };
