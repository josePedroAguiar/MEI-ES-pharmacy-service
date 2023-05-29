from django.db import models
#from django.contrib.auth.models import User
import hashlib
from django.db import models

import hashlib
import binascii
import os

class UserManager(models.Manager):
    def create_user(self, username, email, password):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(models.Model):
    class Meta:
        app_label = 'pharmacyapps'
    username = models.CharField(max_length=120, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=120, default='') # new field
    last_login = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_superuser(self):
        return self.is_staff

    @property
    def is_admin(self):
        return self.is_staff
    
    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True

    def set_password(self, raw_password):
        """
        Hashes the given password and sets it as the user's password.
        """
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', raw_password.encode('utf-8'), salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        self.password = (salt + pwdhash).decode('ascii')

    def check_password(self, raw_password):
        """
        Returns True if the given password matches the user's password.
        """
        salt = self.password[:64]
        pwdhash = hashlib.pbkdf2_hmac('sha512', raw_password.encode('utf-8'), salt.encode('ascii'), 100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == self.password[64:]

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email
'''
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    class Meta:
        app_label = 'pharmacyapps'

    username = models.CharField(max_length=120, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=120)
    last_login = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_superuser(self):
        return self.is_staff

    @property
    def is_admin(self):
        return self.is_staff
    
    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True

    def set_password(self, password):
        self.password = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email
    
'''


# Create your models here.
class medicamentos(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100, null=True)
    price = models.FloatField(max_length=100, null=True)
    selectedAmount = models.IntegerField(null=True)
'''
class receitas(models.Model):
    id = models.IntegerField(max_length=100, primary_key=True)
    name_user = models.CharField(max_length=100)
    med = models.ForeignKey(medicamentos, on_delete=models.CASCADE)
    
'''  

# Create your models here.
class Utentes(models.Model):
    username = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=120)
    last_login=models.DateTimeField()   
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True) 

