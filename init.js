window.textdata = []; //問題文テキストを格納する配列
window.imageElements = []; //ボタン用の画像オブジェクトを格納する配列
window.gameImageElements = [];//出力用の画像のMapオブジェクトを格納



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

function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'block';

}

function hideLoadingScreen() {
  document.getElementById('loadingScreen').style.display = 'none';
}

function preloadAllResources(callback) {
    preloadImages(() => {
      preloadTexts(() => {
        callback();  
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
            gameimg.src = `images/${buttonimg.folder}/${i.toString().padStart(2, '0')}.gif`;
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
      img.src = `images/${buttonImage.folder}/${i.toString().padStart(2, '0')}.gif`;
      img.alt = buttonImage.alt[i];
      map.set(img.alt,img.src);
    }
    gameImage.push(map);    
  })
}

function preloadTexts(callback) {
    fetch("text.csv")
      .then(response => response.text())
      .then(data => {
        const text = parseCSV(data);
        text.forEach(t => {
          textdata.push(t.text);
        });
      })
      .catch(error => console.error("CSVの読み込みに失敗", error));
    callback();
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
  showLoadingScreen();

  const img = document.createElement('img');
  img.src = `images/Title.jpg`;
  document.getElementById("titleImage").appendChild(img);

  const resultimg = document.createElement('img');
  resultimg.src = `images/Result.jpg`;
  document.getElementById("resultImage").appendChild(resultimg);

  const startimg = document.createElement('img');
  startimg.src = `images/startButton.jpg`;
  document.getElementById("startButtonImage").appendChild(startimg);

  var descriptionElement = document.querySelector('.description');
  descriptionElement.innerText = "How to play\nアビリティカードを繋げて文を作ろう！\nカードをクリックで選択\n文の完成でお金と酸素（制限時間）が増えるぞ！\n酸素が亡くなる前にたくさん完成させよう！";

  const onemoreimg = document.createElement('img');
  onemoreimg.src = `images/OneMore.jpg`;
  document.getElementById("oneMore").appendChild(onemoreimg);

  const tweetimg = document.createElement('img');
  tweetimg.src = `images/Tweet.jpg`;
  document.getElementById("Tweet").appendChild(tweetimg);

  preloadAllResources(() => {
    setTimeout(() => {
      displayImage();
      hideLoadingScreen();
      document.getElementById("titleImage").style.display = "block";
      changeScene("titleScene");
    }, 3000);
  });
});
