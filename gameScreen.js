const textElement = document.getElementById('text');
const messageElement = document.getElementById('message');
let currentIndex = 1000; // 現在の赤文字インデックス
let loadedImages = 0; //ロード枚数確認
let gameActive = false; //ゲームがアクティブか判定する変数

//const scoreElement = document.getElementById('score');
const scoreElement = document.querySelector(".scoreText");
const scoreResultElement = document.getElementById('scoreResult');
var imageButtons = null;
var loopStart = 2.8;
var loopEnd = 46.5;
window.scoreResult = 0; // スコアをリザルト画面に送るためのグローバル変数
let score = 0;//スコア
const maxTime=70;
let timeLeft = maxTime; // 制限時間 (秒)
let hintTime = 0;
let timerInterval = null; // タイマーのインターバルID
let selectedImage = null; // 選択された画像の追跡
let hintImage = null;
var gameText = "";
var messageText = "";
var useButton = [] //解答に使用したボタンを記録する関数
var fadein = 0;
//以下デバッグ用
var textCount = 99;


function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
  
    // 指定されたシーンだけを表示する
    document.getElementById(sceneId).classList.add('active');
}
  

//各フォルダとファイル名オブジェクトを作る関数
function generateImageNames(numberOfImages) {
  // 画像ファイル名の配列を生成
  let imageNames = [];
  for (let i = 0; i < numberOfImages; i++) {
      // ゼロ埋めした画像ファイル名を生成（例：'00.gif', '01.gif', ...）
      let imageName = `${i.toString().padStart(2, '0')}.png`;
      imageNames.push(imageName);
  }
  // 結果をオブジェクトとして返す
  return imageNames;
}

function makeText() {
  const max = window.textLevel.length;
  var a = Math.floor(Math.random() * max);
  count = 0;
  while (true) {
    if (window.textLevel[a] <= score / 1000 && window.textMax[a] > score / 1000 && window.textFlag[a]) {
      window.textFlag[a] = false;
      return window.textdata[a];
    }
    else {
      a = a + 4;
      count = count + 1;
      if (a >= max) {
        a = a%4+1;
      }
      if (count == max) {
        return "このテキストが表示されたらスコアと共に製作者にDMください。";
      }
    }
  }
    
}

function makeTextForDebug() {
  textCount++;
  if(textCount == window.textdata.length){
    textCount = 1;
  }
  return window.textdata[textCount];
}

function updateText(gameText) {
  textElement.innerHTML = '';
  Array.from(gameText).forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    if (index === currentIndex) {
      span.classList.add('current');
    }
    textElement.appendChild(span);
  });
}

function updateMessage(massageText) {
  messageElement.innerHTML = '';
  Array.from(massageText).forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    messageElement.appendChild(span);
  });
}

function updateTimerBar(time){
  const timerBarInner = document.querySelector('.timer-bar-inner');
  // バーの長さを計算
  const percentage = (time / maxTime) * 100;
  timerBarInner.style.width = percentage + '%';
}

// スコアとタイマーを更新
function updateScoreAndTimer(correct) {
  if (correct) {
    score += 1000; // 正解の場合、スコアを加算
    timeLeft += 15; // 時間を5秒延長
    if (timeLeft > maxTime) timeLeft = maxTime;
    updateTimerBar(timeLeft);
  } else {
    timeLeft -= 3; // 間違いの場合、時間を3秒減少
    if (timeLeft < 0) timeLeft = 0; // 時間が負にならないようにする
    updateTimerBar(timeLeft);
  }
  scoreElement.textContent = `: ${score}`;
}

function updateScoreAndTimerRe(correct,selectNum) {
  if (correct) {
    score += 1000+100*(selectNum-1); // 正解の場合、スコアを加算
    timeLeft += 5 * Math.min(selectNum-1,5); // 時間を5秒延長
    if (timeLeft > maxTime) timeLeft = maxTime;
  } else {
    timeLeft -= 3; // 間違いの場合、時間を3秒減少
    if (timeLeft < 0) timeLeft = 0; // 時間が負にならないようにする
  }
  updateTimerBar(timeLeft);
  if (score >= 50000) {
    score = 50000;
  }
  scoreElement.textContent = `: ${score}`;
}

function resetGame(){
  gameActive=false;//ゲームを停止状態に
  timeLeft = maxTime;//残り時間を最大時間に戻す
  updateTimerBar(maxTime);//タイマーバーを元に戻す
  if (selectedImage) {
    //ボタン選択の赤枠を取る
    selectedImage.style.outline = "none"
  }
  selectedImage = null;//ボタンの現在選択状態を解除
  
  if (hintImage) {
    //ボタン選択の赤枠を取る
    hintImage.classList.remove('blinking-outline');
  }
  hintImage = null;//ボタンの現在選択状態を解除

  timerInterval = null;//タイムインターバルを初期化
  gameText = ""; // 文章を初期化
  updateText(gameText);//文章を初期化

  window.textFlag.fill(1);//問題出現フラグを戻す

  useButton = [];//使用ボタンを空にする

  window.scoreResult = score;//スコアをリザルトに送る
  score = 0;//ゲーム画面におけるスコアの初期化
  scoreElement.textContent = `: ${score}`;//スコアテキスト初期化
  document.getElementById("gameImages").innerHTML = '';//画面に残ってたカード画像を消す
  document.getElementById("dynamicBox").style.display = "none";//テキスト表示部分のボックスを消す
  imageButtons.forEach(img => {
    //これは必要らしい。
    img.removeEventListener('click', onCardClick);
    
  });
}

