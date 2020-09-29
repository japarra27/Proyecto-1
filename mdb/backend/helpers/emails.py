import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

TEMPLATE_ID = 'd-8067cc3354b54074839ec5ed1d84903f'

# Configuration file to send emails
def sendEmail(designer_email, designer_name):
    
    text = '''
     Estimado {},
     Cordialmente le informamos que el archivo
     ya se encuentra disponible.
     
     Feliz día.'''.format(designer_name)

    message = Mail(
    from_email=os.getenv('FROM_EMAIL'),
    to_emails=designer_email,
    subject='Carga del Diseño disponible',
    plain_text_content=text
    )

    message.template_id = TEMPLATE_ID

    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
    return str(response.status_code)