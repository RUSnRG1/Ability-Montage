window.textdata = []; //問題文テキストを格納する配列
window.imageElements = []; //ボタン用の画像オブジェクトを格納する配列



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
    preloadButtonImages(() => {
      preloadTexts(() => {
      })
    })
    callback();
}

function preloadButtonImages(callback) {
    fetch("buttons.csv")
      .then(response => response.text())
      .then(text => {
        const buttons = parseCSV(text);
        buttons.forEach(buttonData => {
          const img = new Image();
          img.classList.add('imageButton');
          img.src = buttonData.src;
          img.folder = buttonData.folder;
          img.alt = buttonData.alt;
          img.setAttribute('data-folder', img.folder);
          imageElements.push(img);
        });
      })
      .catch(error => console.error("CSVの読み込みに失敗", error));
    callback();
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

function changeScene(sceneId) {
  // すべてのシーンを非表示にする
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.remove('active');
  });

  // 指定されたシーンだけを表示する
  document.getElementById(sceneId).classList.add('active');
}



document.addEventListener('DOMContentLoaded', function() {
  showLoadingScreen();
  preloadAllResources(() => {
    setTimeout(() => {
    hideLoadingScreen();
    changeScene("titleScene");
    }, 3000);
  });
});
