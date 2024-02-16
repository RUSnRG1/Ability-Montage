// 自機の状態
// 定数
const GRAVITY = 1.2; // 重力
const JUMP_FORCE = -18; // ジャンプの力
const FRAME_RATE = 60; // フレームレート

const HAND_SIZE = 50;//障害物の横サイズ
const INTERVAL = 550;//前後の障害物の間隔
const MOVE_SPEED = 6;//動くスピード

const PLAYER_R = 30;//プレイヤー円の半径

const FOOD_R = 10;
const FOOD_H = 400;

let score = 0;

let introFlag = false;
let gameFlag = true;
let resultFlag = false;


const player = {
  x: 310,
  y: 300, // Y座標
  velocity: 0 // 速度
};

const rects = [];
let n = 50;
for (let i = 0; i < n; ++i){
  const width = 40;
  const height = 60 - 30 / n * i;
  const xr = 310 - 280 * (i + 1) / n;
  const yr = 300;
  const angle = 0;
  const jumpFlag = 1;
  rects.push({ xr, yr, width, height, angle });
}

const hands = [];
let n2 = 6;
for (let i = 0; i < n2; ++i){
  let handx = 1000 + i * INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
  let handc = Math.floor(Math.random() * (550 + 1 - 200)) + 200;
  let handCC = Math.floor(Math.random() * (130 + 1 - 100)) + 100;
  let clearFlag = Boolean(false);
  hands.push({handx,handc,handCC,clearFlag});
}

const foods = [];
let n3 = 3;
for (let i = 0; i < n3; ++i) {
  let foodx = (hands[i*2+1].handx + hands[i*2].handx)/2;
  let foody = Math.floor(Math.random() * (650 + 1 - 100)) + 100;//Math.floor(Math.random() * (550 + 1 - 200)) + 200;
  foods.push({ foodx,foody });
}

let foodMeter = 5000;

let touchHandFlag = false;
let touchFoodFlag = false;

let y_before = 0;

const face = document.getElementById("face");
const ctx = face.getContext('2d');

function calcPlayer() {
  player.velocity += GRAVITY;
  y_before = player.y;
  player.y += player.velocity;
  for (let i = n - 1; i >= 0; --i) {
    if (i == 0) {
      rects[i].yr = y_before;
    }
    else {
      rects[i].yr = rects[i - 1].yr
    }
  }

  for (let i = 0; i < n; ++i) {
    if (i == 0) {
      dx = player.x - rects[i].xr;
      dy = player.y - rects[i].yr;
    }
    else {
      dx = rects[i - 1].xr - rects[i].xr;
      dy = rects[i - 1].yr - rects[i].yr;
    }
    rects[i].angle = Math.atan2(dy, dx);

    //console.log(rects[i].angle);
  }
}

function calcHands() {
  for (let i = 0; i < n2; ++i){
    hands[i].handx -= MOVE_SPEED;
    if (hands[i].handx < -60) {
      if (i == 0) {
        hands[0].handx = hands[5].handx + INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
      }
      else {
        hands[i].handx = hands[i-1].handx + INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
      }
      hands[i].handc = Math.floor(Math.random() * (550 + 1 - 200)) + 200;
      hands[i].handCC = Math.floor(Math.random() * (130 + 1 - 100)) + 100;
      hands[i].clearFlag = false;
    }
  } 
}

function calcFood() {
  for (let i = 0; i < n3; ++i) {
    foods[i].foodx -= MOVE_SPEED;
    if (foods[i].foodx < -400) {
      foods[i].foodx = (hands[i * 2 + 1].handx + hands[i * 2].handx) / 2;//障害物の右端指定
      foods[i].foody = Math.floor(Math.random() * (650 + 1 - 100)) + 100;
    }
  }
}

//必要なのはpx,py,r,ex,ey,w
function touchCheck() {
  let tempFlag = false;
  hands.forEach(hand => {
    if (tempFlag) return;
    else if (player.x > hand.handx - PLAYER_R && player.x < hand.handx + HAND_SIZE + PLAYER_R) {
      //プレイヤーのX座標が土管範囲内なら
      if (player.x < hand.handx) {
        let tempy = Math.acos((hand.handx-player.x)/PLAYER_R);
        if (Math.sin(tempy) + player.y > hand.handc + hand.handCC || Math.sin(-tempy) + player.y < hand.handc - hand.handCC) {
          //console.log("touch 1");
          tempFlag = true;
        }
      }
      else if (player.x > (hand.handx + HAND_SIZE)) {
        let tempy = Math.acos((hand.handx + HAND_SIZE - player.x) / PLAYER_R);
        if (Math.sin(tempy) + player.y > hand.handc + hand.handCC || Math.sin(-tempy) + player.y < hand.handc - hand.handCC) {
          //console.log("touch 2");
          tempFlag = true;
        }
      }
      else {
        if (player.y + PLAYER_R > hand.handc + hand.handCC || player.y - PLAYER_R < hand.handc - hand.handCC) {
          //console.log("touch 3");
          tempFlag = true;
        }
      }
    }
  })
  return tempFlag; 
}

