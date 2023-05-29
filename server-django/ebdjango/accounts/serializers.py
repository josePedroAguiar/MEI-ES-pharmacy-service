from rest_framework import serializers

#from django.contrib.auth.models import User
from pharmacyapps.models import User
from rest_framework.serializers import Serializer, FileField

# Serializers define the API representation.
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']

#from .models import User

'''
# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')


def create_user(username, email, password):
    user = User(username=username, email=email)
    user.set_password(password)
    user.save()
    return user

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']

        user = create_user(username, email, password)

        return user
    #user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    #return user
  
def authenticate_user(username, password):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return None

    if user.check_password(password):
        return user
    else:
        return None

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate_user(username, password)

        if user is None:
            raise serializers.ValidationError("Incorrect Credentials")

        if not user.is_active:
            raise serializers.ValidationError("User is inactive.")

        return user
'''
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'last_login', 'is_staff', 'is_active')
        
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def validate_email(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise serializers.ValidationError('Email address is not valid')
        return email

    def create(self, validated_data):
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if email is not None:
            instance.email = email
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Incorrect Credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect Credentials")

        if not user.is_active:
            raise serializers.ValidationError("User is inactive.")

        return user