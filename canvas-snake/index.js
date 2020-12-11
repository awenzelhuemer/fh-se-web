var DIRECTION_UP = 38;
var DIRECTION_DOWN = 40;
var DIRECTION_LEFT = 37;
var DIRECTION_RIGHT = 39;

var SCREENSIZE = 84 / 2;
var MAXFIELD = SCREENSIZE * SCREENSIZE;
var SPEED = 50;

var COLOR_BACKGROUND = "#8ECC5D";
var COLOR_SNAKE = "black";
var COLOR_FRUIT = "black";
var COLOR_TEXT = "black";

var canvas;
var ctx;

var snake = new Array();
var snakeLength = 0;

var direction = DIRECTION_UP;

var fruit = -1;
var fruitLife = 0;

var pause = false;
var gameOver = false;

//--------------------------------------------------------------------------
window.onload = function () {
	//TODO 1
	canvas = document.getElementById("snake");
	ctx = canvas.getContext("2d");

	SCREENSIZE = Math.round(canvas.width / 5);
	MAXFIELD = SCREENSIZE * SCREENSIZE;

	init();
	setInterval(loop, SPEED);

	window.onkeydown = gameController;
}

//--------------------------------------------------------------------------
function init() {
	snakeLength = 2;
    snake[0] = random(MAXFIELD);
    snake[1] = snake[0] + 1;

    drawScreen();
}
//--------------------------------------------------------------------------
function loop() {

	if (!pause) {
		placeFruit();
		eatSnake();
		moveSnake();
		drawScreen();
		crashDetection();
    }

    if (gameOver) {
		drawScreen();
    }
}
//--------------------------------------------------------------------------
function drawScreen() {
	var x, y;

	ctx.fillStyle = COLOR_BACKGROUND;
	ctx.fillRect(0, 0, SCREENSIZE * 5 + 2, SCREENSIZE * 5 + 2);

	// draw fruit
	
	//TODO 4
	if(fruitLife > 0) {
		ctx.fillStyle = COLOR_FRUIT;
	
		x = Math.floor(fruit % SCREENSIZE) * 5;
		y = Math.floor(fruit / SCREENSIZE) * 5;

		ctx.fillRect(x, y, 2, 2);
		ctx.fillRect(x + 3, y, 2, 2);
		ctx.fillRect(x, y + 3, 2, 2);
		ctx.fillRect(x + 3, y + 3, 2, 2);
		ctx.fillRect(x + 2, y + 2, 2, 2);
	}


	// draw snake
	
	//TODO 2
	ctx.fillStyle = COLOR_SNAKE;
	for (let idx = 0; idx < snakeLength; idx++) {
		x = Math.floor(snake[idx] % SCREENSIZE) * 5;
		y = Math.floor(snake[idx] / SCREENSIZE) * 5;

		ctx.fillRect(x, y, 5, 5);
	}
}
//--------------------------------------------------------------------------
function moveSnake() {
	for (var i = snakeLength; i >= 0; i--) {
		snake[i + 1] = snake[i];
    }

    switch (direction) {
		case DIRECTION_UP:
			snake[0] = snake[1] - SCREENSIZE;
			break;
		case DIRECTION_DOWN:
			snake[0] = snake[1] + SCREENSIZE;
			break;
		case DIRECTION_LEFT:
			snake[0] = snake[1] - 1;
			break;
		case DIRECTION_RIGHT:
			snake[0] = snake[1] + 1;
			break;
    }

    if (snake[0] >= MAXFIELD) {
		snake[0] = snake[0] - MAXFIELD;
	} else if (snake[0] < 0) {
		snake[0] = snake[0] + MAXFIELD;
	} else {
		if(direction == DIRECTION_LEFT && snake[0] % SCREENSIZE == SCREENSIZE - 1) {
			snake[0] = snake[0] + SCREENSIZE;
		}
		if(direction == DIRECTION_RIGHT && snake[0] % SCREENSIZE == 0) {
			snake[0] = snake[0] - SCREENSIZE;
		}
  	}
}
//--------------------------------------------------------------------------
function placeFruit() {
	//TODO 3

	if (fruitLife == 0) {
		if (random(30) == 1) {
			fruit = -1;	
			while (fruit == -1) {
				fruit = random(MAXFIELD);

				for (let i = 0; i < snakeLength; i++) {
					if(snake[i] == fruit) {
						fruit = -1;
						break;
					}
				}
			}
			fruitLife = 100;
		}
	} else {
		fruitLife--;
	}
}
//--------------------------------------------------------------------------
function eatSnake() {
	//TODO 5

	if(fruitLife > 0) {
		if(fruit == snake[0]) {
			snake[snakeLength] = snake[snakeLength - 1];
			snakeLength++;
			fruitLife = 0;
		}
	}
}
//--------------------------------------------------------------------------
function crashDetection() {
	//TODO 6
	
	for(let i = 1; i < snakeLength; i++) {
		if(snake[0] == snake[i]) {
			gameOver = true;
			pause = true;
		}
	}
}
//--------------------------------------------------------------------------
function gameController(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 32) {//Space
		pause = !pause;
	} else if (key == DIRECTION_UP && direction != DIRECTION_DOWN) {
		direction = key;
	} else if (key == DIRECTION_DOWN && direction != DIRECTION_UP) {
		direction = key;
	} else if (key == DIRECTION_LEFT && direction != DIRECTION_RIGHT) {
		direction = key;
	} else if (key == DIRECTION_RIGHT && direction != DIRECTION_LEFT) {
		direction = key;
	}
}

function random(maxNumber) {
	return Math.round(Math.random() * maxNumber);
}
