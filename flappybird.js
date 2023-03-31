// Define variables for the canvas
let canvas, ctx;

// Define variables for bird position, speed, and gravity
let xPos = 10;
let yPos = 150;
let ySpeed = 0;
let gravity = 0.1;
let birdWidth = 40;
let birdHeight = 30;


// Define variables for pipe position, width, and gap
let pipeX = 400;
let pipeWidth = 50;
let pipeGap = 150;
let pipeRadius = 50;


// Define variables for score and game over
let score = 0;
let gameOver = false;

//clouds
let cloud = new Image();
cloud.src = "background.png";

cloud.onload = function() {
  ctx.drawImage(cloud, 0, 0, canvas.width, canvas.height);
  // add the rest of your game code here
}

// Start the game loop
function startGame() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  bird = new Image();
  bird.src = "bird.png"; // set the src attribute to the file path of the image
  setInterval(updateGame, 10);
}


// Update game state and redraw canvas
function updateGame() {
  // Move bird based on gravity and user input
  yPos -= ySpeed;
  ySpeed -= gravity;
  if (yPos < 0 || yPos > canvas.height - birdHeight) {
    endGame();
    return;
  }

  // Move pipe and check for collision
  pipeX -= 2;
  if (pipeX < -pipeWidth) {
    pipeX = canvas.width;
    pipeGap = Math.floor(Math.random() * 200) + 100; // change pipe gap to random value
    score += 1;
  }
  if (xPos + birdWidth > pipeX && xPos < pipeX + pipeWidth &&
    (yPos < pipeGap || yPos + birdHeight > pipeGap + pipeGap)) {
    endGame();
    return;
  }

  // Clear canvas and redraw game objects
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add board around game area
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw pipe in new position
  ctx.fillStyle = "green";
  ctx.fillRect(pipeX, 0, pipeWidth, pipeGap);
  ctx.fillRect(pipeX, pipeGap + pipeGap, pipeWidth, canvas.height - pipeGap - pipeGap);

  // Draw bird image
  ctx.drawImage(bird, xPos, yPos, birdWidth, birdHeight);

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}


// End the game and display score
function endGame() {
  gameOver = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Game over! Your Score: " + score, 50, 150);
}
// Create reset button
const button = document.createElement("button");
button.innerHTML = "Play Again";
button.style.fontSize = "20px";
button.style.padding = "10px";
button.style.marginTop = "20px";
button.style.backgroundColor = "blue";
button.style.border = "none";
button.style.color = "white";
button.style.borderRadius = "5px";
button.addEventListener("click", function () {
  document.location.reload();
});
document.body.appendChild(button);

// Listen for user input and update bird speed
document.addEventListener("keydown", event => {
  if (event.code === "Space" && !gameOver) {
    ySpeed = 4;
  }
});

// Start the game when the window loads
window.onload = startGame;
