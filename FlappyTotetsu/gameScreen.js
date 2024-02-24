//ゲーム設計としては、フラッピー要素はかなり簡単だけど、飢餓状態がかなり深刻だからフラッピーでミスりやすくなる、という感じがいいと思う
//作るもの（優先順）
//totetsu(move)
//background
//hand
//food
//titleのstart button
//introのintroduction



// 自機の状態
// 定数
const GRAVITY = 1.2; // 重力
const JUMP_FORCE = -18; // ジャンプの力
const FRAME_RATE = 60; // フレームレート

const HAND_SIZE = 50;//障害物の横サイズ
const INTERVAL = 550;//前後の障害物の間隔
const MOVE_SPEED = 9;//動くスピード, Playerの長さで速さが変わるらしい。
const MOVE_SPEED_B1 = 6;//動くスピード, Playerの長さで速さが変わるらしい。
const MOVE_SPEED_B2 = 3;//動くスピード, Playerの長さで速さが変わるらしい。

const PLAYER_R = 40;//プレイヤー円の半径

const FOOD_R = 20;
const FOOD_H = 400;

const MaxFoodMeter = 1000;


let titleFlag = true;
let introFlag = false;
let gameFlag = false;
let resultFlag = false;

//様々なエレメントを取得
EtimerBarInner = document.getElementById('barI');
Eintroduction = document.getElementById('introduction');
Eresult = document.getElementById('result');
Etweet = document.getElementById('Tweet');
EoneMore = document.getElementById('oneMore');
Ebase = document.getElementById('base');
EtitleText = document.getElementById('titleText');
EtimerBarOuter= document.getElementById("barO");
Escore = document.getElementById("score");
Escore2 = document.getElementById("score2");
Ebest = document.getElementById("bestscore");
Eplay = document.getElementById("play");
Ewait = document.getElementById("waitMotion");
Echarge = document.getElementById("chargeMotion");
Ehead = document.getElementById("totetsuHead");
Ebody = document.getElementById("totetsuBody");
Ehand = document.getElementById("hand");
Efood = document.getElementById("foods");
Eb11 = document.getElementById("background1-1");
Eb12 = document.getElementById("background1-2");
Eb21 = document.getElementById("background2-1");
Eb22 = document.getElementById("background2-2");

Sjump = document.getElementById("jumpSound");
Seat = document.getElementById("eatSound");
Sover = document.getElementById("overSound");
Sscore = document.getElementById("scoreSound");

const player = {
  x: 310,
  y: 350, // Y座標
  velocity: 0, // 速度
  angle:0
};

const rects = [];
let n = 30;
for (let i = 0; i < n; ++i){
  const width = 40;
  //const height = 60 - 30 / n * i;
  const height = 60;
  const xr = -1000;
  const yr = 300;
  const angle = 0;
  rects.push({ xr, yr, width, height, angle });
}

const hands = [];
let n2 = 6;
for (let i = 0; i < n2; ++i){
  let handx = 1500 + i * INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
  let handc = Math.floor(Math.random() * (550 + 1 - 300)) + 300;//中点
  let handCC = Math.floor(Math.random() * (250 + 1 - 200)) + 200;//中点からの距離（つまり間の広さ）
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

let score = 0;
let bestscore=getHighScore();
let foodMeter = MaxFoodMeter;
let counter = 0;
let resultCounter = 0;

let touchHandFlag = false;
let touchFoodFlag = false;

let y_before = 0;

let phaseCount = 0;
let phase = 0;
const intervalMax = [550,550,550,580,580,600,600,620];
const intervalMin = [300,300,280,280,250,240,230,220];
const centerMax = [250,240,230,220,200,180,160,150];
const centerMin = [200,190,180,170,160,150,140,130];

let basex = 255;
let b11 = 0;
let b12 = 1000;
let b21 = 0;
let b22 = 1000;

const face = document.getElementById("face");
const ctx = face.getContext('2d');

function getHighScore() {
  const name = "highScore=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return parseInt(c.substring(name.length, c.length), 10);
    }
  }
  return 0; // クッキーが見つからない場合は0を返す
}

