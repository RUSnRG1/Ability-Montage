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

    /**
     * 現在の時刻をISO 8601形式で取得する関数
     * @returns {String} - 現在の時刻（ISO 8601形式）
     */
    function getCurrentTimeISO() {
        return new Date().toISOString();
    }

    /**
     * 現在時刻が09:59までならその日の10時、10:00以降なら次の日の10時の時刻を取得し、
     * さらに次の日の10時を7日先までのISO 8601形式の文字表記を取得する関数
     * @returns {Array} - 7日先までの各日の10時のISO 8601形式の時刻の配列
     */
    function getNextSevenDaysTenAM() {
        const currentDate = new Date();
        let hours = currentDate.getHours();
        let targetDate;

        if (hours < 10) {
            // 今日の10時の時刻を取得
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0, 0);
        } else {
            // 次の日の10時の時刻を取得
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 10, 0, 0);
        }

        const targetTimes = [];
        for (let i = 0; i < 7; i++) {
            targetTimes.push(targetDate.toISOString());
            // 次の日の10時を取得
            targetDate.setDate(targetDate.getDate() + 1);
        }
        
        return targetTimes;
    }

    function parseForecastData(data) {
        //必要なのは、現在時刻から必要な時刻の字を計算するコード
        const times = data.hourly.time;
        const temperatures = data.hourly.temperature_2m;
        const temperatureData = [];
        let targetTimes;
        const currentDate = new Date();
        //let hours = currentDate.getHours();
        let targetDate;
        const diff = currentDate.getTimezoneOffset() * 60 * 1000;
        const plusLocal = new Date(currentDate - diff);
        
        if (currentDate.getHours() < 10) {
            // 今日の10時の時刻を取得
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0);
        } else {
            // 次の日の10時の時刻を取得
            targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 19, 0, 0);
        }
        console.log(targetDate)
        
        for(let i=0;i<8;++i){
            if(i==0){
                targetTimes = plusLocal.toISOString();
            }
            else{
                targetTimes = targetDate.toISOString();
                targetDate.setDate(targetDate.getDate() + 1);
            }
            targetTimes = targetTimes.slice(0,14) + "00";
            console.log(targetTimes)
            let index = times.findIndex(time => time === targetTimes);
            temperatureData.push(temperatures[index]);

        }
        
        console.log(temperatureData)
        return [1, 2, 3, 4, 5, 6, 2, 1];
    }


    //setImage();
    setInterval(fetchForecast, 6*1000);
});
