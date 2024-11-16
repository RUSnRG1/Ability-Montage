// ブログデータ（仮のデータ構造）
const blogData = [
    { title: "社会人生活7ヵ月、サークル参加6回", path: "Blog/source/2024-11-08/text.md" },
    { title: "投稿テスト", path: "Blog/source/2024-11-04/text.md" },
    { title: "メモ", path: "Blog/source/2024-11-16/text.md" },
    { title: "2024年8月24日", path: "source/2024-08-22/text.md" },
    { title: "2024年8月25日", path: "source/2024-08-10/text.md" },
    { title: "2024年8月26日", path: "source/2024-08-22/text.md" },
    { title: "2024年8月27日", path: "source/2024-08-22/text.md" },
    // 以降も追加
];

const blogsPerPage = 6;
let currentPage = 1;

// ブログリストを読み込む
function loadBlogList(page) {
    currentPage = page;

    // 表示する範囲を取得
    const startIndex = (page - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const blogsToDisplay = blogData.slice(startIndex, endIndex);

    const blogListContainer = document.getElementById("blog-list");
    blogListContainer.innerHTML = ""; // 一旦クリア

    blogsToDisplay.forEach(blog => {
        fetch(blog.path)
            .then(response => response.text())
            .then(markdown => {
                const excerpt = markdown.split("\n").slice(0, 3).join(" ");
                const blogHTML = `
                    <div class="blog-thumbnail">
                        <h2>${blog.title}</h2>
                        <p>${excerpt}...</p>
                        <a href="Blog/template.html?path=${blog.path}&title=${encodeURIComponent(blog.title)}">続きを読む</a>
                    </div>
                `;
                blogListContainer.innerHTML += blogHTML;
            })
            .catch(error => console.error("Error loading blog:", error));
    });

    renderPagination();
}

// ページネーションボタンの生成
function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // ページネーションのクリア

    const totalPages = Math.ceil(blogData.length / blogsPerPage);

    // 最初のボタン
    const firstPageButton = document.createElement("button");
    firstPageButton.innerHTML = "<<";
    firstPageButton.disabled = currentPage === 1;
    firstPageButton.onclick = () => loadBlogList(1);
    paginationContainer.appendChild(firstPageButton);

    // 前のボタン
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => loadBlogList(currentPage - 1);
    paginationContainer.appendChild(prevButton);

    // ページ番号ボタン
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.classList.toggle("active", i === currentPage); // 現在のページを強調表示
        pageButton.onclick = () => loadBlogList(i);
        paginationContainer.appendChild(pageButton);
    }

    // 次のボタン
    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => loadBlogList(currentPage + 1);
    paginationContainer.appendChild(nextButton);

    // 最後のボタン
    const lastPageButton = document.createElement("button");
    lastPageButton.innerHTML = ">>";
    lastPageButton.disabled = currentPage === totalPages;
    lastPageButton.onclick = () => loadBlogList(totalPages);
    paginationContainer.appendChild(lastPageButton);
}



// Markdownファイルを読み込んでHTMLに変換し、指定の要素に挿入する関数
async function loadMarkdown(markdownPath) {
    try {
        //getElementByIdで出力先を指定
    let exportMarkdown = document.getElementById("blog-text");
    fetch(markdownPath, {
        method: "GET",
    }).then(response => response.text())
    .then(text => {
        exportMarkdown.innerHTML = marked.parse(text);
        // Markdownの読み込みが完了した後に共有リンクを生成
        generateShareLinks();
    });
    } catch (error) {
        console.error("Markdownファイルの読み込みに失敗しました:", error);
        document.getElementById("blog-text").innerHTML = "<p>コンテンツを読み込めませんでした。</p>";
    }
}


function generateShareLinks() {
    const blogTitleElement = document.getElementById("blog-title");
    const twitterShareLink = document.getElementById("twitter-share");
    const blueskyShareLink = document.getElementById("bluesky-share");

    if (blogTitleElement && twitterShareLink) {
        // ブログのタイトルを取得
        const blogTitle = encodeURIComponent(blogTitleElement.textContent);
        const currentUrl = encodeURIComponent(window.location.href);

        // Twitterの共有リンク
        if (twitterShareLink) {
            twitterShareLink.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${blogTitle}`;
        }
        // Blueskyの共有リンク
        if (blueskyShareLink) {
            blueskyShareLink.href = `https://bsky.app/intent/compose?text=${blogTitle}%0a${currentUrl}`;
        }

        // href属性を設定
        twitterShareLink.href = twitterUrl;
    }
};
