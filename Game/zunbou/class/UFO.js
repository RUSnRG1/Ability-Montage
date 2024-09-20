class UFO {
    constructor(speed) {
        this.x = -300;
        this.y = -300;
        this.width =80;
        this.height = 50
        this.speed = speed;
        this.color = `rgb(170,174, 180)`; // RとBのグラデーション
        
    }

    update(){
        this.x -= this.speed;


    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}