function Ball(x, y, velX, velY, color, size) {
    BallStatic.call(this, x, y, color, size);
    this.velX = velX;
    this.velY = velY;
}

Ball.prototype = Object.create(BallStatic.prototype);

Ball.prototype.constructor = Ball;

Ball.prototype.update = function(playArea) {
    if ((this.x + this.size) >= playArea.width || (this.x - this.size) <= 0 ||
        (this.y + this.size) >= playArea.height || (this.y - this.size) <= 0 ) {
        return false;
    }

    this.x += this.velX;
    this.y += this.velY;
    return true;
};

Ball.prototype.collisionDetect = function(balls) {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                Game.staticBalls = [];
            }
        }
    }
};