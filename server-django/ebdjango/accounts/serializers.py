from rest_framework import serializers
from django.contrib.auth.models import User
#from .models import User


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