// 各フォルダとその中の画像ファイル名のオブジェクト
const imageFolders = {
    '0': ['00.gif','01.gif','02.gif','03.gif','04.gif','05.gif'],
    // ...他のフォルダ...
};

//上記の各フォルダとファイル名オブジェクトを作る関数
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

// 特定のフォルダの画像のみを読み込む関数
//今はフォルダ内全部表示しているが、ゆくゆくは一枚のみ
function loadImageFromFolder(folderName,imageNum) {
    const gameImages = document.getElementById('gameImages');
    gameImages.innerHTML = ''; // 既存の画像をクリア
  
    const images = generateImageNames(imageNum)
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
        loadImageFromFolder(buttonData.folder,buttonData.alt.length);
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