function initGame() {
  let i = 0;

  hands.forEach(hand => {
    hand.handx = 1500 + i * INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
    hand.handc = Math.floor(Math.random() * (550 + 1 - 300)) + 300;
    hand.handCC = Math.floor(Math.random() * (200 + 1 - 200)) + 200;
    hand.clearFlag = Boolean(false);
    i++;
  })

  i = 0;
  foods.forEach(food => {
    food.foodx = (hands[i * 2 + 1].handx + hands[i * 2].handx) / 2;
    food.foody = Math.floor(Math.random() * (650 + 1 - 100)) + 100;//Math.floor(Math.random() * (550 + 1 - 200)) + 200;
    i++;
  })

  score = 0;
  foodMeter = MaxFoodMeter;
  touchHandFlag = false;
  touchFoodFlag = false;
  y_before = 0;
  counter = 0;
  phase = 0;
  phaseCount = 0;
  resultCounter = 0;
  basex = 255;

  player.x =310;
  player.y = 350; // Y座標
  player.velocity = 0; // 速度
  player.angle = 0;
  rects.forEach(rect => {
    rect.xr = -1000;
    rect.yr = 300;
    rect.angle = 0;
  })

  Eb11.style.left = `${b11}px`;
  Eb12.style.left = `${b12}px`;
  Eb21.style.left = `${b21}px`;
  Eb22.style.left = `${b22}px`;

  Efood.querySelector(`[num="0"] img`).src = `images/foods/0.png`;
  Efood.querySelector(`[num="1"] img`).src = `images/foods/0.png`;
  Efood.querySelector(`[num="2"] img`).src = `images/foods/0.png`;


  const sprites = Ebody.querySelectorAll('.sprites');
  sprites.forEach(function (sprite) {
    sprite.style.filter = 'brightness(100%)';
    sprite.style.opacity = "1";
  });

  Ehead.style.filter = 'brightness(100%)';
  Ehead.style.opacity = "1";
  Ebase.style.left = `${basex}.px`
}



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
    let k = counter - 31;
    if (k >= 0 && k < n) {
      rects[k].xr = 310 - 290 * (k + 1) / n;
    }
  }

  for (let i = 0; i < n; ++i) {
    if (i == 0) {
      //dx = player.x - rects[i].xr;
      dy = player.y - rects[i].yr;
    }
    else {
      //dx = rects[i - 1].xr - rects[i].xr;
      dy = rects[i - 1].yr - rects[i].yr;
    }
    rects[i].angle = Math.atan2(dy, MOVE_SPEED);
  }
  player.angle = Math.atan2(player.velocity,MOVE_SPEED);
  basex-=MOVE_SPEED;
}

function calcHands() {
  for (let i = 0; i < n2; ++i){
    hands[i].handx -= MOVE_SPEED;
    if (hands[i].handx < -60) {
      if (i == 0) {
        hands[0].handx = hands[5].handx + INTERVAL - Math.floor(Math.random() * (220 + 1));//障害物の右端指定
      }
      else {
        hands[i].handx = hands[i-1].handx + INTERVAL - Math.floor(Math.random() * (200 + 1));//障害物の右端指定
      }
      hands[i].handc = Math.floor(Math.random() * (intervalMax[phase] + 1 - intervalMin[phase])) + intervalMin[phase];
      hands[i].handCC = Math.floor(Math.random() * (centerMax[phase] + 1 - centerMin[phase])) + centerMin[phase];
      //hands[i].handc = Math.floor(Math.random() * (intervalMax[7] + 1 - intervalMin[7])) + intervalMin[7];
      //hands[i].handCC = Math.floor(Math.random() * (centerMax[7] + 1 - centerMin[7])) + centerMin[7];
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
      Efood.querySelector(`[num="${i}"] img`).src = `images/foods/${phase}.png`;
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
    Seat.currentTime =0;
    Seat.play();
    foodMeter += 120;
    if (foodMeter > MaxFoodMeter) foodMeter = MaxFoodMeter;
  }
  const percentage = (foodMeter / MaxFoodMeter) * 100;
  EtimerBarInner.style.width = percentage + '%';
  if(foodMeter<=0){
    return true;
  }
  else return false;
  //console.log(foodMeter);
}

function calcScore() {
  hands.forEach(hand => {
    if (hand.clearFlag == false && hand.handx < player.x - PLAYER_R - HAND_SIZE) {
      hand.clearFlag = true;
      score++;
      Escore.textContent = `SCORE: ${score}`;
      Sscore.currentTime = 0;
      Sscore.play();
      if(phaseCount < 85)
      phaseCount++;
    }
  })
  phase = Math.floor(phaseCount / 10);
  
}

function calcBack() {
  b11 -= MOVE_SPEED_B2;
  b12 -= MOVE_SPEED_B2;
  b21 -= MOVE_SPEED_B2;
  b22 -= MOVE_SPEED_B2;

  if (b11 < -1001) {
    b11 = b12 + 1000;
  }
  else if (b12 < -1001) {
    b12 = b11 + 1000;
  }

  if (b21 < -1001) {
    b21 = b22 + 1000;
  }
  else if (b22 < -1001) {
    b22 = b21 + 1000;
  }

  
}
// イベントリスナーを追加する関数
function addClickListener() {
  document.getElementById("gameScene").addEventListener('click', jump);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'z') {
      jump();
    }
  });
}

