# Generated by Django 4.1.2 on 2022-12-06 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0003_alter_product_product_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-id']},
        ),
        migrations.AddField(
            model_name='transaction',
            name='flag',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.DeleteModel(
            name='Flag',
        ),
    ]
