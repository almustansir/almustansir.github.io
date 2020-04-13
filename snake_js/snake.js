const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// create unit
const box = 32;

// load img
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";


// create the snake

let snake = [];
snake[0] = {
	x: 9*box,
	y: 10*box
}

// create the food

let food = {
	x: Math.floor(Math.random()*17+1) * box,
	y: Math.floor(Math.random()*15+3) * box
}

// score var
let score = 0;

// control snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
	let key = event.keyCode;
	if((key == 37 || key == 65) && d != "RIGHT") {
		left.play();
		d = "LEFT";
	} else if((key == 38 || key == 87) && d != "DOWN") {
		up.play();
		d = "UP";
	} else if((key == 39 || key == 68) && d != "LEFT") {
		right.play();
		d = "RIGHT";
	} else if((key == 40 || key == 83) && d != "UP") {
		down.play();
		d = "DOWN";
	}
}

// collision function
function collision(head, array) {
	for(let i=0; i<array.length; i++) {
		if(head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

// draw in canvas

function draw() {
	
	ctx.drawImage(ground,0,0);

	// drawing snake
	for(let i=0; i<snake.length; i++) {
		ctx.fillStyle = (i==0)? "green": "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	//drawing food
	ctx.drawImage(foodImg, food.x, food.y);

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// if snake eats the food
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		eat.play();
		food = {
			x: Math.floor(Math.random()*17+1) * box,
			y: Math.floor(Math.random()*15+3) * box
		}
		// won't remove tail
	} else {
		// remmove Tail
		snake.pop();
	}

	// which direction
	if(d == "LEFT") snakeX -= box;
	if(d == "UP") snakeY -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "DOWN") snakeY += box;

	// add new head
	let newHead = {
		x: snakeX,
		y: snakeY
	}

	// game over
	if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
		clearInterval(game);
		dead.play();
	}

	snake.unshift(newHead);

	// ahowing score
	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
}

// call the draw function draw function every 100ms
let game = setInterval(draw, 100);
