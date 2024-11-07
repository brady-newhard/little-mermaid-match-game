/*-------------------------------- Constants --------------------------------*/

const characters = 
[
  "Ariel", "Prince", "Scuttle", "Triton", "Flounder", 
  "Sebastian", "Ursula", "Flotsam-Jetsam", "Ariel", "Prince", "Scuttle", 
  "Triton", "Flounder", "Sebastian", "Ursula", "Flotsam-Jetsam"
];
  
// console.log(characters)
//console.log(shuffleCharacters(characters))

/*-------------------------------- Variables --------------------------------*/

let board;
let turn;
let firstGuess;
let secondGuess;
let matches;
let matchScoreP1;
let matchScoreP2;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const player1Count = document.getElementById("player1-count");
const player2Count = document.getElementById("player2-count");
const resetBtnEl = document.querySelector("button");

/*-------------------------------- Functions --------------------------------*/

//console.log("Ready to Initialize")

function init() {
  board = shuffleCharacters([...characters]);
  //console.log(board)
  turn = "Player 1";
  firstGuess = null;
  secondGuess = null;
  matches = 0;
  matchScoreP1 = 0;
  matchScoreP2 = 0;
  winner = false;
  tie = false;

  player1Count.innerText = 0
  player2Count.innerText = 0

  squareEls.forEach((sqr, index) => {  
    sqr.className = "sqr";  
    sqr.dataset.character = board[index];  
  });
  updateMessage();
}

init(); 

function shuffleCharacters(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  //console.log("Shuffled Characters:", array)
  return array;
}

function updateMessage() {
  if (winner) {
      messageEl.textContent = `Congrats! ${winner} wins!`;
  } else if (tie) {
      messageEl.textContent = "It's a tie!";
  } else {
      messageEl.textContent = `${turn}'s Turn!`;
  }

  player1Count.innerText = matchScoreP1;
  player2Count.innerText = matchScoreP2;
}

function handleSquareClick(event) {
  const square = event.target; 
    if (square.classList.contains("matched") || square === firstGuess) return; 
  
    square.classList.add(square.dataset.character);  
    //console.log("Clicked: ",square.dataset.character)
    
    if (!firstGuess) {
      firstGuess = square;
      //console.log("First Guess: ", square.dataset.character)
    } else {
      secondGuess = square;
      //console.log("Second Guess: ", square.dataset.character)
      checkForMatch();
  }
}

function checkForMatch() {
  if (firstGuess.dataset.character === secondGuess.dataset.character) { 
    //console.log(firstGuess.dataset.character)
    //console.log(secondGuess.dataset.character)
    firstGuess.classList.add("matched"); 
    secondGuess.classList.add("matched"); 
    matches++;
    //console.log(matches)
    if (turn === "Player 1") { 
      matchScoreP1++;
    } else {
      matchScoreP2++;
    }
    //console.log(matchScoreP1, matchScoreP2)
      checkForWinner();
      resetGuesses();
  } else {
    setTimeout(() => {
      firstGuess.classList.remove(firstGuess.dataset.character); 
      secondGuess.classList.remove(secondGuess.dataset.character);
        resetGuesses();
        switchTurn();
        updateMessage();
    }, 1000);
}
updateMessage();
}

function checkForWinner() {
  if (matches === characters.length / 2) { 
    if (matchScoreP1 === matchScoreP2) { 
      tie = true; 
    } else {
      winner = matchScoreP1 > matchScoreP2 ? "Player 1" : "Player 2"; 
      tie = false;
    }
  }
  updateMessage();
}

function switchTurn() {
  if (!winner) {
    turn = turn === "Player 1" ? "Player 2" : "Player 1";
  }
  //console.log(turn)
}

function resetGuesses() {
  firstGuess = null;
  secondGuess = null;
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(sqr => {
  sqr.addEventListener("click", handleSquareClick);
})

resetBtnEl.addEventListener('click', init)