from PIL import Image
import math

back = Image.open("images/Loading.jpg").quantize()
ufo = Image.open("images/UFO.png").quantize()
images = []
(width, height) = (ufo.width // 2, ufo.height // 2)

for i in range(0,360,2):
    back_im = back.copy()
    if(i<180):
        rota = 45-i/2
    else:
        rota = -135+i/2
    ufo_im = ufo.copy().rotate(rota)
    x=465+100*math.cos((math.radians(i)))
    y=450+100*math.sin((math.radians(i)))
    ix=x-width
    iy=y-height
    back_im.paste(ufo_im,(int(ix),int(iy)))
    images.append(back_im)
    
images[0].save('images/pillow_imagedraw.gif',
               save_all=True, append_images=images[1:], optimize=False, duration=20, loop=0)
    
