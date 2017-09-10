var Game = {
    canvas: document.querySelector('#canvas'),
    ctx: canvas.getContext('2d'),

    playArea: {
        width: canvas.width = window.innerWidth,
        height: canvas.height = window.innerHeight
    },

    balls: [],
    staticBalls: [],

    snakeColor: 'rgb(1, 223, 1)',
    snakeBallCount: 1,
    snakeSpeed: 3,
    snakeNoSpeed: 0,
    startPosX: 20,
    startPosY: 20,
    ballSize: 15,
    state: null,

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

    chainCreator: function(index) {
        return new Ball(
            Game.balls[index].x - 30,
            Game.balls[index].y,
            Game.balls[index].velX,
            Game.balls[index].velY,
            Game.snakeColor,
            Game.ballSize
        );
    },

    setBuffer: function(state) {
        this.state = state;
    },

    getBuffer: function() {
        return this.state;
    },

    render: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        Game.ctx.fillRect(0, 0, Game.playArea.width, Game.playArea.height);

        while (Game.balls.length < Game.snakeBallCount) {
            var ball;
            if (!Game.balls.length) {
                ball = new Ball(
                    Game.startPosX,
                    Game.startPosY,
                    Game.snakeSpeed,
                    Game.snakeNoSpeed,
                    Game.snakeColor,
                    Game.ballSize
                );
            } else {
                ball = Game.chainCreator(Game.balls.length - 1);
            }
            Game.balls.push(ball);
        }

        for (var i = 0; i < Game.balls.length; i++) {
            var currentBall = Game.balls[i],
                prevState = Game.getBuffer();

            Game.setBuffer(currentBall);
            currentBall.draw(Game.ctx);
            
            if (!currentBall.collisionDetect(Game.staticBalls)) {
                Game.staticBalls = [];
                Game.snakeBallCount++;
            }
            if (i === 0 && !Game.balls[0].update(Game.playArea)) {
                Game.resetGame();
            }
            if (i !== 0) {
                Game.balls[i] = new Ball(
                    prevState.x,
                    prevState.y,
                    prevState.velX,
                    prevState.velY,
                    Game.snakeColor,
                    Game.ballSize
                );
            }
        }

        Game.createStaticBall();

        requestAnimationFrame(Game.render);
    },

    createStaticBall: function() {
        if (!Game.staticBalls.length) {
            var ball = new BallStatic(
                Game.random(0, Game.playArea.width),
                Game.random(0, Game.playArea.height),
                'rgb(' + Game.random(0,255) + ',' + Game.random(0,255) + ',' + Game.random(0,255) +')',
                Game.ballSize
            );
            Game.staticBalls.push(ball);
        }

        Game.staticBalls[0].draw(Game.ctx);
    },

    resetGame: function() {
        Game.balls = [];
        Game.snakeBallCount = 1;
    }
};

Game.render();

window.addEventListener('keydown', Game.joystick, false);