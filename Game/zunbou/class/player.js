class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpPower = -10;
    }

    jump() {
        this.velocity = this.jumpPower;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // 地面に衝突した場合
        if (this.y + this.height > 750) {
            this.y = 750 - this.height;
            this.velocity = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}