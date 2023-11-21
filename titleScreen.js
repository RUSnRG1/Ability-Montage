// DOMContentLoadedイベントを待つのではなく、関数を直接グローバルスコープに配置
function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
  
    // 指定されたシーンだけを表示する
    document.getElementById(sceneId).classList.add('active');
}

function showInstScreen() {
    // タイトル画面を表示
    // ここで操作説明を表示する要素にイベントリスナーを設定
    document.getElementById('titleImage').addEventListener('click', function() {
      document.getElementById("titleImage").style.display = "none";
      changeScene('gameScene');
    });
}

document.addEventListener('DOMContentLoaded', showInstScreen);
