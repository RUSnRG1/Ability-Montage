class Airplane {
    constructor(speed) {
        this.x = -300;
        this.y = -300;
        this.width =80;
        this.height = 50
        this.speed = speed;
        this.color = `rgb(32, 32, 222)`; // RとBのグラデーション

        this.flightFlag = false;
        
    }

    update(){
        this.flagcheck();
        if(this.flightFlag){
            this.x -= this.speed;
            if (this.x + this.width < -400) {
                this.x += 2100;  // 初期位置に戻す
                this.flightFlag=false;
            }
        }
        //console.log(this.flightFlag);
        
        


    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flagcheck(){
        if(!this.flightFlag){
            this.flightFlag = (Math.random()*1000 < 3);
            this.x=1100;
            this.y=Math.random()*250+50;
        }
    }

}