from django.db import models

# Create your models here.
class User(models.Model):
    class Meta:
        db_table = "User"
        
    userId = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    imageYN = models.BooleanField(default = True)
    commentYN = models.BooleanField(default = True)
    
