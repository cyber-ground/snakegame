'use strict';




// ----------------------------------------------------------------------------------------------------

//                                   ----- SNAKE GAME -----
// ----------------------------------------------------------------------------------------------------
// class --- 

// const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//     const displayImg = new Image();
//     displayImg.src = 'img/Happy Lemon.svg';

//     const foodImg = new Image();
//     foodImg.src = 'img/Happy Lemon.svg';

  // const sound = new Audio();
  // sound.src = 'audio/'; sound.play();

// class Ground {
//   constructor() {
//     this.box = 50;
//     this.data = this.createData();
//     this.drawGround();
//   }
//   createData() {
//     const data = [];
//     for (let row = 0; row < 19; row++) {
//       data[row] = [];
//       for (let col = 0; col < 19; col++) {
//         data[row][col] = 2;
//       }
//     }
//     for (let row = 0; row < 2; row++) {
//       for (let col = 0; col < 19; col++) {
//         data[row][col] = 3;
//       }
//     }
//     for (let row = 3; row < 19 - 1; row++) {
//       for (let col = 1; col < 19 - 1; col++) {
//         data[row][col] = 0;
//       }
//     }
//     for (let row = 3; row < 19 - 1; row+= 2) {
//       for (let col = 1; col < 19 - 1; col+= 2) {
//         data[row][col] = 1;
//       }
//     }
//     for (let row = 4; row < 19 - 1; row+= 2) {
//       for (let col = 2; col < 19 - 1; col+= 2) {
//         data[row][col] = 1;
//       }
//     }
//     return data;
//   }
//   drawGround() {
//     for (let row = 0; row < 19; row++) {
//       for (let col = 0; col < 19; col++) {
//         if(this.data[row][col] === 3) {
//           ctx.fillStyle = 'darkGreen';
//           ctx.fillRect(col * this.box, row * this.box, this.box, this.box);
//         }
//         if(this.data[row][col] === 2) {
//           ctx.fillStyle = 'green';
//           ctx.fillRect(col * this.box, row * this.box, this.box, this.box);
//         }
//         if(this.data[row][col] === 1) {
//           ctx.fillStyle = 'yellow';
//           ctx.fillRect(col * this.box, row * this.box, this.box, this.box);
//         }
//         if(this.data[row][col] === 0) {
//           ctx.fillStyle = 'yellowGreen';
//           ctx.fillRect(col * this.box, row * this.box, this.box, this.box);
//         }
//       }
//     }
//     displayImg.addEventListener('load', () => {
//       ctx.drawImage(displayImg, 1 * this.box + 5, 0.5 * this.box + 5, 40, 40);
//       ctx.drawImage(foodImg,350 + 5, 350 + 5, 40, 40);
//     });
//   }
// }
// const ground = new Ground();

// ------------------------------------------------------------------------------------------------
//* constant variable ---

const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  //* image ---
    const displayFoodImg = new Image();
      displayFoodImg.src = 'img/Chicken.svg';
      const foodImg = new Image();
        foodImg.src = 'img/Chicken.svg';
      const snakeImg = new Image();
        snakeImg.src = 'img/Happy Lemon.svg';
      const bugImg = new Image();
        // bugImg.src = 'img/dinosaur.svg';
        bugImg.src = 'img/Fibonacci monster.svg';
  //* audio ---
    const bugLostSound = new Audio();
      bugLostSound.src = 'audio/bugLost.mp3'
      const wallLostSound = new Audio();
        wallLostSound.src = 'audio/wallLost.mp3'
      const eatFoodSound = new Audio();
        eatFoodSound.src = 'audio/eat.wav';

  const data = [];
    const box = 50;

//* create data --------------------------------------------

function createData() {
  for (let row = 0; row < 19; row++) {
    data[row] = [];
    for (let col = 0; col < 19; col++) {
      data[row][col] = 2;
    }
  }
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 19; col++) {
      data[row][col] = 3;
    }
  }
  for (let row = 3; row < 19 - 1; row++) {
    for (let col = 1; col < 19 - 1; col++) {
      data[row][col] = 0;
    }
  }
  for (let row = 3; row < 19 - 1; row+= 2) {
    for (let col = 1; col < 19 - 1; col+= 2) {
      data[row][col] = 1;
    }
  }
  for (let row = 4; row < 19 - 1; row+= 2) {
    for (let col = 2; col < 19 - 1; col+= 2) {
      data[row][col] = 1;
    }
  }
  return data;
} createData();

