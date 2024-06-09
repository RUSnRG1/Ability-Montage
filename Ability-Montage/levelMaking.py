import csv
import numpy as np
import os 
import math


def makeTextList(csvfile):
    with open(csvfile, 'rt') as f:
        dict_reader = csv.DictReader(f)
        hoge = [row for row in dict_reader]
        text = []
        for row in hoge:
            text.append(row["text"])
    
    return text 

def makeVocList(csvfile):
    list_B=[]
    with open(csvfile, 'r') as f:   # 列を取得
        for row in csv.reader(f):
            list_B.append(row[0]) # B列を取得

    return list_B


def countEachLetter(text,letter):
    for t in text:
        for j in range(len(t)):
            if(t[j:j+1] in letter):
                letter[t[j:j+1]] = int(letter[t[j:j+1]]) + 1
            else:
                letter[t[j:j+1]] = 1

def checkLevel(letter,word):
    count = 0;
    for i in range(len(word)):
        ss = word[i:i+1]
        if(ss not in letter):
            print("letter %s is none!"%ss)
            return
        else:
            if(int(letter[ss])==1):
                count=count+3
            elif(int(letter[ss])<=0):
                print("Error! zero value!")
                return
            elif(int(letter[ss])<5):
                count=count+1

    
    return count

def checkVoc(voc,letter):
    data = []
    for s in voc:
        count = 0;
        for i in range(len(s)):
            ss = s[i:i+1]
            if(ss in letter):
                count += 1;
            if(count == len(s)):
                data.append(s)

    print("level is: %i"%count)
    return data

letter = {}
text = makeTextList("text.csv")
voc = makeVocList("voc.csv")


countEachLetter(text,letter)
print(letter)
flag = True
while flag:
    print("文字列を入力(endと打つと終了します)")
    word = input(">>")
    if(word=="end"):
        flag=False
    count = checkLevel(letter,word)
    print(count)
    
#data = checkVoc(voc,letter)
#print(data)