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
    if ((this.x + this.size) >= playArea.width || (this.x - this.size) <= 0 ||
        (this.y + this.size) >= playArea.height || (this.y - this.size) <= 0 ) {
        return false;
    }

    this.x += this.velX;
    this.y += this.velY;
    return true;
};