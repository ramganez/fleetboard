# Generated by Django 4.1.2 on 2022-12-07 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0006_alter_product_mode_type_alter_product_pricing_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='flag',
            field=models.CharField(default=0, max_length=200, null=True),
        ),
    ]
