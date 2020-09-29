# projects-design:
Project of design DesignMatch

# Objetivo:
Desarrollar una solución que permita pasar de una aplicación local a una en la nube.

## Para el correcto funcionamiento se debe:

1. Instalar las variables de entorno que se encuentran en el archivo `terraform/.env` el cual contiene la contraseña de la base de datos.
2. Ejecutar la instalación de terraform para la creación de la infraestructura.
3. Instalar las variables de entorno que se encuentran en el archivo `.venv` modificando las respectivas IP.
4. Instalar las variables de entorno que se encuentran en el archivo `.env`
5. Ejecutar el respectivo sh que se encuentra en la raiz del directorio para que funcione adecuadamente.


## Para la ejecución del front se debe:

1. npm install
2. ng serve --open

# Ejemplos configuración archivos:

## terraform/.env
unset "${!TF_VAR_@}"
export TF_VAR_password=""
export TF_VAR_project_gcp=""
export TF_VAR_credentials_file=""

## .venv
export IP_EXT_FILESERVER=""
export IP_EXT_WORKER=""
export IP_EXT_BACKEND=""
export IP_EXT_FRONTEND=""
export IP_INT_FILESERVER=""
export IP_INT_WORKER=""
export IP_INT_BACKEND=""
export IP_INT_FRONTEND=""
export IP_DATABASE_MDA=""
export IP_DATABASE_MDB=""

## .env

### configuration django-password
export DJANGO_PASSWORD=""

### configuration celery - MDA
export DJANGO_BROKER_URL_MDA=""

### configuration celery - MDB
export DJANGO_BROKER_URL_MDB="redis://$IP_EXT_WORKER:6379/1"
export CELERY_CACHES_LOCATION="redis://$IP_EXT_WORKER:6379/1"
export CELERY_CACHES_PASSWORD=""

### configuration database - MDA
export DB_NAME_MDA=""
export DB_USER_MDA=""
export DB_PASSWORD_MDA=""
export DB_HOST_MDA=""
export DB_PORT_MDA=""

### configuration database - MDB
export DB_NAME_MDB=""
export DB_USER_MDB=""
export DB_PASSWORD_MDB=""
export DB_HOST_MDB=""
export DB_PORT_MDB=""

### configuration sendgrid
export SENDGRID_HOST=""
export SENDGRID_USER=""
export SENDGRID_PASSWORD=""
export SENDGRID_PORT=""

### configuration sendgrid
export SENDGRID_API_KEY=""
