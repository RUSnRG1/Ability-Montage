import os
from PIL import Image

dir_name = 'img'


for i in range(56):
    dir_name = str(i)
    files = os.listdir(dir_name)
    for file in files:
        img = Image.open(os.path.join(dir_name, file)) 
        img_resize = img.resize((300 * img.width // img.height, 300))
        img_resize.save(os.path.join(dir_name, file))