# Generated by Django 5.0.7 on 2024-09-22 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_alter_product_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.TextField(default=''),
        ),
    ]