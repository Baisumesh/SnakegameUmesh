let inputdir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
score = 2;
let lastPaintTime = 0;
let snakeArr = [
  { x: 12, y: 15 }
];
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
  window.requestAnimationFrame(main); //now becomes a game 
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();

}
function gameEngine() {
  //part 1 updating the sname array and food
  //now start the game engine code start if snake collide the snake
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game over: plase strt the game and required the press any key!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;

  }
  //if you have eaten a food,increment the scor e and regeneret the the food and increament the size this is logic of snake
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }

  //moving the snake how to work bro
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //part 2 : Display the snake a         
  board.innerHTML = " ";
  snakeArr.forEach((e, index) => {
    snakElement = document.createElement('div');
    snakElement.style.gridRowStart = e.y;
    snakElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakElement.classList.add('head');
    }
    else {
      snakElement.classList.add('snake');
    }

    board.appendChild(snakElement);

  });
  //Display the food elements 
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);

}

//This is game loop for the game 
//main logic start here
window.requestAnimationFrame(main);//yan main ko fire karega lekin bar bar nahi karega bro to main function ke under kam karana padega
window.addEventListener('keydown', e => {
  inputDir = { x: 0, y: 1 }; //start the games
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":

      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;

    default:
      break;
  }
});