class Firework {
    constructor(speed) {
        this.x = -100;
        this.y = -100;
        this.width =50;
        this.height = 50;
        this.speed = speed;
        this.color = `rgb(256, 128, 128)`; // RとBのグラデーション

        this.upflag = false;
        this.upHeight = 0;
    }

    update(){
        if(this.upflag){
            this.x -= this.speed;
            if(this.x < -100){
                this.upflag = false;
            }
        }
        


    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkFlag(x,y){
        if(!this.upflag){
            if(Math.random()*100 < 10){
                this.x=x;
                this.y =y;
                this.upHeight = Math.random()*200+100;
                //まず(850-500)/speed回,加速度が変化するので
                num = 350/this.speed;
                //次にy,v,aを考えると、num回加速度が変化すると、位置は
                //y+a+2a+3a+...num*aとなり、その和は1/2*num*(num+1)*a+y
                //これがupheightとなればいいので
                a = (this.upHeight-y)*2/(num*(num+1));
                なんか違う
                this.upflag = true;
                console.log("Firework flag change!")
            }
            else console.log("Firework not change...")
        }
    }

}