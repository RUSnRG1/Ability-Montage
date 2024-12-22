import pandas as pd
from icecream import ic
import os

def insert_csv(df, from_num, to_num):
    # 行番号を取得
    from_row = df.index[df['filename'] == from_num]
    to_row = df.index[df['filename'] == to_num]
    if from_row.empty or to_row.empty:
        print(f"Error:入力値が範囲外です")
        return 0

    # num列だけのデータフレーム df_A
    df_A = df[['filename']]
    #ic(df_A)

    # num以外の列だけのデータフレーム df_B
    df_B = df.drop(columns=['filename'])
    #ic(df_B)
    #shift
    if not from_row.empty and not to_row.empty:
        from_row = from_row[0]
        to_row = to_row[0]

        # 行を移動
        row_to_move = df_B.iloc[from_row]
        df_B = df_B.drop(from_row).reset_index(drop=True)
        df_B = pd.concat([df_B.iloc[:to_row], pd.DataFrame([row_to_move]), df_B.iloc[to_row:]]).reset_index(drop=True)
    df_out = pd.concat([df_A,df_B],axis=1)
    return df_out

def change_filename(from_num, to_num):
    # 処理としては、fのファイルをtemp.pngとかにする
    # f-1から順にtまで、一つずつ後ろにずらしていく
    # tまで出来たら、temp.pngをhp-t.pngにする
    # 後ろに持っていく場合は？
    # fをtempに、f-1から一つずつ前に、、ｔまで来たらtempをtにする

    
    if(from_num > to_num):#　後ろのものを前に持ってくるとき
        os.rename(f"image/hp-{from_num}.jpg","image/temp.jpg")
        os.rename(f"tumbnail_img/hpt-{from_num}.jpg","tumbnail_img/temp.jpg")
        for i in range(from_num-1,to_num-1,-1):
            os.rename(f"image/hp-{i}.jpg",f"image/hp-{i+1}.jpg")
            os.rename(f"tumbnail_img/hpt-{i}.jpg",f"tumbnail_img/hpt-{i+1}.jpg")
        os.rename("image/temp.jpg",f"image/hp-{to_num}.jpg")
        os.rename("tumbnail_img/temp.jpg",f"tumbnail_img/hpt-{to_num}.jpg")

    elif(from_num<to_num):
        os.rename(f"image/hp-{from_num}.jpg","image/temp.jpg")
        os.rename(f"tumbnail_img/hpt-{from_num}.jpg","tumbnail_img/temp.jpg")
        for i in range(from_num+1,to_num+1):
            os.rename(f"tumbnail_img/hpt-{i}.jpg",f"tumbnail_img/hpt-{i-1}.jpg")
            os.rename(f"image/hp-{i}.jpg",f"image/hp-{i-1}.jpg")
        os.rename("image/temp.jpg",f"image/hp-{to_num}.jpg")
        os.rename("tumbnail_img/temp.jpg",f"tumbnail_img/hpt-{to_num}.jpg")

    else:
        print("input same value")

    return




def main():
    # CSVファイルを読み込む
    input_csv = 'metadata.csv'
    df = pd.read_csv(input_csv)

    print("Cosplayの写真の順番を入れ替えるコードです")
    while(1):
        print("修了する場合はqを、続行する場合はそれ以外を入力してください")
        if(input()=="q"):
            break
        else:
        # 各操作を実行
            print("input from_num")
            from_num = int(input())
            print("input to_num")
            to_num = int(input())

            if(from_num==to_num):
                print("cant input same values")
                break
            df = insert_csv(df, from_num, to_num)
            change_filename(from_num,to_num)
            print(f"{from_num}番の写真を{to_num}番にしました")

    
    # 結果をCSVファイルに保存
    df.to_csv(input_csv, index=False)
    print("終了します")

    return 0
    
if __name__ == "__main__":
    main()