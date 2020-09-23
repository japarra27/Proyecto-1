from __future__ import absolute_import, unicode_literals
from celery import shared_task
from time import sleep
from os import system, scandir, environ
from shutil import move
from PIL import Image, ImageDraw, ImageFont
import datetime
from django.core.mail import send_mail
from django.conf import settings

def name_image(original_image, author, im_height=800, im_width=600):
    processing_path_videos = '../fileserver/designs_library/processing'
    converted_path_videos = '../fileserver/designs_library/converted'
    source_path_video = '../fileserver/designs_library/source/'
    image = Image.open(original_image)
    image = image.resize((im_height, im_width))
    image_name = original_image.split("/")[-1]
    print(image_name)
    print(original_image)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype('Roboto-Bold.ttf', size=16)
    designer_name = author
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    # starting position of the message
    (x, y) = (int(image.size[0]*0.35), int(image.size[1]*0.95))
    message = f"{designer_name} - {date}"
    color = 'rgb(255, 255, 255)'
   
    # draw the message on the background
    draw.text((x, y), message, fill=color, font=font)

    move(original_image, source_path_video + image_name)
    print('OK movida')
    
    # save the edited image
    print(image_name)
    return image.save(converted_path_videos + f'/{image_name}', format="PNG")

@shared_task
def conversion_design():
    from .models import Design
    processing_path_videos = '../fileserver/designs_library/processing'
    converted_path_videos = '../fileserver/designs_library/converted'
    source_path_video = '../fileserver/designs_library/source'
    files = [obj.name for obj in scandir(processing_path_videos) if obj.is_file()]

    try:

        if len( files ) > 0:
            for file in files:
                print (file.split('.'))
                print (file)
                print (processing_path_videos)
                print (processing_path_videos + '/' + file )
                design = Design.objects.get( design_file = processing_path_videos + '/' + file )
                print(design)
                name_image(f'../fileserver/designs_library/processing/{file}', design.designer_first_name)
                print('Conversión completada')
                design.design_status = 'CONVERTED'
                design.save()
                print ('Funcionó')
                # Envia Correo
                subject = "Carga del Diseño"
                message = "El diseño ya ha sido publicado en la página pública del administrador."
                from_email = settings.EMAIL_HOST_USER
                to_list = [design.designer_email, settings.EMAIL_HOST_USER]
                send_mail(subject, message, from_email, to_list, fail_silently=True)
                print ("\n *** Diseño: {} Convertido! ***\n".format(file))
            response = "Diseños Convertidos!"

        else:
            response = "No hay diseños para convertir!"

        return response

    except:
        pass
