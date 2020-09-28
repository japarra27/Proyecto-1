import os
import base64
from django.conf import settings
from apirest.models import Project, Design
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'} )
    email = serializers.EmailField(max_length = None, min_length = None, allow_blank = False, validators = [ UniqueValidator( queryset = User.objects.all() )] )

    class Meta:
        model = User
        fields = ('username','email', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, data):
        emails = User.objects.filter(email=data)
        if len(emails) != 0:
            raise serializers.ValidationError("Este correo ya fue usado")
        else:
            return data    

class ProjectSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project = Project.objects.create(**validated_data)
        return project

    class Meta:
        model = Project
        fields = ['id','project_name', 'project_description', 'project_price']

class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = ['id','design_creation_date', 'designer_first_name', 'designer_last_name', 'designer_email', 'design_file', 'design_price', "design_status"]