import numpy as np
import requests
import pandas as pd
from datetime import datetime, timedelta

def get_data():
    url = "https://api.open-meteo.com/v1/forecast"
    params = {'latitude': 35.6895, 'longitude': 139.6917, "hourly": ["temperature_2m","precipitation","cloud_cover"],"timezone":"Asia/Tokyo","models": "jma_seamless","forecast_days":8}

    response = requests.get(url,params = params)
    data = response.json()
    return data


def analize_data(data):
    time = data['hourly']['time']
    #now = datetime.now().replace(hour=7,minute=0,second=0,microsecond=0)
    now = datetime.now().replace(minute=0,second=0,microsecond=0)
    
    # 現在時刻を表示
    now_str = now.strftime('%Y-%m-%dT%H:00')

    # 最初の10時を求める
    next_10_am = now.replace(hour=10)
    if now.hour >= 10:
        next_10_am += timedelta(days=1)
    next_str = next_10_am.strftime('%Y-%m-%dT%H:00')
        
    index = []
    try:
        index.append(time.index(now_str))
        index.append(time.index(next_str))
        for i in range(6):
            index.append(index[-1]+24)
    except ValueError:
        print("Not Found")
        
    create_data(data,index)
    

def create_data(data,index):
    time = data['hourly']['time']
    temperature = data['hourly']['temperature_2m']
    rain = data['hourly']['precipitation']
    cloud = data['hourly']['cloud_cover']
    print(index)
    print(len(time))
    time_8 = [time[x] for x in index]
    temperature_8 = [temperature[x] for x in index]
    rain_8 = [rain[x] for x in index]
    cloud_8 = [cloud[x] for x in index]
    
    
    image_num = []
    
    for i in range(8):
        #条件は
        #1.小雨＝3mm以下の時
        #2. 雨＝3mm以上の時
        #3. 雨は降っていないけど曇が90%以上の時、曇り
        #4.それ以外の時、晴
        #5.小雨かつ7月7日の時、霧
        #0,1,2,3,4がそれぞれはれ、曇り、小雨、雨、霧
        if(rain_8[i]>0):
            if(rain_8[i]>3):
                image_num.append(3)
            elif("-07-07" in time_8[i]):
                image_num.append(4)
            else:
                image_num.append(2)
        elif(cloud_8[i]>89):
            image_num.append(1)
        else:
            image_num.append(0)
        
    
    df = pd.DataFrame({
        'time': time_8,
        'temperature': temperature_8,
        'rain': rain_8,
        'cloud': cloud_8,
        'image_num': image_num
    })
    df.to_json('output.json')
        
    
    
    
def main():
    data = get_data()
    
    analize_data(data)
    
if __name__ == "__main__":
    main()


