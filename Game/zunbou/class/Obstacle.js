let obsStartPos = 210 //スタート時の一番左側にあるビルのx座標

class Obstacle {
    constructor(num,speed,len) {
        this.length = len;
        this.number = num;//何個目のビルか。
        this.x = num*50+obsStartPos;
        this.width = 50;
        this.speed = speed;
        this.randomHeight();
        let colorValue = Math.floor((this.number / 20) * 255); // 0〜255の範囲で計算
        this.color = `rgb(${colorValue}, 0, ${255 - colorValue})`; // RとBのグラデーション
        
    }

    update() {
        this.x -= this.speed;
        // 画面外に出たら再配置する
        if (this.x + this.width < 0) {
            this.x += this.width*this.length;  // 初期位置に戻す
            this.randomHeight();
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //ビルの高さをランダムにセットする
    randomHeight(){
        this.y= 500+Math.random() * 600 + 50; // 高さを再ランダム化
        this.height = 750 - this.y; // 底に揃える
    }

    // 障害物の位置とサイズを取得するメソッド
    getBounds() {
        return {
            len:this.length,
            num:this.number,
            x: this.x,
            y: this.y,
            width: this.width
        };
    }
}