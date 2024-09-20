class Star {
    constructor(speed) {
        this.x = -300;
        this.y = -100;
        this.width =40;
        this.height = 40
        this.speed = speed;
        this.fallSpeed = 4;
        this.color = `rgb(64, 220, 64)`; // RとBのグラデーション
        this.fallFlag = false
        
    }

    update(){
        this.flagcheck();
        if(this.fallFlag){
            this.x -= this.speed;
            this.y += this.fallSpeed;
            if (this.x+ this.height < -400) {
                this.y = -100;  // 初期位置に戻す
                this.fallFlag=false;
            }
        }
        //console.log(this.fallFlag);


    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flagcheck(){
        if(!this.fallFlag){
            if(Math.random()*1000 < 30){
                this.fallFlag = true;
                this.x=Math.random()*700+1000;
                this.y=-this.height;
                this.fallSpeed = Math.random()*3+4;
                this.speed = Math.random()*10+10;
            }
        }
    }

}