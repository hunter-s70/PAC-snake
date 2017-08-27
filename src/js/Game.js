var Game = {
    canvas: document.querySelector('#canvas'),
    ctx: canvas.getContext('2d'),

    playArea: {
        width: canvas.width = window.innerWidth,
        height: canvas.height = window.innerHeight
    },

    balls: [],

    snakeColor: 'rgb(1, 223, 1)',
    snakeBallCount: 1,
    snakeSpeed: 3,
    snakeNoSpeed: 0,
    startPosX: 20,
    startPosY: 20,
    ballSize: 15,

    random: function(min,max) {
        return Math.floor(Math.random()*(max-min)) + min;
    },

    joystick: function(event) {
        switch (event.keyCode) {
            //up
            case 38:
                Game.balls[0].velX = Game.snakeNoSpeed;
                Game.balls[0].velY = -Game.snakeSpeed;
                break;
            //down
            case 40:
                Game.balls[0].velX = Game.snakeNoSpeed;
                Game.balls[0].velY = Game.snakeSpeed;
                break;
            //left
            case 37:
                Game.balls[0].velX = -Game.snakeSpeed;
                Game.balls[0].velY = Game.snakeNoSpeed;
                break;
            //right
            case 39:
                Game.balls[0].velX = Game.snakeSpeed;
                Game.balls[0].velY = Game.snakeNoSpeed;
                break;
        }
    },

    loop: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        Game.ctx.fillRect(0, 0, Game.playArea.width, Game.playArea.height);

        while (Game.balls.length < Game.snakeBallCount) {
            var ball = new Ball(
                Game.startPosX,
                Game.startPosY,
                Game.snakeSpeed,
                Game.snakeNoSpeed,
                Game.snakeColor,
                Game.ballSize
            );
            Game.balls.push(ball);
        }

        for (var i = 0; i < Game.balls.length; i++) {
            Game.balls[i].draw(Game.ctx);
            if (!Game.balls[i].update(Game.playArea)) {
                Game.resetGame();
            }
        }

        requestAnimationFrame(Game.loop);
    },

    resetGame: function() {
        Game.balls = [];
        Game.snakeBallCount = 1;
    }
};

Game.loop();

window.addEventListener('keydown', Game.joystick, false);