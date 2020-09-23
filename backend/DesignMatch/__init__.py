from __future__ import absolute_import, unicode_literals
from .celery import app as celery_app
import sys
import os


__all__ = ['celery_app',]

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