function touchFoodCheck() {
  let tempFlag = false;
  foods.forEach(food => {
    if (tempFlag) return;
    else if (player.x < food.foodx + 50 || player.x > food.foodx - 50) {
      if (Math.pow(player.x - food.foodx, 2) + Math.pow(player.y - food.foody, 2) <= Math.pow(PLAYER_R + FOOD_R, 2)) {
        tempFlag = true;
        food.foody = 10000;
      }
    }
  })
  return tempFlag;
}

function calcMeter(flag) {
  foodMeter--;
  if (flag) {
    foodMeter += 300;
  }
  //console.log(foodMeter);
}

function calcScore() {
  hands.forEach(hand => {
    if (hand.clearFlag == false && hand.handx < player.x - PLAYER_R - HAND_SIZE) {
      hand.clearFlag = true;
      score++;
      console.log(score);
    }
  })
}

function calc() {
  calcPlayer();
  calcHands();
  if (touchCheck()) {
    gameFlag = false;
    resultFlag = true;
  }
  calcScore();
  calcFood();
  touchFoodFlag = touchFoodCheck();
  calcMeter(touchFoodFlag);
  
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


//100-130... 115から上下15
function drawHands() {
  hands.forEach(hand => {
    ctx.beginPath();
    //ctx.rect(100, 100, 100, 100);
    ctx.rect(hand.handx, hand.handc + hand.handCC, HAND_SIZE, 750 - hand.handc-hand.handCC);
    ctx.rect(hand.handx, 0, HAND_SIZE, hand.handc - hand.handCC);
    
    ctx.fillStyle = 'green'; // 例えば青色で塗りつぶす
    ctx.fill();
    ctx.stroke(); // 枠線を描画
  })
}

function drawFoods() {
  foods.forEach(food => {
    ctx.beginPath();
    ctx.arc(food.foodx, food.foody, FOOD_R, 0, Math.PI * 2, true);
    ctx.fillStyle = 'yellow'; // 例えば青色で塗りつぶす
    ctx.fill();
    ctx.stroke(); // 枠線を描画
  })
}

function draw() {
  drawHands();
  drawRectangles();
  drawFoods();
  ctx.beginPath();
  //ctx.arc(300, player.y, 50, 0, Math.PI * 2, true);
  ctx.arc(player.x, player.y, PLAYER_R, 0, Math.PI * 2, true);
  ctx.stroke();
  if (touchHandFlag==true) {
    ctx.beginPath();
    ctx.rect(100, 100, 100, 100);
    ctx.fillStyle = 'black'; // 例えば青色で塗りつぶす
    ctx.fill();
  }
  
}

function drawResult() {
  drawHands();
  drawFoods();
  document.getElementById('Tweet').style.display = 'block';
  document.getElementById('oneMore').style.display = 'block';

}

// ジャンプ処理
function jump() {
  player.velocity = JUMP_FORCE;
  player.jumpFlag = 0;
}


function setting() {
  document.getElementById('Tweet').style.display = 'none';
  document.getElementById('oneMore').style.display = 'none';
  //いんとろからゲームスタートのためのコードとか
  //
  //

}

// ゲームループ
function gameLoop() {

  ctx.clearRect(0, 0, 930, 750);
  if (gameFlag) {
    calc();
    draw();
  }
  if (resultFlag) {
    drawResult();
  }
  

  // 次のフレームを予約
  setTimeout(gameLoop, 1000 / FRAME_RATE);
}

document.getElementById('Tweet').addEventListener('click', function () {
  //let text = document.getElementById("tweet-text").innerText;
  // オプションパラメータを設定
  var tweetText = `今回の獲得金額: ${window.scoreResult} \n＃AbilityMontage\nhttps://rusnrg1.github.io/Ability-Montage.github.io/`;
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
  window.open(tweetUrl, '_blank');
});

// キーボードイベントのリスナーを設定
document.addEventListener('keydown', function (event) {
  if (event.key === 'z') {
    jump();
  }
});



//初期配置(ボタンを指定場所において非表示にしたりする。読み込み自体はinitでやる)
setting();
// ゲーム開始
gameLoop();

