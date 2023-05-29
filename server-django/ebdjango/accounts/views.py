from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer
from .rekogntion import rekogntion



class MyTokenObtainPairSerializer_Register(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['password'] = user.password
        # ...

        return token


class MyTokenObtainPairView_Register(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer_Register


class MyTokenObtainPairSerializer_Login(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        token['password'] = user.password
        # ...

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
    
class MyTokenObtainPairView_Login(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer_Login


# Register API
class RegisterView(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token_serializer = MyTokenObtainPairSerializer_Register()
    token = token_serializer.get_token(user)
    response = Response()
    response.data={
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        'token': str(token.access_token)
    }
    return response



# Login API
class LoginView(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token_serializer = MyTokenObtainPairSerializer_Login()
    token = token_serializer.get_token(user)
    response = Response()

    
    response.data={
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        'token': str(token.access_token)
    }
    return response
  


class RekoView(generics.GenericAPIView):
    #permission_classes = [permissions.IsAuthenticated,]
    serializer_class = UserSerializer
   
       

    def post(self,request):
        file_uploaded = request.FILES.get('file_uploaded')
        return JsonResponse({"resp:" : rekogntion("IMG_0358.jpeg",file_uploaded)})
  
    

# Get User API
class UserView(generics.RetrieveAPIView):
  #authentication_classes = [JWTAuthentication]
  permission_classes = [permissions.IsAuthenticated,]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
  
class LogoutView(APIView):
    def post(self, request):
        response = JsonResponse({"message": "Logout efetuado com sucesso!"})
        response.delete_cookie('jwt')
        return response
