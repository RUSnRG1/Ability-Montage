import csv
import numpy as np
import os 
from PIL import Image
import math

folder = "/mnt/c/users/mizuc/Desktop/game/Ability-Montage/before_cut_card/";
destfolder = "/mnt/c/users/mizuc/Desktop/game/Ability-Montage/images/";

with open('text.csv', 'rt') as f:
    dict_reader = csv.DictReader(f)
    hoge = [row for row in dict_reader]

text = []
for row in hoge:
    text.append(row["text"])

for i in range(56):
    img = Image.open(folder+str(i)+".png")
    dest = destfolder+str(i)
    if(not os.path.exists(dest)):
        os.mkdir(dest)
    textnum = len(text[i])
    a=160+(6-math.floor((textnum-1)/2))*40
    print(textnum)
    print(a)
    for j in range(textnum):
        b = a+40
        split_pic=img.crop((a,0,b,300))
        split_pic.save(dest+"/"+str(j).zfill(2)+".png")
        a = b



