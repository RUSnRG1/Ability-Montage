

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
    document.querySelector('[name="clear"]').style.display = "none";
    document.querySelector('[name="result"]').style.display = "none";
    document.getElementById("scoreResult").style.display = "none";
    document.getElementById("desk").style.display = "flex";
    document.getElementById("startButtonImage").style.display = "flex";
    changeScene('gameScene');
  });
  document.getElementById('Tweet').addEventListener('click', function () {
    //let text = document.getElementById("tweet-text").innerText;
    // オプションパラメータを設定
    if (window.scoreResult == 50000) {
      var tweetText = `今回の獲得金額: ${window.scoreResult}。ゲームクリア！！！ \n＃AbilityMontage\nhttps://rusnrg1.github.io/Ability-Montage.github.io/`;
    }
    else {
      var tweetText = `今回の獲得金額: ${window.scoreResult} \n＃AbilityMontage\nhttps://rusnrg1.github.io/Ability-Montage.github.io/`;
    }
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(tweetUrl, '_blank');
  });
}
  
  // DOMContentLoadedイベントで関数を実行
document.addEventListener('DOMContentLoaded', setupListeners);