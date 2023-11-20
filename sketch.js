let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(800, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);

  leftPaddle.show();
  leftPaddle.update();
  rightPaddle.show();
  rightPaddle.update();

  ball.show();
  ball.update();
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);

  if (ball.isOut()) {
    if (ball.x < 0) {
      rightScore++;
    } else {
      leftScore++;
    }
    ball.reset();
  }

  displayScores();
}

function displayScores() {
  fill(255);
  textSize(32);
  text(leftScore, width / 4, 50);
  text(rightScore, (3 * width) / 4, 50);
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.isLeft = isLeft;
    this.y = height / 2 - this.h / 2;
    this.x = isLeft ? 0 : width - this.w;
    this.ySpeed = 0;
    this.speed = 5;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y = constrain(this.y + this.ySpeed, 0, height - this.h);
  }
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(2) > 1 ? 5 : -5;
    this.ySpeed = random(-5, 5);
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 20);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  isOut() {
    return this.x < 0 || this.x > width;
  }

  checkCollision(paddle) {
    if (
      this.x - 10 < paddle.x + paddle.w &&
      this.x + 10 > paddle.x &&
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h
    ) {
      this.xSpeed *= -1;
    }
  }
}

function keyPressed() {
  if (key === 'ArrowUp') rightPaddle.ySpeed = -rightPaddle.speed;
  if (key === 'ArrowDown') rightPaddle.ySpeed = rightPaddle.speed;
  if (key === 'w') leftPaddle.ySpeed = -leftPaddle.speed;
  if (key === 's') leftPaddle.ySpeed = leftPaddle.speed;
}

function keyReleased() {
  if (key === 'ArrowUp' || key === 'ArrowDown') rightPaddle.ySpeed = 0;
  if (key === 'w' || key === 's') leftPaddle.ySpeed = 0;
}