// タイマー
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    hintTime++;
    updateTimerBar(timeLeft);

    if (hintTime == 10) {//ヒント出現処理
      hintImageOutline();
    }
    if (timeLeft <= 0) {//ゲームオーバー処理
      clearInterval(timerInterval);
      currentIndex = 1000;
      document.getElementById("BGM").pause();
      document.getElementById("BGM").currentTime = "0";
      document.getElementById("gameoverSound").play();
      startFadeOutAnimation();
      setTimeout(() =>{
        resetGame();
        scoreResultElement.textContent = `獲得金額: ${window.scoreResult}`;
        document.querySelector('[name="result"]').style.display = "block";
        document.getElementById("scoreResult").style.display = "block";
        //document.getElementById("resultImage").style.display = "block";
        changeScene("resultScene");
      },3000)
    }
  }, 1000);
}


function hintImageOutline() {
  for (let i = 0; i < imageButtons.length; i++) {
    let img = imageButtons[i];
    if (img.alt.includes(gameText[currentIndex])) {
      hintImage = img;
      hintImage.classList.add("blinking-outline");
      break;
    }
  }
}

//ボタン画像を押したらそれに対応する画像を表示するスクリプト
  // イベントリスナーのセットアップ関数にフォルダ選択ボタン用のリスナーを追加

function showGameScreen() {
  updateTimerBar(maxTime); // 初期化
  document.getElementById('startButtonImage').addEventListener('click', function (){
    if(imageButtons == null){
      imageButtons = document.querySelectorAll(".imageButton");
    }
    document.getElementById("startButtonImage").style.display = "none"
    document.getElementById("desk").style.display = "none"
    showGameIntro();
  });
}

function startFadeInAnimation() {
  const fadeOverlay = document.getElementById('fadeOverlay');
  if (fadeOverlay.classList.contains('fadeOutActive')) {
    fadeOverlay.classList.remove('fadeOutActive');
  }
  fadeOverlay.classList.add('fadeInActive');
}

function startFadeOutAnimation() {
  const fadeOverlay = document.getElementById('fadeOverlay');
  fadeOverlay.classList.remove('fadeInActive'); // フェードインクラスを削除
  fadeOverlay.classList.add('fadeOutActive'); // フェードアウトクラスを追加
}

function showGameIntro() {
  startFadeInAnimation();
  document.getElementById("BGM").currentTime = 0;
  document.getElementById("BGM").play();
  setTimeout(() => {
    document.getElementById("dynamicBox").style.display = "inline-block";
    gameActive = true;
    currentIndex = 0;
    startGame();
  }, 2200);
  
}


function displayImageFromMap(mapIndex, imageKey) {
  const gameImageArea = document.getElementById('gameImages');
  const selectedMap = window.gameImageElements[mapIndex];

  if (selectedMap && selectedMap.has(imageKey)) {
    const imageSrc = selectedMap.get(imageKey);
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageKey;
    gameImageArea.appendChild(img);
  }
}

function soundClick(t) {
  let sound = document.getElementById(t);
  sound.currentTime = 0; // 再生位置を初期位置に戻す
  sound.play();
}

function onCardClick(e) {
  const img = e.target;
  if (!gameActive) return;//ゲームが非アクティブならボタン押し無効
  //選択したカードを赤枠で囲む
  if (selectedImage) {
    selectedImage.style.outline = "none"
  }
  selectedImage = img;
  selectedImage.style.outline = "2px solid red";
  if (img.alt.includes(gameText[currentIndex])) {
    soundClick("touchSound");
    hintTime = -1;
    if (hintImage) {
      hintImage.classList.remove('blinking-outline');
    }
    if (!useButton.includes(img.folder)) {
      useButton.push(img.folder);
    }
    displayImageFromMap(Number(img.folder),gameText[currentIndex])
    currentIndex++;
    if (gameText[currentIndex]=="　") {
      console.log("空文字");
      currentIndex++;
    }

    if (currentIndex >= gameText.length) {
      gameActive = false;
      updateScoreAndTimerRe(true, useButton.length);
      if (useButton.length > 4) {
        document.getElementById("excellentClearSound").play();
      }
      else {
        document.getElementById("clearSound").play();
      }
      useButton = [];

      if (score >= 50000) {//ゲームクリア処理
        clearInterval(timerInterval);
        currentIndex = 1000;
        startFadeOutAnimation();
        setTimeout(() => {
          resetGame();
          scoreResultElement.textContent = `獲得金額: ${window.scoreResult}`;
          data = document.querySelector('[name="clear"]');
          data.style.display = "block";
          changeScene("resultScene");
          document.getElementById("BGM").pause();
          document.getElementById("BGM").currentTime = "0";
          document.getElementById("gameClearBGM").play();
        }, 3000)
      }
      
      else {
        setTimeout(() => {
          document.getElementById("gameImages").innerHTML = ''; // 既存の画像をクリア
          currentIndex = 0;
          gameText = makeText(); // 文章生成
          //gameText = makeTextForDebug(); // 文章生成
          updateText(gameText);
          gameActive = true;
        }, 1000);
      }
    }
    updateText(gameText);
  } else {
    soundClick("missSound");
    updateScoreAndTimerRe(false,null);
  }
}

function startGame() {
  gameText = makeText(); // 文章生成
  //gameText = makeTextForDebug(); // 文章生成
  updateText(gameText);
  
  imageButtons.forEach(img => {
    img.addEventListener('click', onCardClick);
    buttonArea.appendChild(img);
  });
  startTimer();
  
}

function audiocheck() {
  if (document.getElementById("BGM").currentTime > loopEnd) {
    document.getElementById("BGM").currentTime = loopStart;
    document.getElementById("BGM").play();
  }
}

// DOMContentLoadedイベントで関数を実
document.addEventListener('DOMContentLoaded', showGameScreen);
bgm = document.getElementById("BGM");
bgm.addEventListener("timeupdate", audiocheck);

