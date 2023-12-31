// 自機の状態
const player = {
  y: 400, // Y座標
  velocity: 0 // 速度
};

const face = document.getElementById("face");
const ctx = face.getContext('2d');

// 定数
const GRAVITY = 0.5; // 重力
const JUMP_FORCE = -10; // ジャンプの力
const FRAME_RATE = 60; // フレームレート

function calc() {
  player.velocity += GRAVITY;
  player.y += player.velocity;
}

function draw() {

  ctx.beginPath();
  ctx.strokeRect(300, 500, 80, 80);
  
  ctx.beginPath();
  ctx.arc(300, player.y, 50, 0, Math.PI * 2, true);
  ctx.stroke();
}

// ジャンプ処理
function jump() {
  player.velocity = JUMP_FORCE;
}

// ゲームループ
function gameLoop() {

  ctx.clearRect(0, 0, 930,750);
  calc();
  draw();

  // 次のフレームを予約
  setTimeout(gameLoop, 1000 / FRAME_RATE);
}

// キーボードイベントのリスナーを設定
document.addEventListener('keydown', function (event) {
  if (event.key === 'z') {
    jump();
  }
});

// ゲーム開始
gameLoop();

