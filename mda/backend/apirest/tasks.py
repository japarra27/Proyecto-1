from __future__ import absolute_import, unicode_literals
from celery import shared_task
from time import sleep
from os import system, scandir, environ
import os
from shutil import move
from PIL import Image, ImageDraw, ImageFont
import datetime
from django.core.mail import send_mail
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import sendgrid


# Define send email
FROM_EMAIL = 'apikey'
TEMPLATE_ID = 'd-8067cc3354b54074839ec5ed1d84903f'

# Function to send emails

sg = sendgrid.SendGridAPIClient("your apikey")
message = sendgrid.Mail()

def SendDynamic():
    TO_EMAILS = [design.designer_email, settings.EMAIL_HOST_USER]
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=TO_EMAILS)

    # pass custom values for our HTML placeholders
    message.dynamic_template_data = {
        'subject': 'Carga del Diseño',
    }
    message.template_id = TEMPLATE_ID
    try:
        sg = SendGridAPIClient(settings.EMAIL_HOST_PASSWORD)
        response = sg.send(message)
        code, body, headers = response.status_code, response.body, response.headers
        print(f"Response code: {code}")
        print(f"Response headers: {headers}")
        print(f"Response body: {body}")
        print("Dynamic Messages Sent!")
    except Exception as e:
        print("Error: {0}".format(e))
    return str(response.status_code)

# Function to convert images
def name_image(original_image, author, im_height=800, im_width=600):
    converted_path_image = 'fileserver/designs_library/converted'
    source_path_image = 'fileserver/designs_library/source/'
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

    move(original_image, source_path_image + image_name)
    print('OK movida')
    
    # save the edited image
    print(image_name)
    return image.save(converted_path_image + f'/{image_name}', format="PNG")

@shared_task
def conversion_design():
    from .models import Design
    processing_path_image = 'fileserver/designs_library/processing'
    files = [obj.name for obj in scandir(processing_path_image) if obj.is_file()]

    try:

        if len( files ) > 0:
            for file in files:
                print (file.split('.'))
                print (file)
                print (processing_path_image)
                print (processing_path_image + '/' + file )
                design = Design.objects.get( design_file = processing_path_image + '/' + file )
                print(design)
                name_image(processing_path_image + "/" + file, design.designer_first_name)
                print('Conversión completada')
                design.design_status = 'CONVERTED'
                design.save()
                print ('Funcionó')
                subject = "Carga del Diseño"
                message = "El diseño ya ha sido publicado en la página pública del administrador."
                from_email = "andres930802@gmail.com"
                to_list = [design.designer_email]
                send_mail(subject, message, from_email, to_list, fail_silently=True)
                print ("\n *** Diseño: {} Convertido! ***\n".format(file))
                print(response.status_code)
            response = "Diseños Convertidos!"

        else:
            response = "No hay diseños para convertir!"

        return response

    except:
        pass
