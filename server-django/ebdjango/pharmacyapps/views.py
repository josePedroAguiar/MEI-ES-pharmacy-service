'''
from django.shortcuts import render,redirect ,get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.db import IntegrityError
from django.contrib.auth import login as l,logout as lo,authenticate
from django.utils  import   timezone
from django.contrib.auth.decorators import login_required
from .models import User
from datetime import datetime, timedelta
import jwt
from django.http import JsonResponse
from functools import wraps
from django.core.cache import cache


SECRET_KEY= "secretkey"

def token_required(f):
    @wraps(f)
    def decorated(request, *args, **kwargs):
        token = None
        if 'access-token' in request.headers:
            token = request.headers['access-token'] 
                   # Check if token is in the blacklist
        if not token:
            return JsonResponse({'message': 'Token is missing!'})
        if cache.get('access-token' + token):
            return JsonResponse({'message': 'Token has been revoked!'})
        try:
            data = jwt.decode(
                token, SECRET_KEY, algorithms="HS256")
            username = data["public_id"]
            current_user = username
        except:
            return JsonResponse({'message': 'Token is invalid!'})

        return f(request, current_user, *args, **kwargs)

    return decorated


def home(request):
    return render(request, 'home.html')


def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html', {'form': UserCreationForm()})
    else:
        if request.POST["password1"] == request.POST["password2"]:
            try:
                user = User.objects.create_user(request.POST['username'], password=request.POST["password1"], )
                user.save()
                l(request,user)
                return redirect('home')
            except IntegrityError:
                return render(request, 'signup.html', {'form': UserCreationForm(),"error": 'Username already taken: Please Chose a different username '})

        else:
            return render(request, 'signup.html', {'form': UserCreationForm(),"error": 'Passwords did not match'})


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html', {'form': AuthenticationForm()})
    else:
        user = User.objects.filter(username=request.POST['username'],password=request.POST['password']).first()
        if user is None:
            return render(request, 'login.html', {'form': AuthenticationForm(),'error':'Username and password did not match'})
        else:
            user.last_login=datetime.now()
            user.save()
            token = jwt.encode({'public_id': user.username, 'exp': datetime.utcnow() + timedelta(minutes=30)}, SECRET_KEY, algorithm="HS256")
            return JsonResponse({'token': token})

@token_required                       
def logout(request,current_user):
    if request.method=='GET':
       token = request.META.get('HTTP_ACCESS_TOKEN')
       if token:
            cache.set("access-token" + token, True, timeout=None)
    return JsonResponse({'message': 'Logged out successfully!'})
# Create your views here.
'''
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from pharmacyapps.models import medicamentos
from .serializers import MedSerializer

class MedView(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MedSerializer

    def get_queryset(self):
        return self.request.user.medicamentos.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# Create your views here.
