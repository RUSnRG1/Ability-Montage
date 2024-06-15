document.addEventListener('DOMContentLoaded', () => {
    function getForecast() {
        // APIからデータを取得する部分はここに実装されます
        return [1, 2, 3, 4, 5, 6, 2, 1];
    }

    function setImage() {
        const forecast = getForecast();
        const weatherTypes = ['sunny', 'cloudy', 'rain', 'heavy_rain', 'snow', 'fog'];
        let imageIndex = 1;

        // 現在の天気画像の更新
        const currentWeatherImage = document.getElementById('current-weather-image');
        currentWeatherImage.src = `images/${weatherTypes[forecast[0] - 1]}_${imageIndex}.jpg`;

        // 7日間の天気予報画像の更新
        for (let i = 0; i < 7; i++) {
            const forecastElement = document.getElementById(`forecast-${i}`);
            const imgElement = forecastElement.getElementsByTagName('img')[0];
            imgElement.src = `images/${weatherTypes[forecast[i + 1] - 1]}_${imageIndex}.jpg`;
        }

        // 画像の切り替えアニメーション
        setInterval(() => {
            imageIndex = imageIndex === 1 ? 2 : 1;
            currentWeatherImage.src = `images/${weatherTypes[forecast[0] - 1]}_${imageIndex}.jpg`;
            for (let i = 0; i < 7; i++) {
                const forecastElement = document.getElementById(`forecast-${i}`);
                const imgElement = forecastElement.getElementsByTagName('img')[0];
                imgElement.src = `images/${weatherTypes[forecast[i + 1] - 1]}_${imageIndex}.jpg`;
            }
        }, 1000);
    }

    async function fetchForecast() {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo');
            const data = await response.json();
            return parseForecastData(data);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return [1, 2, 3, 4, 5, 6, 2, 1]; // エラーハンドリング用のデフォルトデータ
        }
    }

    function parseForecastData(data) {
        hourly = data
        console.log(hourly)
        return [1, 2, 3, 4, 5, 6, 2, 1];
    }


    //setImage();
    setInterval(fetchForecast, 6*1000);
});
