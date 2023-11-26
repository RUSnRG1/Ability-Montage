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
    if(textnum%2==0):
        a=107+(8-textnum/2)*40
    else:
        a=127+(8-(textnum+1)/2)*40
    
    for j in range(textnum):
        b = a+40
        split_pic=img.crop((a,0,b,300))
        split_pic.save(dest+"/"+str(j).zfill(2)+".png")
        a = b



