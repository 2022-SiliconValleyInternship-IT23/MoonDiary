from django.db import models

# Create your models here.
class User(models.Model):
    userId = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=10)
    
class Meta:
    db_table = "User"
