function loadResultScreen() {
    const canvas = document.getElementById('face');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Result Screen - Click to Restart', canvas.width / 2, canvas.height / 2);

    canvas.onclick = function () {
        loadTitleScreen();
    };
}
