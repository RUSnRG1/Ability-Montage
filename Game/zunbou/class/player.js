class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;

        this.x2 = 0;
        this.y2 = 0;
        this.width2 = 70;
        this.height2 = 10;

        this.velocity = 0;
        this.acceleration=2;
        //this.jumpPower = -10;
        this.maxVelocity=15;


        //デバッグ用変数
        this.flag = false;
    }

    change() {

        this.acceleration *= -1;

    }

    update(buildings) {
        
        this.velocity += this.acceleration;
        if (this.velocity > this.maxVelocity){
            this.velocity=this.maxVelocity;
        }
        else if (this.velocity < -1*this.maxVelocity){
            this.velocity=-1*this.maxVelocity;
        }
        this.y += this.velocity;

        this.x2 = this.x-(this.width2-this.width)/2
        this.y2 = this.y-this.height2+this.height



        //ビルとの接触判定
        this.flag = this.checkCollision(buildings);

        // 地面に衝突した場合
        if (this.y + this.height > 750) {
            this.y = 750 - this.height;
            this.velocity = 0;
        }
        
    }

    draw(ctx) {
        ctx.fillStyle = `rgb(${255*(1-Number(this.flag))}, 255, 0)`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x2,this.y2, this.width2, this.height2)
    }

    checkCollision(buildings) {

        //obstacles.forEach(obstacle => {
        // 恐ろしいことに、forEach文を使うとreturnで抜けられなくなる
        // どうすれば抜けられますか？→forEach使うな。　だそうです
        for(let i=0;i<buildings.length;++i){
            let buildingBounds = buildings[i].getBounds();
            //1:正方形部分
            //もしかしてこれ、長方形部分だけ考えればいいのか？？？？

            //2:長方形部分
            if(this.x2+this.width2 > buildingBounds.x &&
                this.x2 < buildingBounds.x+buildingBounds.width
            ){
                if(this.y2+this.height2 > buildingBounds.y){
                    return true;
                }
            }

        };
        return false;  // 衝突していない
    }
}