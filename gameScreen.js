const textElement = document.getElementById('text');
let currentIndex = 0; // 現在の赤文字インデックス
let loadedImages = 0; //ロード枚数確認
let gameActive = false; //ゲームがアクティブか判定する変数

const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const scoreResultElement = document.getElementById('scoreResult');
window.score = 0; // スコア
let timeLeft = 30; // 制限時間 (秒)
let timerInterval = null; // タイマーのインターバルID


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

function loadImageFromFolder(folderName, imageNum,indexNum) {
  const gameImages = document.getElementById('gameImages');
  const images = generateImageNames(imageNum)
  const img = document.createElement('img');
  img.src = `images/${folderName}/${images[indexNum]}`;
  img.alt = "hello";
  gameImages.appendChild(img);
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

// スコアとタイマーを更新
function updateScoreAndTimer(correct) {
  if (correct) {
    window.score += 10; // 正解の場合、スコアを加算
    timeLeft += 5; // 時間を5秒延長
  } else {
    timeLeft -= 3; // 間違いの場合、時間を3秒減少
    if (timeLeft < 0) timeLeft = 0; // 時間が負にならないようにする
  }
  scoreElement.textContent = `スコア: ${window.score}`;
  timerElement.textContent = `残り時間: ${timeLeft}秒`;
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
        scoreResultElement.textContent = window.score;
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
  document.getElementById('startGameButton').addEventListener('click', function() {
    document.getElementById('instruction').style.display = "none";
    document.getElementById('startGameButton').style.display = "none";
    //setupListeners();
    displayImage();
    showGameIntro();
  });
}

function displayImage() {
  const buttonArea = document.getElementById('buttonArea');
  window.imageElements.forEach(img => {
    buttonArea.appendChild(img);
  })
}

function showGameIntro() {
  const gameIntro = document.getElementById('gameIntro');
  const readyGo = document.getElementById('readyGo');

  gameIntro.style.display = 'block';
  readyGo.style.opacity = 1;

  setTimeout(() => {
    readyGo.style.opacity = 0;
  }, 2000);

  setTimeout(() => {
    gameIntro.style.display = 'none';
    // ここでゲームスタートのロジックを呼び出す
    gameActive = true;
    startGame();
  }, 2000);
}


function displayImageFromMap(mapIndex, imageKey) {
  const gameImageArea = document.getElementById('gameImages');
  const selectedMap = window.gameImageElements[mapIndex];

  if (selectedMap && selectedMap.has(imageKey)) {
    const imageSrc = selectedMap.get(imageKey);
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageKey;
    console.log(img);
    gameImageArea.appendChild(img);
  }
}

function startGame() {
  //var gameText = makeText(); // 文章生成
  var gameText = makeTextForDebug(); // 文章生成
  updateText(gameText);

  const images = document.querySelectorAll(".imageButton");
  images.forEach(img => {
    img.addEventListener('click', function () {
      if (!gameActive) return;//ゲームが非アクティブならボタン押し無効
      if (img.alt.includes(gameText[currentIndex])) {
        //loadImageFromFolder(img.folder, img.alt.length, img.alt.indexOf(gameText[currentIndex]));
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
    });
    buttonArea.appendChild(img);
  });
  startTimer();
}

// DOMContentLoadedイベントで関数を実
document.addEventListener('DOMContentLoaded', showGameScreen);