function drawGround() {
  for (let row = 0; row < 19; row++) {
    for (let col = 0; col < 19; col++) {
      if(data[row][col] === 3) {
        ctx.fillStyle = 'yellowGreen';
        ctx.fillRect(col * box, row * box, box, box);
      }
      if(data[row][col] === 2) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(col * box, row * box, box, box);
      }
      if(data[row][col] === 1) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(col * box, row * box, box, box);
      }
      if(data[row][col] === 0) {
        ctx.fillStyle = 'skyBlue';
        ctx.fillRect(col * box, row * box, box, box);
      }
    }
  }
}

//* place character -------------------------------

let snake = [];
  let food, bug;
    let IntervalId;
      let TimeoutId;
        let d = '';
        let score = 0;
      let gameOver = false;
    let gameStart = false;
  let lostSound = false;

function placeCharacter() {
  do {
    for (let i = 0; i < 20; i++) {
      snake[i] = {
        x: 9 * box,
        y: 10 * box,
      }
    }
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    bug = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } while(food.x === bug.x && food.y === bug.y 
      || snake[0].x === food.x && snake[0].y === food.y 
      || snake[0].x === bug.x && snake[0].y === bug.y) {
        food = {
          x: Math.floor(Math.random() * 17 + 1) * box,
          y: Math.floor(Math.random() * 15 + 3) * box,
        };
    IntervalId = setInterval(() => {
      bug = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
      console.log('bug - random  ' + bug.x);
    }, 5000);
  }
} placeCharacter();

//* update -------------------------------------------------

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawCharacter();
  snakeMovement();
  requestAnimationFrame(update);
}
update();

// console.log('food   ' + food.x);
// console.log('bug   ' + bug.x);
// console.log('snake  ' + snake[0].x);

//* event ---------------------------------------------------

document.addEventListener('keydown', snakeDirection);
function snakeDirection(e) {
  if(e.key !== 'ArrowRight'  // return keys not collect //
    && e.key !== 'ArrowLeft' 
    && e.key !== 'ArrowUp' 
    && e.key !== 'ArrowDown' 
    && e.key !== 's') return;  

  gameStart = true;
  if(!gameOver) {
    setTimeout(() => {lostSound = false}, 500);
    if(e.key === 'ArrowRight' && d !== 'LEFT') { // *
      d = 'RIGHT';
    }
    if(e.key === 'ArrowLeft' && d !== 'RIGHT') {
      d = 'LEFT';
    }
    if(e.key === 'ArrowUp' && d !== 'DOWN') {
      d = 'UP';
    }
    if(e.key === 'ArrowDown' && d !== 'UP') {
      d = 'DOWN';
    }
  }
  if(e.key === 's') {
    clearInterval(IntervalId);
    gameOverText.classList.remove('visible'); //* ///////////////////////////
    for (let i = 0; i < score; i++) {
      snake.pop();
    }
      d = '';
      score = 0;
      gameOver = false;
      gameStart = false;
      lostSound = true;
      console.log(gameStart);
    for (let i = 0; i < 20; i++) {
      snake[i] = {
        x: 9 * box,
        y: 10 * box,
      }
    }
    placeCharacter();
    bugLostSound.classList.remove('js_blank');
    wallLostSound.classList.remove('js_blank');
    // e.key reload ---
    // gameStart = false;
    // gameOver = false;
    // window.location.reload();
  }
}

//* -------------------------------------------------------------------

