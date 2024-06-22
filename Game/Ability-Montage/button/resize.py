import os
from PIL import Image

dir_name = 'img'



dir_name = "/mnt/c/Users/mizuc/Desktop/game/Ability-Montage/button"
files = os.listdir(dir_name)
for file in files:
    img = Image.open(os.path.join(dir_name, file)) 
    img_resize = img.resize((64, 80))
    img_resize.save(os.path.join(dir_name, file))