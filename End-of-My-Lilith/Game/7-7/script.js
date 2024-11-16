//import data from './output.json'  assert {type:json};

let timeArray = [];
let temperatureArray = [];
let rainArray = [];
let cloudArray = [];
let imageArray = [];
let dataInitialized = false;


window.onload = function() {
    const data = fetch("./output.json")
        .then((response) => {
          return response.json();
        });
    
    timeArray = data.time;
    temperatureArray = data.temperature;
    rainArray = data.rain;
    cloudArray = data.cloud;
    imageArray = data.image_num;

    console.log(imageArray)
    // データ初期化完了フラグを立てる
    dataInitialized = true;

    // DOMContentLoadedが既に発火している場合を考慮
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initializeDOMContent();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");

    
    // 初期化が完了していない場合、待機
    if (!dataInitialized) {
        return;
    }

    initializeDOMContent();
});

function initializeDOMContent() {
    function setImage() {
        const forecast = imageArray;
        const weatherTypes = ['sunny', 'cloudy', 'rain', 'heavy_rain','fog'];
        let imageIndex = 1;

        // 現在の天気画像の更新
        const currentWeatherImage = document.getElementById('current-weather-image');
        currentWeatherImage.src = `images/${weatherTypes[forecast[0]]}_${imageIndex}.png`;
        console.log(`images/${weatherTypes[forecast[0]]}_${imageIndex}.png`);

        // 7日間の天気予報画像の更新
        for (let i = 0; i < 7; i++) {
            const forecastElement = document.getElementById(`forecast-${i}`);
            const imgElement = forecastElement.getElementsByTagName('img')[0];
            imgElement.src = `images/${weatherTypes[forecast[i + 1]]}_${imageIndex}.png`;
        }

        // 画像の切り替えアニメーション
        setInterval(() => {
            imageIndex = imageIndex === 1 ? 2 : 1;
            currentWeatherImage.src = `images/${weatherTypes[forecast[0]]}_${imageIndex}.png`;
            for (let i = 0; i < 7; i++) {
                const forecastElement = document.getElementById(`forecast-${i}`);
                const imgElement = forecastElement.getElementsByTagName('img')[0];
                imgElement.src = `images/${weatherTypes[forecast[i + 1]]}_${imageIndex}.png`;
            }
        }, 1000);
    }

    setImage();
    // setInterval(fetchForecast, 6 * 1000);
}