# import libraries
import os
import sendgrid
from sendgrid.helpers.mail import *

TEMPLATE_ID = 'd-8067cc3354b54074839ec5ed1d84903f'


# Configuration file to send emails
def sendEmail(designer_email, designer_name):
    text = '''Estimado {},
    Cordialmente le informamos que el archivo 
    ya se encuentra disponible.
    Feliz día.'''.format(designer_name)

 #   message.template_id = TEMPLATE_ID

    sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
    from_email = Email(os.getenv(FROM_EMAIL))
    to_email = To(designer_email)
    subject = "Nuevo diseño recibido."
    content = Content("text/plain", text)
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print(response.status_code)
    print(response.body)
    print(response.headers)