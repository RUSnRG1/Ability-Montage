document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-button");
    const workItems = document.querySelectorAll(".work-item");

    // 初期状態としてすべてのボタンをinactiveにし、特定のボタンをactiveにする
    filterButtons.forEach(button => {
        button.classList.add("active"); // 初期化
    });

    // 初期状態として「すべての項目を表示
    applyFilters(); // 初期フィルタリングを適用

    // ボタンのクリックイベントを設定
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // クリックされたボタンの状態をトグル
            button.classList.toggle("active");

            // フィルタ適用
            applyFilters();
        });
    });

    function applyFilters() {
        // 現在activeのボタンを収集
        const activeFilters = Array.from(filterButtons)
            .filter(button => button.classList.contains("active"))
            .map(button => button.getAttribute("data-filter"));

        workItems.forEach(item => {
            const category = item.getAttribute("data-category");
            // activeなボタンのカテゴリに一致するアイテムを表示
            item.style.display = activeFilters.includes(category) ? "flex" : "none";

            // activeフィルタが空の場合はすべて表示
            if (activeFilters.length === 0) {
                item.style.display = "none";
            }
        });
    }
});
