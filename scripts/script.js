"use strict";

const hangmanImage = document.getElementById("hangmanImg");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.getElementById("guesses");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.getElementById("play-again");
const maxGuesses = 6;
let currentWord,
  correctLetters = [],
  wrongGuessedCount = 0;

//  Func to  Reset Game :
const resetGame = () => {
  // Resetting all game variables & UI elements : >
  correctLetters = [];
  wrongGuessedCount = 0;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  hangmanImage.src = `images/hangman-${wrongGuessedCount}.svg`;
  guessesText.innerText = `${wrongGuessedCount} / ${maxGuesses}`;

  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

// Selecting a random word and hint from the wordList : -----
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);

  document.getElementById("hint").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  // After 600ms of game complete .. Showing modal with relevant details
  setTimeout(() => {
    const modalText = isVictory
      ? "You Found the word:"
      : "The correct word was:";

    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;

    gameModal.querySelector("h1").innerText = `${
      isVictory ? "Congrats" : "Game Over"
    }`;

    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;

    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  // Checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    // SHOWING all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // if clicked letter doesn't exist then update the wrongGuessCount and hangman Image >
    wrongGuessedCount++;
    hangmanImage.src = `images/hangman-${wrongGuessedCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessedCount} / ${maxGuesses}`;

  // Calling gameOver func if any of these Condition meets : >
  if (wrongGuessedCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating keyboard button : --------------------
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
