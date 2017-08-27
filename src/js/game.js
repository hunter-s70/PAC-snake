var Game = {
    canvas: document.querySelector('#canvas'),
    ctx: canvas.getContext('2d'),

    playArea: {
        width: canvas.width = window.innerWidth,
        height: canvas.height = window.innerHeight
    },

    balls: [],
    snakeSize: 1,
    snakeSpeed: 3,

    random: function(min,max) {
        return Math.floor(Math.random()*(max-min)) + min;
    },

    joystick: function(event) {
        switch (event.keyCode) {
            //up
            case 38:
                Game.balls[0].velX = 0;
                Game.balls[0].velY = -Game.snakeSpeed;
                break;
            //down
            case 40:
                Game.balls[0].velX = 0;
                Game.balls[0].velY = Game.snakeSpeed;
                break;
            //left
            case 37:
                Game.balls[0].velX = -Game.snakeSpeed;
                Game.balls[0].velY = 0;
                break;
            //right
            case 39:
                Game.balls[0].velX = Game.snakeSpeed;
                Game.balls[0].velY = 0;
                break;
        }
    },

    loop: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        Game.ctx.fillRect(0, 0, Game.playArea.width, Game.playArea.height);

        while (Game.balls.length < Game.snakeSize) {
            var ball = new Ball(
                20,
                20,
                Game.snakeSpeed,
                0,
                'rgb(' + Game.random(0,255) + ',' + Game.random(0,255) + ',' + Game.random(0,255) +')',
                15
            );
            Game.balls.push(ball);
        }

        for (var i = 0; i < Game.balls.length; i++) {
            Game.balls[i].draw(Game.ctx);
            Game.balls[i].update(Game.playArea);
        }

        requestAnimationFrame(Game.loop);
    }
};

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function(playArea) {
    if ((this.x + this.size) >= playArea.width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= playArea.height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

Game.loop();

window.addEventListener('keydown', Game.joystick, false);