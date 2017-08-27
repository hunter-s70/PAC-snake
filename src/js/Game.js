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
        var snakeHead = Game.balls[0];

        switch (event.keyCode) {
            //up
            case 38:
                snakeHead.velX = Game.snakeNoSpeed;
                snakeHead.velY = -Game.snakeSpeed;
                break;
            //down
            case 40:
                snakeHead.velX = Game.snakeNoSpeed;
                snakeHead.velY = Game.snakeSpeed;
                break;
            //left
            case 37:
                snakeHead.velX = -Game.snakeSpeed;
                snakeHead.velY = Game.snakeNoSpeed;
                break;
            //right
            case 39:
                snakeHead.velX = Game.snakeSpeed;
                snakeHead.velY = Game.snakeNoSpeed;
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

    createStaticBall: function() {
        var ball = new BallStatic(
            Game.random(0, Game.playArea.width),
            Game.random(0, Game.playArea.height),
            'rgb(' + Game.random(0,255) + ',' + Game.random(0,255) + ',' + Game.random(0,255) +')',
            Game.random(10, 30)
        );

        ball.draw(Game.ctx);
    },

    resetGame: function() {
        Game.balls = [];
        Game.snakeBallCount = 1;
    }
};

Game.loop();

window.addEventListener('keydown', Game.joystick, false);