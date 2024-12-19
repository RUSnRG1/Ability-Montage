document.addEventListener("DOMContentLoaded", () => {
    const cosplayContainer = document.querySelector('.Cosplay');
    const csvFilePath = '/Cosplay/metadata.csv'; // CSVファイルのパス

    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvText => {
        // CSVデータを配列に変換
        const rows = csvText.trim().split('\n').slice(1); // 1行目（ヘッダー）を除去
        const imageData = rows.map(row => {
          const [filename, title] = row.split(',');
          return { filename, title };
        });

        // データを降順に並び替え
        imageData.reverse();

        // 画像要素を生成して挿入
        imageData.forEach(({ filename, title }) => {
          const imgElement = `
            <a href="/Cosplay/image/hp-${filename}.jpg" data-lightbox="cosimage" data-title="${title}">
              <img src="/Cosplay/tumbnail_img/hpt-${filename}.jpg" alt="${title}">
            </a>
          `;
          cosplayContainer.innerHTML += imgElement;
        });
      })
      .catch(error => console.error('CSV読み込みエラー:', error));
  });

