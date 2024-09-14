let player;

function loadGameScreen() {
    const canvas = document.getElementById('face');
    const ctx = canvas.getContext('2d');
    
    // プレイヤーと背景、障害物の初期化
    player = new Player(100, 300);
    //background = new Background('./background-image.png', 2);
    //obstacles.push(new Obstacle(930, 600, 50, 150, 3));  // 1つの障害物を追加

    canvas.onclick = function () {
        player.jump();
    };

    gameLoop(ctx);
}

function gameLoop(ctx) {
    ctx.clearRect(0, 0, 930, 750);

    // 背景の更新と描画
    //background.update();
    //background.draw(ctx);

    // プレイヤーの更新と描画
    player.update();
    player.draw(ctx);

    // 障害物の更新と描画
    //obstacles.forEach(obstacle => {
        //obstacle.update();
        //obstacle.draw(ctx);
    //});

    // 再帰的にゲームループを続ける
    requestAnimationFrame(() => gameLoop(ctx));
}