// イベントリスナーを削除する関数
function removeClickListener() {
  document.getElementById("gameScene").removeEventListener('click', jump);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'z') {
      jump();
    }
  });
}


function calc() {

  if(counter > 30) {
    addClickListener();
    Ehead.style.display = "block";
    calcBack();
    calcPlayer();
    calcHands();
    calcScore();
    calcFood();
    touchFoodFlag = touchFoodCheck();
    if (touchCheck() || calcMeter(touchFoodFlag)) {
      gameFlag = false;
      resultFlag = true;
      Sover.currentTime = 0;
      Sover.play();
      removeClickListener();
    }
    
    
    ;
  }

  counter++; 
  
}

function drawRectangles() {
  [...rects].reverse().forEach(rect => {
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

function drawBody(){
  Ehead.style.left = `${player.x-50}px`;
  Ehead.style.top = `${player.y-50}px`;
  Ehead.style.transform =`rotate(${player.angle}rad)`;
  for (let i = n - 1; i >= 0; --i) {
    
    Ebody.querySelector(`[num="${i}"]`).style.left = `${rects[i].xr-20}px`;
    Ebody.querySelector(`[num="${i}"]`).style.top = `${rects[i].yr-30}px`;
    Ebody.querySelector(`[num="${i}"]`).style.transform =`rotate(${rects[i].angle}rad)`;
    
  }
}


//100-130... 115から上下15
function drawHands() {

  for (let i = 0; i < 6; ++i){
    Ehand.querySelector(`[num="${i}"][updown="0"]`).style.left = `${hands[i].handx}px`;
    Ehand.querySelector(`[num="${i}"][updown="0"]`).style.top = `${hands[i].handc + hands[i].handCC}px`;
    Ehand.querySelector(`[num="${i}"][updown="1"]`).style.left = `${hands[i].handx}px`;
    Ehand.querySelector(`[num="${i}"][updown="1"]`).style.top = `${hands[i].handc - hands[i].handCC-700}px`;
    
  }
  Ebase.style.left = `${basex}px`;
}

function drawFoods() {
  foods.forEach(food => {
    ctx.beginPath();
    ctx.arc(food.foodx, food.foody, FOOD_R, 0, Math.PI * 2, true);
    ctx.fillStyle = 'yellow'; // 例えば青色で塗りつぶす
    ctx.fill();
    ctx.stroke(); // 枠線を描画
  })

  for (let i = 0; i < n3; ++i){
    Efood.querySelector(`[num="${i}"]`).style.left = `${foods[i].foodx-40}px`;
    Efood.querySelector(`[num="${i}"]`).style.top = `${foods[i].foody - 40}px`;
  }
}

function drawTotetsu(k) {
  Ewait.style.display = "none";
  Echarge.style.display = "none";
  if (k == 0) {
    Ewait.style.display = "block";
  }
  if (k == 1) {
    Echarge.style.display = "block";
  }
  if (k == 2) {
    drawBody();
  }
}

function drawBack() {
  Eb11.style.left = `${b11}px`;
  Eb12.style.left = `${b12}px`;
  Eb21.style.left = `${b21}px`;
  Eb22.style.left = `${b22}px`;
}

function draw() {
  drawBack();
  drawHands();
  drawFoods();

  if (counter == 31) {
    jump();
  }

  if (counter <= 30) {
    drawTotetsu(1);
  }
  else {
    //drawRectangles();
    ctx.beginPath();
    //ctx.arc(300, player.y, 50, 0, Math.PI * 2, true);
    ctx.arc(player.x, player.y, PLAYER_R, 0, Math.PI * 2, true);
    drawTotetsu(2);
    ctx.stroke();
    if (touchHandFlag == true) {
      ctx.beginPath();
      ctx.rect(100, 100, 100, 100);
      ctx.fillStyle = 'black'; // 例えば青色で塗りつぶす
      ctx.fill();
    }
  }
  
  
}

function startAnimation(callback) {
  const sprites = Ebody.querySelectorAll('.sprites');
  sprites.forEach(function (sprite) {
    sprite.style.filter = 'brightness(0%)';
    sprite.style.opacity = "0";
  });

  Ehead.style.filter = 'brightness(0%)';
  Ehead.style.opacity = "0";
  setTimeout(callback(), 500)
}

function setHighScore(score) {
  const d = new Date();
  d.setTime(d.getTime() + (365*24*60*60*1000)); // 1年後に有効期限を設定
  const expires = "expires=" + d.toUTCString();
  document.cookie = "highScore=" + score + ";" + expires + ";path=/";
}

function updateScore(newScore) {
  score = newScore;
  if (score > bestscore) {
    bestscore = score; // ハイスコアを更新
    setHighScore(bestscore); // 新しいハイスコアをクッキーに保存
  }
}

function drawResult() {
  drawBack();
  drawHands();
  drawFoods();
  updateScore(score);
  Eresult.style.display="block";
  Escore2.textContent = `SCORE: ${score}`;
  Escore2.style.display = "block";
  Ebest.textContent = `BEST: ${bestscore}`;
  Ebest.style.display = "block";

  startAnimation(() => {
    Etweet.style.display = 'block';
    EoneMore.style.display = 'block';
  });
  
}

function drawTitle() {
  drawBack();
  drawHands();
  drawFoods();
  drawTotetsu(0);
  Ebase.style.display = "block";
  EtitleText.style.display = "block";
  Eplay.style.display = "block";
  //ここをfaceじゃなくてblockボタンに変える
  Eplay.addEventListener('click', function () {
    titleFlag = false;
    introFlag = true;
    EtitleText.style.display = "none";
    Eplay.style.display = "none"
  })
}

function drawIntro() {
  drawBack();
  drawHands();
  drawFoods();
  drawTotetsu(0);
  introduction.style.display = "block";
  EtimerBarOuter.style.display = "block";
  EtimerBarInner.style.display = "block";
  Escore.style.display = "block";

  Eintroduction.addEventListener('click', function () {
    introFlag = false;
    gameFlag = true;
    Eintroduction.style.display = "none";
  })
  
  
}

// ジャンプ処理
function jump() {
  player.velocity = JUMP_FORCE;
  player.jumpFlag = 0;
  Sjump.currentTime = 0;
  Sjump.play();
}


function setting() {
  Etweet.style.display = 'none';
  EoneMore.style.display = 'none';
  Ebase.style.display = "none";
  EtitleText.style.display = "none";
  EtimerBarOuter.style.display = "none";
  EtimerBarInner.style.display = "none";
  Escore.style.display = "none";
  Eintroduction.style.display = "none";
  Eresult.style.display="none";
  Eplay.style.display = "none";
  Ewait.style.display = "none";
  Echarge.style.display = "none";
  Ehead.style.display = "none";
  Escore2.style.display = "none";
  Ebest.style.display = "none";
}

// ゲームループ
function gameLoop() {
  ctx.clearRect(0, 0, 930, 750);
  if (titleFlag) {
    drawTitle();
  }
  if (introFlag) {
    drawIntro();
  }
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

Etweet.addEventListener('click', function () {
  //let text = document.getElementById("tweet-text").innerText;
  // オプションパラメータを設定
  var tweetText = `Flappy Totetsuでスコア: ${score}でした。 \n＃FlappyTotetsu\nhttps://rusnrg1.github.io/Ability-Montage.github.io/FlappyTotetsu`;
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
  window.open(tweetUrl, '_blank');
});

EoneMore.addEventListener('click', function () {
  Etweet.style.display = 'none';
  EoneMore.style.display = 'none';
  Eresult.style.display="none";
  resultFlag = false;
  introFlag = true;
  initGame();
  Escore.textContent = `SCORE: ${score}`;
  EtimerBarInner.style.width = '100%';
  Ehead.style.left = '-100px';
  const sprites = Ebody.querySelectorAll('.sprites');
  sprites.forEach(function (sprite) {
    sprite.style.left = "-100px"
  });
  Escore2.style.display = "none";
  Ebest.style.display = "none";
});



// キーボードイベントのリスナーを設定




//初期配置(ボタンを指定場所において非表示にしたりする。読み込み自体はinitでやる)
setting();
// ゲーム開始
setTimeout(() => {
  gameLoop();
}, 3000);


