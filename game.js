let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let buttons = document.querySelectorAll(".btn");
let h1 = document.getElementById("level-title");
let gameStarted = false;
let level = 0;

// Listening for keyboard events
document.addEventListener("keypress", function () {
  if (!gameStarted) {
    h1.innerHTML = `Level ${level}`;
    nextSequence();
    gameStarted = true;
  }
});

// Randomly selecting the colour
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  let selectedButton = document.getElementById(randomChosenColour);
  animateButton(selectedButton);
  // Playing sound corresponding to the randomly selected colour
  let buttonColour = selectedButton.getAttribute("id");
  playSound(buttonColour);

  level++;
  h1.innerHTML = `Level ${level}`;
}

// Adding Event listener to all the buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateButton(this);
    checkAnswer(userClickedPattern.length - 1);
  });
}

// Animating the random button on page load
function animateButton(selectedButton) {
  selectedButton.classList.add("pressed");

  setTimeout(() => {
    selectedButton.classList.remove("pressed");
  }, 100);
}

// Playing sound of the user clicked button
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    document.querySelector("body").classList.add("game-over");
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    h1.innerHTML = `Game Over, Press Any Key to Restart`;
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
