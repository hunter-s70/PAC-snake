var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var balls = [];
var snakeSize = 1;
var standartSpeed = 3;

function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

function joystick(event) {
    switch (event.keyCode) {
        //up
        case 38:
            balls[0].velX = 0;
            balls[0].velY = -standartSpeed;
            break;
        //down
        case 40:
            balls[0].velX = 0;
            balls[0].velY = standartSpeed;
            break;
        //left
        case 37:
            balls[0].velX = -standartSpeed;
            balls[0].velY = 0;
            break;
        //right
        case 39:
            balls[0].velX = standartSpeed;
            balls[0].velY = 0;
            break;
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < snakeSize) {
        var ball = new Ball(
            20,
            20,
            standartSpeed,
            0,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            15
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }

    requestAnimationFrame(loop);
}

loop();

window.addEventListener('keydown', joystick, false);