const textElement = document.getElementById('text');
const messageElement = document.getElementById('message');
let currentIndex = 1000; // 現在の赤文字インデックス
let loadedImages = 0; //ロード枚数確認
let gameActive = false; //ゲームがアクティブか判定する変数

const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const scoreResultElement = document.getElementById('scoreResult');
var imageButtons = null;

window.scoreResult = 0; // スコアをリザルト画面に送るためのグローバル変数
let score = 0;//スコア
let timeLeft = 60; // 制限時間 (秒)
let timerInterval = null; // タイマーのインターバルID
let selectedImage = null; // 選択された画像の追跡
var gameText = "";
var messageText = "";

//以下デバッグ用
var textCount = 55;


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
      let imageName = `${i.toString().padStart(2, '0')}.gif`;
      imageNames.push(imageName);
  }
  // 結果をオブジェクトとして返す
  return imageNames;
}

function makeText() {
  const max = 56;
  var a = Math.floor(Math.random() * max);
  return window.textdata[a];
}

function makeTextForDebug() {
  textCount++;
  if(textCount == window.textdata.length){
    textCount = 0;
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

// スコアとタイマーを更新
function updateScoreAndTimer(correct) {
  if (correct) {
    score += 100; // 正解の場合、スコアを加算
    timeLeft += 5; // 時間を5秒延長
  } else {
    timeLeft -= 3; // 間違いの場合、時間を3秒減少
    if (timeLeft < 0) timeLeft = 0; // 時間が負にならないようにする
  }
  scoreElement.textContent = `スコア: ${score}`;
  timerElement.textContent = `残り時間: ${timeLeft}秒`;
}

function resetGame(){
  gameActive=false;
  timeLeft = 60;
  if (selectedImage) {
    selectedImage.style.outline = "none"
  }
  selectedImage = null;
  timerInterval = null;
  gameText = ""; // 文章生成
  updateText(gameText);
  timerElement.textContent = `残り時間: ${timeLeft}秒`;
  window.scoreResult = score;
  score = 0;
  scoreElement.textContent = `スコア: ${score}`;
  document.getElementById("gameImages").innerHTML = '';
  imageButtons.forEach(img => {
    img.removeEventListener('click', onCardClick);
  });
  document.getElementById("dynamicBox").style.display = "none";
}

// タイマーを開始
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      currentIndex = 1000;
      gameText = "ゲームオーバー！"; // 文章生成
      updateText(gameText);
      setTimeout(() =>{
        resetGame();
        scoreResultElement.textContent = window.scoreResult;
        document.getElementById("resultImage").style.display = "block";
        changeScene("resultScene");
      },3000)
    }
    timerElement.textContent = `残り時間: ${timeLeft}秒`;
  }, 1000);
}


//ボタン画像を押したらそれに対応する画像を表示するスクリプト
  // イベントリスナーのセットアップ関数にフォルダ選択ボタン用のリスナーを追加

function showGameScreen() {
  document.getElementById('startButtonImage').addEventListener('click', function (){
    if(imageButtons == null){
      imageButtons = document.querySelectorAll(".imageButton");
    }
    document.getElementById('methodsBox').style.display = "none";
    //setupListeners();
    showGameIntro();
  });
}


function showGameIntro() {
  messageText = "Ready...";
  updateMessage(messageText);
  setTimeout(() => {
    messageText = "Go!";
    updateMessage(messageText);
    setTimeout(() => {
      document.getElementById("dynamicBox").style.display = "inline-block";
      messageText = "";
      updateMessage(messageText);
      gameActive = true;
      currentIndex = 0;
      startGame();
    }, 600);
  }, 600);
  
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

function onCardClick(e) {
  const img = e.target;
  if (!gameActive) return;//ゲームが非アクティブならボタン押し無効
  //選択したカードを赤枠で囲む
  if (selectedImage) {
    selectedImage.style.outline = "none"
  }
  selectedImage = img;
  selectedImage.style.outline = "2px solid red";
  console.log(gameText[currentIndex]);
  if (img.alt.includes(gameText[currentIndex])) {
    displayImageFromMap(Number(img.folder),gameText[currentIndex])
    currentIndex++;
    if (currentIndex >= gameText.length) {
      gameActive = false;
      updateScoreAndTimer(true);
      setTimeout(() => {
        document.getElementById("gameImages").innerHTML = ''; // 既存の画像をクリア
        currentIndex = 0;
        //gameText = makeText(); // 文章生成
        gameText = makeTextForDebug(); // 文章生成
        updateText(gameText);
        gameActive = true;
      }, 2000);
    }
    updateText(gameText);
  } else {
    updateScoreAndTimer(false);
  }
}

function startGame() {
  //gameText = makeText(); // 文章生成
  gameText = makeTextForDebug(); // 文章生成
  updateText(gameText);
  imageButtons.forEach(img => {
    console.log(img)
    img.addEventListener('click', onCardClick);
    buttonArea.appendChild(img);
  });
  startTimer();
}

// DOMContentLoadedイベントで関数を実
document.addEventListener('DOMContentLoaded', showGameScreen);

