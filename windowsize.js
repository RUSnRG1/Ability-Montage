function adjustSceneSize() {
    //ブラウザの幅(screenWidth)と高さ(screenHeight)をJavaScriptの機能を使って取得する
    var screenWidth = window.innerWidth;
    var scale = screenWidth < 930 ? screenWidth / 930 : 1;
    const sceneElements = document.querySelectorAll('.scene');
    sceneElements.forEach(scene => {
        scene.style.width = (930 * scale) + 'px';
        scene.style.height = (750 * scale) + 'px';
    });
}

window.addEventListener('resize', adjustSceneSize);
document.addEventListener('DOMContentLoaded', function() {
    adjustSceneSize();
    // 他の初期化処理
});