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

  // イベントリスナーのセットアップ関数にフォルダ選択ボタン用のリスナーを追加
function setupListeners() {
    const gameScene = document.getElementById('gameScene');
    gameScene.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('imageButton')) {
        const folder = target.getAttribute('data-folder');
        if (folder=="X"){
          loadSpecificImages();
        }
        else if(folder){
          loadImageFromFolder(folder);
        }
      }
    });
  
    // ...他のイベントリスナー...
}
  
  // DOMContentLoadedイベントで関数を実行
document.addEventListener('DOMContentLoaded', function() {
    setupListeners();
});