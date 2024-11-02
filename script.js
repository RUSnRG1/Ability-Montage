// Markdownファイルを読み込んでHTMLに変換し、指定の要素に挿入する関数
async function loadMarkdown(markdownPath) {
    try {
        //getElementByIdで出力先を指定
    let exportMarkdown = document.getElementById("blog-text");
    fetch("temp.md", {
        method: "GET",
    }).then(response => response.text())
    .then(text => {
        exportMarkdown.innerHTML = marked.parse(text);
    });
    } catch (error) {
        console.error("Markdownファイルの読み込みに失敗しました:", error);
        document.getElementById("blog-text").innerHTML = "<p>コンテンツを読み込めませんでした。</p>";
    }
}