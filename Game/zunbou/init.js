window.onload = function () {
    // Start with the loading screen
    loadLoadingScreen();
};

function loadLoadingScreen() {
    const canvas = document.getElementById('face');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);

    setTimeout(() => {
        loadTitleScreen();
    }, 2000); // Simulate loading delay
}
