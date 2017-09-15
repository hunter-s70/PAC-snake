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
    speedLevelInterval: 0.5,
    startPosX: 20,
    startPosY: 20,
    ballSize: 15,
    state: null,

    random: function(min,max) {
        return Math.floor(Math.random()*(max-min)) + min;
    },

    joystick: function(event) {
        var snakeHead = Game.balls[0];

        if (snakeHead.velX > 0) {
            Game.delDirection(event, snakeHead, 'left');
        }

        if (snakeHead.velX < 0) {
            Game.delDirection(event, snakeHead, 'right');
        }

        if (snakeHead.velY > 0) {
            Game.delDirection(event, snakeHead, 'up');
        }

        if (snakeHead.velY < 0) {
            Game.delDirection(event, snakeHead, 'down');
        }
    },

    delDirection: function(event, snakeHead, deleted) {
        switch (event.keyCode) {
            //up
            case 38:
                if (deleted === 'up') return;
                snakeHead.velX = Game.snakeNoSpeed;
                snakeHead.velY = -Game.snakeSpeed;
                break;
            //down
            case 40:
                if (deleted === 'down') return;
                snakeHead.velX = Game.snakeNoSpeed;
                snakeHead.velY = Game.snakeSpeed;
                break;
            //left
            case 37:
                if (deleted === 'left') return;
                snakeHead.velX = -Game.snakeSpeed;
                snakeHead.velY = Game.snakeNoSpeed;
                break;
            //right
            case 39:
                if (deleted === 'right') return;
                snakeHead.velX = Game.snakeSpeed;
                snakeHead.velY = Game.snakeNoSpeed;
                break;
        }
    },

    chainCreator: function(ballExample) {
        // snake head current position
        var snakeHead = ballExample || this.balls[0];

        return new Ball(
            snakeHead.x,
            snakeHead.y,
            snakeHead.velX,
            snakeHead.velY,
            snakeHead.snakeColor,
            snakeHead.ballSize
        );
    },

    createStaticBall: function() {
        if (!this.staticBalls.length) {
            var ball = new BallStatic(
                this.random(0, this.playArea.width),
                this.random(0, this.playArea.height),
                'rgb(' + this.random(0,255) + ',' + this.random(0,255) + ',' + this.random(0,255) +')',
                this.ballSize
            );
            this.staticBalls.push(ball);
        }

        this.staticBalls[0].draw(this.ctx);
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
        Game.addScore(Game.snakeBallCount);

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
                ball = Game.chainCreator();
            }
            Game.balls.push(ball);
        }

        for (var i = 0; i < Game.balls.length; i++) {
            var currentBall = Game.balls[i],
                prevState = Game.getBuffer();

            Game.setBuffer(currentBall);
            currentBall.draw(Game.ctx);
            
            if (currentBall.collisionDetect(Game.staticBalls)) {
                Game.levelUp();
            }
            if (i === 0 && !Game.balls[0].update(Game.playArea)) {
                Game.resetGame();
            }
            if (i !== 0) {
                Game.balls[i] = Game.chainCreator(prevState);
            }
        }

        Game.createStaticBall();

        requestAnimationFrame(Game.render);
    },

    addScore: function(snakeBallCount) {
        var gameScore = document.querySelector('.game-score'),
            snakeBallCount = snakeBallCount - 1;

        if (!gameScore) {
            var element = document.createElement('div'),
                body = document.querySelector('body');

            element.className = 'game-score';
            element.innerHTML = snakeBallCount;
            body.appendChild(element);
            return;
        }

        gameScore.innerHTML = snakeBallCount;
    },

    levelUp: function() {
        this.staticBalls = [];
        this.snakeBallCount++;
        this.snakeSpeed += this.speedLevelInterval;
    },

    resetGame: function() {
        this.balls = [];
        this.snakeBallCount = 1;
        this.snakeSpeed = 3;
    }
};

Game.render();

window.addEventListener('keydown', Game.joystick, false);