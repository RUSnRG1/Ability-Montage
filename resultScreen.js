

function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
  
    // 指定されたシーンだけを表示する
    document.getElementById(sceneId).classList.add('active');
}
  
// イベントリスナーをセットアップするための関数
function setupListeners() {
  document.getElementById('oneMore').addEventListener('click', function () {
    document.getElementById('methodsBox').style.display = "flex";
    changeScene('gameScene');
  });
  document.getElementById('Tweet').addEventListener('click', function () {
    let text = document.getElementById("tweet-text").innerText;
    // オプションパラメータを設定
    let hashtags = "ハッシュタグ";
    let url = encodeURIComponent(location.href)  // location.hrefは今いるURL

    // URLを生成して遷移
    window.open("https://twitter.com/share?text=" + text + "&hashtags=" + hashtags + "&url=" + url);
  });
}
  
  // DOMContentLoadedイベントで関数を実行
document.addEventListener('DOMContentLoaded', setupListeners);