function drawCharacter() {
  // draw displayFood & score
  ctx.drawImage(displayFoodImg, 1 * box, 0.5 * box, box, box);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = '45px Verdana';
    ctx.fillText(score, 3 * box, 1.5 * box);
    //* draw food & bug
  ctx.drawImage(foodImg, food.x, food.y, box, box);
  ctx.drawImage(bugImg, bug.x, bug.y, box, box);          // monster
  // ctx.drawImage(bugImg, bug.x, bug.y, box + 10, box);  // dinosaur
  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
  // ctx.fillStyle = (i === 0) ? 'green' : 'white'; // *
  // ctx.beginPath();
  // ctx.arc(snake[i].x, snake[i].y, 25, 0, 2 * Math.PI);
  // ctx.fill();
  //   ctx.fillStyle ='darkGreen'; 
  //   ctx.fillRect(snake[i].x, snake[i].y, box, box);
  //   ctx.strokeStyle = 'yellowGreen';
  //   ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function snakeMovement() {
  //* old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //* which direction
    if(d === 'RIGHT') {snakeX += box / 4}
    if(d === 'DOWN') {snakeY += box / 4}
    if(d === 'LEFT') {snakeX -= box / 4}
    if(d === 'UP') {snakeY -= box / 4}
  //* snake food collision
  let newHead = {
    x: snakeX,
    y: snakeY,
  }
  snakeFoodCollision(snakeX, snakeY);
    snake.unshift(newHead);
  gameOverCollisions(snakeX, snakeY);
}

function snakeFoodCollision(snakeX, snakeY) {
  if(snakeX + box > food.x && snakeX < food.x + box 
    && snakeY < food.y + box && snakeY + box > food.y) {
      score++;
      eatFoodSound.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
}
const gameOverText = document.querySelector('.gameOverText');
function gameOverCollisions(snakeX, snakeY) {
  snakeWallCollision(snakeX, snakeY);
  snakeBugCollision(snakeX, snakeY);
  if(snake[0].x === snake[19].x 
    && snake[0].y === snake[19].y) { 
    if(gameStart) {
      d = '';
      gameOver = true;
      gameOverText.classList.add('visible');
      ctx.font = '65px Fredoka-One'; 
      if(innerWidth < 951) {
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.font = '65px Fredoka-One';
        ctx.fillText('GAME OVER', 9.5 * box, 10 * box);
        ctx.globalAlpha = 0;
        ctx.save();
        ctx.restore();
        ctx.globalAlpha = 1;
      }
      clearInterval(IntervalId);
      wallLostAudio();
      // setTimeout(() => {  // auto reload // 
      //   window.location.reload();
      // }, 3000);
    }
  } //* wall stop game over
}

function snakeWallCollision(snakeX, snakeY) {
  if(snakeX + box > canvas.width - box) {
    snake[0].x -= box / 4;
  } else if(snakeX < box) {
    snake[0].x += box / 4;
  } else if(snakeY + box > canvas.height - box) {
    snake[0].y -= box / 4;
  } else if(snakeY < box * 3) {
    snake[0].y += box / 4;
  }
}

function snakeBugCollision(snakeX, snakeY) {
  if(snakeX + box > bug.x  && snakeX < bug.x + box 
    && snakeY < bug.y + box && snakeY + box > bug.y) {
    d = '';
    gameOver = true;
    clearInterval(IntervalId);
    bugLostAudio();
  } //* bug game over //
}


function wallLostAudio() {
  TimeoutId = setTimeout(() => {
    if(wallLostSound.classList.contains('js_blank')) return;
    if(lostSound) return;
    wallLostSound.play();
      lostSound = true;
    wallLostSound.classList.add('js_blank');
  }, 300);
}

function bugLostAudio() {
  clearTimeout(TimeoutId);
  if(bugLostSound.classList.contains('js_blank')) return;
  bugLostSound.play();
  bugLostSound.classList.add('js_blank');
}


//* --------------------------------------------------------------------------------

  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      gameStart = true;
      if(!gameOver) {
        if(btn.classList.contains('btn-top') && d !== 'DOWN') {
          d = 'UP';
        }
        if(btn.classList.contains('btn-left') && d !== 'RIGHT') {
          d = 'LEFT';
        }
        if(btn.classList.contains('btn-right') && d !== 'LEFT') {
          d = 'RIGHT';
        }
        if(btn.classList.contains('btn-bottom') && d !== 'UP') {
          d = 'DOWN';
        }
      }
      if(btn.classList.contains('btn-replay')) {
        window.location.reload();
      }
    });
  });
  
console.log(btns);



// ----------------------------------------------------------------------------------------------------


























