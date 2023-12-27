window.textdata = []; //問題文テキストを格納する配列
window.textLevel = [];
window.textFlag = [];
window.textMax = [];
window.imageElements = []; //ボタン用の画像オブジェクトを格納する配列
window.gameImageElements = [];//出力用の画像のMapオブジェクトを格納

sceneElements = document.querySelectorAll('.scene');



// ここで showLoadingScreen, preloadAllResources, hideLoadingScreen, showTitleScreen 関数を定義
function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const data = line.split(',');
      return headers.reduce((obj, nextKey, index) => {
        obj[nextKey] = data[index];
        return obj;
      }, {});
    });
}





function animateUFO() {
  const ufo1 = document.getElementById('ufo1');
  const ufo2 = document.getElementById('ufo2');
  const ufo3 = document.getElementById('ufo3');
  
  const radius = 100;
  let centerX = 465;
  let centerY = 450;
  let angle1 = 0;
  let angle2 = 120*Math.PI/180;
  let angle3 = 240*Math.PI/180;

  function update() {
      // 角度を更新
      angle1 += 0.04; // 速度調整
      angle2 += 0.04; // 速度調整
      angle3 += 0.04; // 速度調整

      // 新しい位置を計算
      const x1 = centerX + radius * Math.cos(angle1);
      const y1 = centerY + radius * Math.sin(angle1);

      // UFOの位置を更新
      ufo1.style.left = `${x1*scale}px`;
    ufo1.style.top = `${y1 * scale}px`;

      const x2 = centerX + radius * Math.cos(angle2);
      const y2 = centerY + radius * Math.sin(angle2);

      // UFOの位置を更新
    ufo2.style.left = `${x2 * scale}px`;
    ufo2.style.top = `${y2 * scale}px`;

      const x3 = centerX + radius * Math.cos(angle3);
      const y3 = centerY + radius * Math.sin(angle3);

      // UFOの位置を更新
    ufo3.style.left = `${x3 * scale}px`;
    ufo3.style.top = `${y3 * scale}px`;



      // 次のフレームのために自身を呼び出す
      requestAnimationFrame(update);
  }

  update();
}


function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'block';
    animateUFO();

}

function hideLoadingScreen() {
  document.getElementById('loadingScreen').style.display = 'none';
}

function preloadAllResources(callback) {
    preloadImages(() => {
      preloadTexts(() => {
        preloadSound(() => {
          callback();  
        })
      })
    })
}

function preloadImages(callback) {
    fetch("buttons.csv")
      .then(response => response.text())
      .then(text => {
        const buttons = parseCSV(text);
        buttons.forEach(buttonData => {
          const buttonimg = new Image();
          buttonimg.classList.add('imageButton');
          buttonimg.src = buttonData.src;
          buttonimg.folder = buttonData.folder;
          buttonimg.alt = buttonData.alt;
          buttonimg.setAttribute('data-folder', buttonimg.folder);
          window.imageElements.push(buttonimg);
          let map = new Map();
          for (let i = 0; i < buttonimg.alt.length; i++) {
            const gameimg = new Image();
            gameimg.src = `images/${buttonimg.folder}/${i.toString().padStart(2, '0')}.png`;
            gameimg.alt = buttonimg.alt[i];
            map.set(gameimg.alt,gameimg.src);
          }
          window.gameImageElements.push(map);  
        });
        callback();
      })
      .catch(error => console.error("CSVの読み込みに失敗", error));
}


function preloadGameImages(){
  //alert(window.imageElements[0]);
  imageElements.forEach(buttonImage =>{
    let map = new Map();
    
    for (let i = 0; i < buttonImage.alt.length; i++) {
      const img = new Image();
      img.src = `images/${buttonImage.folder}/${i.toString().padStart(2, '0')}.png`;
      img.alt = buttonImage.alt[i];
      map.set(img.alt,img.src);
    }
    gameImage.push(map);    
  })
}

function preloadTexts(callback) {
    fetch("text_Koryudo.csv")
      .then(response => response.text())
      .then(data => {
        const text = parseCSV(data);
        text.forEach(t => {
          window.textdata.push(t.text.trim());
          window.textLevel.push(t.level);
          window.textFlag.push(!!Number(t.flag));
          window.textMax.push(t.max);
        });
      })  
      .catch(error => console.error("CSVの読み込みに失敗", error));
    callback();
}

function preloadSound(callback) {
  let soundsToLoad = ["sound/clear.mp3", "sound/excellentClear.mp3", "sound/touch.mp3", "sound/miss.mp3", "sound/gameover.mp3", "sound/momoyo.wav", "sound/gameClear.mp3"];
  document.getElementById("clearSound").src = soundsToLoad[0];
  document.getElementById("excellentClearSound").src = soundsToLoad[1];
  document.getElementById("touchSound").src = soundsToLoad[2];
  document.getElementById("missSound").src = soundsToLoad[3];
  document.getElementById("gameoverSound").src = soundsToLoad[4];
  document.getElementById("BGM").src = soundsToLoad[5];
  document.getElementById("gameClearBGM").src = soundsToLoad[6];
  callback();
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

function loadImageFromFolder(folderName, imageNum,indexNum) {
  const gameImages = document.getElementById('gameImages');
  const images = generateImageNames(imageNum)
  const img = document.createElement('img');
  img.src = `images/${folderName}/${images[indexNum]}`;
  img.alt = "hello";
  gameImages.appendChild(img);
}




function changeScene(sceneId) {
  // すべてのシーンを非表示にする
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.remove('active');
  });

  // 指定されたシーンだけを表示する
  document.getElementById(sceneId).classList.add('active');
}

function displayImage() {
  const buttonArea = document.getElementById('buttonArea');
  window.imageElements.forEach(img => {
    img.style.boxSizing = 'border-box';
    buttonArea.appendChild(img);
  })
}


document.addEventListener('DOMContentLoaded', function() {
    changeScene("gameScene");
});
