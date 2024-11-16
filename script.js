// 共通部分のHTMLを読み込む関数
function loadHTML(selector, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(error => console.error(error));
}

// ページが読み込まれたときに共通部分を挿入
document.addEventListener("DOMContentLoaded", () => {
    loadHTML(".contentlink-placeholder", "./html_source/content-links.html");  // ナビゲーションバー
    loadHTML(".slider-placeholder", "./html_source/slider.html");  // スライダー
    loadHTML(".footer-placeholder", "./html_source/footer.html");  // フッター
});