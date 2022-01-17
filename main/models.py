from email.policy import default
from pyexpat import model
from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from bcrypt import hashpw, gensalt

class MyUserManager(BaseUserManager):
    def create_user(self, userName, email, password, userImage='user.jpg'):
        if not email:
            raise ValueError('email is required')

        if not userName:
            raise ValueError('user name is required')

        if not password:
            raise ValueError('password is required')

        user=self.model(
            userName=userName,
            email=self.normalize_email(email),
            userImage=userImage
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userName, email, password, userImage='user.jpg'):
        user = self.create_user(userName=userName, email=email, userImage=userImage, password=password)
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)

        return user


class Account(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    userName = models.CharField(verbose_name='User Name', max_length=30, unique=False)
    email = models.EmailField(verbose_name='Email Address', max_length=100, unique=True)
    userImage = models.CharField(verbose_name='User Image', default='user.jpg', max_length=200)
    extra_data = models.JSONField(default=dict)
    password = models.CharField(verbose_name='Password', max_length=100)
    date_joined = models.DateTimeField(verbose_name='Date Joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['userName', 'password']

    objects=MyUserManager()

    def __str__(self):
        return self.userName

class Lesson(models.Model):
    title = models.CharField(max_length=200, null=False)
    content = models.TextField(null=False)
    url = models.CharField(max_length=200, null=False)
    source = models.CharField(default='youtube', max_length=400, null=False)

    def __str__(self):
        return self.title

    def __repr__(self):
        return f'{self.__class__.__name__}("{self.title}", "{self.source}")'

class Post(models.Model):
    title = models.CharField(max_length=200, null=False)
    image = models.CharField(max_length=200, blank=True)
    datePosted = models.DateTimeField(default=datetime.utcnow, null=False)
    description = models.CharField(max_length=300, null=False)
    content = models.TextField(null=False, max_length=15000)
    author = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name='posts')

    def __str__(self):
        return self.title
        
    def __repr__(self):
        return f'{self.__class__.__name__}("{self.title}", "{self.description}", "{self.datePosted}")'

class Tool(models.Model):
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=200, null=False)
    readme = models.TextField(max_length=10000, null=False)
    author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='tools')
    github = models.CharField(max_length=200, null=False)

    def __str__(self):
        return self.title

    def __repr__(self):
        return f'{self.__class__.__name__}("{self.title}", "{self.github}", "{self.author}")'

class Ehi(models.Model):
    name = models.CharField(max_length=100)
    data = models.BinaryField()
    dateUploaded = models.DateTimeField(default=datetime.utcnow, null=False)

    def __str__(self):
        return self.name

class TechNews(models.Model):
    date = models.DateTimeField(default=datetime.utcnow, null=False)
    source = models.CharField(null=False, max_length=100)
    data = models.TextField(null=False)

    def __str__(self):
        return self.source

    def __repr__(self):
        return f'{self.__class__.__name__}("{self.source}", "{self.data}")'
