# Generated by Django 4.1.2 on 2022-12-06 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0002_alter_product_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_image',
            field=models.URLField(null=True),
        ),
    ]
