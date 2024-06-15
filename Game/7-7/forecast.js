const fs = require('fs');
const fetch = require('node-fetch');

// APIから天気予報データを取得し、ファイルに保存する関数
async function fetchForecast() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo');
        const data = await response.json();
        const forecastData = parseForecastData(data);

        // ファイルに保存
        fs.writeFileSync('forecastData.json', JSON.stringify(forecastData), 'utf8');
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// APIから取得したデータをパースする関数（必要に応じて実装）
function parseForecastData(data) {
    // APIのデータ形式に応じてパース処理を実装
    // ここでは仮にパースしたデータを返す例を示します
    return [1, 2, 3, 4, 5, 6, 2, 1];
}

// 一定時間ごとにfetchForecastを実行
setInterval(fetchForecast, 60 * 60 * 1000); // 1時間ごとに実行
fetchForecast();