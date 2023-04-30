from django.shortcuts import render,redirect ,get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import login as l,logout as lo,authenticate
from django.utils  import   timezone
from django.contrib.auth.decorators import login_required


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
        user=authenticate(request,username=request.POST['username'],password=request.POST['password'])
        if user is None:
            return render(request, 'login.html', {'form': AuthenticationForm(),'error':'Username and password did not match'})
        else:
            l(request,user)
            return redirect('currentToDo')

                           
@login_required 
def logout(request):
    if request.method=='POST':
        lo(request)
        return redirect('home')
# Create your views here.
