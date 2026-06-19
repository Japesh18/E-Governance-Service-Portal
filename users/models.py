from django.contrib.auth.models import AbstractUser
from django.db import models
class User(AbstractUser):
    ROLE_CHOICES=[("citizen","Citizen"),("officer","Officer"),("admin","Admin")]
    role=models.CharField(max_length=10,choices=ROLE_CHOICES,default="citizen")
    phone=models.CharField(max_length=15,blank=True)
    def __str__(self):
        return f"{self.username} ({self.role})"