

function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
  
    // 指定されたシーンだけを表示する
    document.getElementById(sceneId).classList.add('active');
}

function game() {
  const face = document.getElementById("face");
  const ctx = face.getContext('2d');

  ctx.beginPath();
  ctx.strokeRect(300, 500, 80, 80);

  ctx.beginPath();
  ctx.arc(300, 400, 50, 0, Math.PI * 2, true);
  ctx.stroke();

  //document.getElementById("titleImage").style = "block";

}


// DOMContentLoadedイベントで関数を実
document.addEventListener('DOMContentLoaded', game);


