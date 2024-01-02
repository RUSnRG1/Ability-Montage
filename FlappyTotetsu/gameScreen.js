// 自機の状態
const player = {
  x: 310,
  y: 300, // Y座標
  velocity: 0 // 速度
};

const rects = [];
let n = 20;
for (let i = 0; i < n; ++i){
  const width = 40;
  const height = 60 - 30 / n * i;
  const xr = 310 - 280 * (i + 1) / n;
  const yr = 300;
  const angle = 0;
  rects.push({ xr, yr, width, height, angle });
}

let y_before = 0;

const face = document.getElementById("face");
const ctx = face.getContext('2d');

// 定数
const GRAVITY = 1.5; // 重力
const JUMP_FORCE = -25; // ジャンプの力
const FRAME_RATE = 60; // フレームレート

function calc() {
  player.velocity += GRAVITY;
  y_before = player.y;
  player.y += player.velocity;
  for (let i = n-1; i >= 0; --i){
    if (i == 0) {
      rects[i].yr = y_before;
    }
    else {
      rects[i].yr = rects[i-1].yr
    }
  }

  for (let i = 0; i < n; ++i){
    if (i == 0) {
      dx = player.x - rects[i].xr;
      dy = player.y - rects[i].yr;
    }
    else {
      dx = rects[i-1].xr - rects[i].xr;
      dy = rects[i-1].yr - rects[i].yr;
    }
    targetAngle = Math.atan2(dy, dx);
    rects[i].angle = lerpAngle(rects[i].angle, targetAngle, 0.8);
    //console.log(rects[i].angle);
  }
}
function lerpAngle(a, b, t) {
    const diff = b - a;
    return a + diff * t;
}


function drawRectangles() {
  rects.forEach(rect => {
    ctx.translate(rect.xr, rect.yr);
    ctx.rotate(rect.angle);
    ctx.beginPath();
    ctx.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
    ctx.fillStyle = 'blue'; // 例えば青色で塗りつぶす
    ctx.fill();
    ctx.stroke(); // 枠線を描画
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });
}

function draw() {

  drawRectangles();
  ctx.beginPath();
  //ctx.arc(300, player.y, 50, 0, Math.PI * 2, true);
  ctx.arc(player.x, player.y, 30, 0, Math.PI * 2, true);
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

