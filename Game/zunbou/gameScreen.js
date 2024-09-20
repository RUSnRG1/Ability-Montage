let player;
let obsNum = 20;
let buildings = [];
let airplane;
let star;
let firework;



function loadGameScreen() {
    const canvas = document.getElementById('face');
    const ctx = canvas.getContext('2d');
    
    // プレイヤーと背景、障害物の初期化
    player = new Player(300, 300);
    //background = new Background('./background-image.png', 2);
    //obstacles.push(new Obstacle(num, speed));  // 1つの障害物を追加
    for (let i = 0; i < obsNum; i++) {
        buildings.push(new Building(i, 7,obsNum)); // 各障害物を300px間隔で配置
    }
    airplane = new Airplane(10);
    star = new Star(15);
    firework = new Firework(7);
    
    canvas.onclick = function () {
        player.change();
    };

    gameLoop(ctx);
}

function gameLoop(ctx) {
    ctx.clearRect(0, 0, 930, 750);

    // 背景の更新と描画
    //background.update();
    //background.draw(ctx);

    // 障害物の更新と描画
    buildings.forEach(building => {
        building.update(firework);
        building.draw(ctx);
    });

    airplane.update();
    airplane.draw(ctx);

    star.update();
    star.draw(ctx);

    firework.update();
    firework.draw(ctx)

    // プレイヤーの更新と描画
    player.update(buildings);
    player.draw(ctx);

    

    // 再帰的にゲームループを続ける
    requestAnimationFrame(() => gameLoop(ctx));
}