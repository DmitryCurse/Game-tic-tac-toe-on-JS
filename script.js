"use strict";

let gameZone = document.querySelector(".block_container");
let funtasticFunction = doStep();
gameZone.addEventListener("click", funtasticFunction);

let whoStep = document.querySelector(".who_step .who");
let whoStepBlock = document.querySelector(".who_step .step");

function doStep(event) {
  let nextPlayer = "X";
  let nowPlayer;

  return function (event) {
    if (
      !event.target.classList.contains("block") ||
      event.target.classList.contains("checked")
    )
      return;

    let resetButton = document.querySelector(".start_again");
    resetButton.addEventListener("click", resetGame);

    nowPlayer = nextPlayer;
    event.target.innerHTML = nowPlayer;
    event.target.classList.add("checked");

    if (nextPlayer == "X") {
      nextPlayer = "0";
    } else if (nextPlayer == "0") {
      nextPlayer = "X";
    }
    whoStep.innerHTML = nextPlayer;

    stopGame(checkWinner(event));

    function stopGame(func) {
      if (func !== false) {
        gameZone.removeEventListener("click", funtasticFunction);
        whoStepBlock.innerHTML = "Выиграл: ";
        if (func == "X") {
          let span = document.querySelector(".win_x span");
          span.innerHTML = parseInt(span.innerHTML) + 1;
          whoStep.innerHTML = nowPlayer;
        } else if (func == "0") {
          let span = document.querySelector(".win_zero span");
          span.innerHTML = parseInt(span.innerHTML) + 1;
          whoStep.innerHTML = nowPlayer;
        }
      } else if (document.querySelectorAll(".checked").length == 9) {
        let span = document.querySelector(".draw span");
        span.innerHTML = parseInt(span.innerHTML) + 1;
        whoStepBlock.innerHTML = "Ничья";
        whoStep.style.visibility = "hidden";
      } 
    }

    function resetGame() {
      let resetCells = document.querySelectorAll(".checked");
      for (let i = 0; i < resetCells.length; i++) {
        resetCells[i].classList.remove("checked");
        resetCells[i].innerHTML = "";
      }
      gameZone.addEventListener("click", funtasticFunction);
      whoStepBlock.innerHTML = "Ходит: ";
      whoStep.style.visibility = "visible";
      whoStep.innerHTML = nextPlayer;
    }
  };
}

function checkWinner(event) {
  let blocks = document.querySelectorAll(".block");
  let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winCombinations.length; i++) {
    let nowBlock = winCombinations[i];
    if (
      blocks[nowBlock[0]].innerHTML == blocks[nowBlock[1]].innerHTML &&
      blocks[nowBlock[1]].innerHTML == blocks[nowBlock[2]].innerHTML &&
      blocks[nowBlock[0]].innerHTML != ""
    ) {
      return event.target.innerHTML;
    }
  }
  return false;
}
