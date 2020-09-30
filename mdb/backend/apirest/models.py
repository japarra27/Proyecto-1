# Create your models here.

from __future__ import absolute_import, unicode_literals
from django.contrib.auth.models import AbstractUser, User
from django.db import models
import os
import uuid


# class project
class Project(models.Model):
    project_name = models.CharField(max_length=50, verbose_name = "Nombre del Evento")
    project_description = models.CharField(max_length=250, verbose_name = "Descripción del Proyecto  ")
    project_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name = "Valor a Pagar")
    project_company = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name = "Empresa del Proyecto")

    def __str__(self):
        return self.project_name


# class design
class Design(models.Model):
    def path_and_rename(instance, filename):
        upload_to = "/mnt/fileserver/designs_library/processing"
        ext = filename.split('.')[-1]
        if instance.pk:
            filename = '{}'.format(instance.pk)
        return os.path.join(upload_to, filename[:-4] + "-" + str(uuid.uuid4()) + "." + ext)

    design_creation_date = models.DateTimeField(auto_now_add=True)
    designer_first_name = models.CharField(max_length=50, verbose_name = "Nombre Diseñador")
    designer_last_name = models.CharField(max_length=50, verbose_name = "Apellido Diseñador")
    designer_email = models.EmailField(max_length = 100, verbose_name = "Email")
    design_file = models.FileField(upload_to = path_and_rename, null = True, verbose_name = "Diseño", unique=True)
    design_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name = "Valor Solicitado")
    design_project = models.ForeignKey(Project, on_delete=models.CASCADE)
    design_status = models.CharField(max_length=15, choices = [("PROCESSING", "Processing"), ("CONVERTED", "Converted")], default = "PROCESSING")

    def __str__(self):
        return self.designer_first_name
