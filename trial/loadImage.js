// 各フォルダとその中の画像ファイル名のオブジェクト
const imageFolders = {
    '0': ['00.gif','01.gif','02.gif','03.gif','04.gif','05.gif'],
    '1': ['00.gif','01.gif','02.gif','03.gif','04.gif'],
    // ...他のフォルダ...
};

// 特定のフォルダの画像のみを読み込む関数
function loadImageFromFolder(folderName) {
    const gameImages = document.getElementById('gameImages');
    gameImages.innerHTML = ''; // 既存の画像をクリア
  
    const images = imageFolders[folderName];
    images.forEach(file => {
      const img = document.createElement('img');
      img.src = `images/${folderName}/${file}`;
      img.alt = file;
      gameImages.appendChild(img);
    });
}
  
function loadSpecificImages() {
    const gameImages = document.getElementById('gameImages');
    gameImages.innerHTML = ''; // 既存の画像をクリア
  
    // 特定の画像のリスト（フォルダ名とファイル名を含む）
    //ここでは「ドカドカ空命」とひょうじする
    const specificImages = [
      { folder: '0', file: '05.gif' },
      { folder: '0', file: '03.gif' },
      { folder: '1', file: '04.gif' },
      { folder: '1', file: '02.gif' },
      { folder: '0', file: '00.gif' },
      { folder: '1', file: '00.gif' },
    ];
  
    specificImages.forEach(({ folder, file }) => {
      const img = document.createElement('img');
      img.src = `images/${folder}/${file}`;
      img.alt = file;
      gameImages.appendChild(img);
    });
}

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

//ボタン画像を押したらそれに対応する画像を表示するスクリプト
  // イベントリスナーのセットアップ関数にフォルダ選択ボタン用のリスナーを追加
function setupListeners() {
  fetch("buttons.csv")
    .then(response => response.text())
    .then(text=>{
    const buttons = parseCSV(text);
    // ボタンエリアの取得
    const buttonArea = document.getElementById('buttonArea');

    // ボタンの動的生成
    buttons.forEach(buttonData => {
      const img = document.createElement('img');
      img.classList.add('imageButton');
      img.src = buttonData.src;
      img.alt = buttonData.alt;
      img.setAttribute('data-folder', buttonData.folder);
      img.addEventListener('click', function() {
        if (buttonData.folder=="X"){
          loadSpecificImages()
        }
        else{
          loadImageFromFolder(buttonData.folder);
        }
      });
      buttonArea.appendChild(img);
    });
  })
  .catch(error => console.error("CSVの読み込みに失敗",error));
}



// DOMContentLoadedイベントで関数を実行
document.addEventListener('DOMContentLoaded', function() {
    setupListeners();
});