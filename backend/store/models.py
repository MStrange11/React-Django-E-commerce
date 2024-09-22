from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.CASCADE, related_name='user')
    date = models.DateField()
    netTotal = models.IntegerField()

    def __str__(self):
        return f"{self.user.username}_{self.date}"

class Product(models.Model):
    order = models.ForeignKey(Order, null=True, blank=True,on_delete=models.CASCADE, related_name='order')
    title = models.CharField(max_length=500)
    image = models.TextField(default="")
    price = models.IntegerField()
    qty = models.IntegerField()
    description = models.TextField(default="")
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title
