from django.db import models
from django.contrib.auth.models import User






# Create your models here.
class medicamentos(models.Model):
    name = models.CharField(max_length=100)
    type = models.BigIntegerField(max_length=100)
    user = models.ForeignKey(User, related_name="medicamentos", on_delete=models.CASCADE, null=True)
'''
class receitas(models.Model):
    id = models.IntegerField(max_length=100, primary_key=True)
    name_user = models.CharField(max_length=100)
    med = models.ForeignKey(medicamentos, on_delete=models.CASCADE)
    
    

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=120)
    password = models.CharField(max_length=120)
    last_login=models.DateTimeField()    
    '''
