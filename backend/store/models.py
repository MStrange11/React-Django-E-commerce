from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.CASCADE, related_name='user')

class Product(models.Model):
    order = models.ForeignKey(Order, null=True, blank=True,on_delete=models.CASCADE, related_name='order')
    title = models.CharField(max_length=100)
    price = models.IntegerField()
    rate = models.IntegerField()
    description = models.TextField(default="")
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title
