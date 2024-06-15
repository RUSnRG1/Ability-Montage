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

    setImage();
});
