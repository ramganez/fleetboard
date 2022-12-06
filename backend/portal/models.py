from django.db import models
from portal.config import *

class Provider(models.Model):
    """Service providers info
    """
    merchant_network_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    website_url = models.URLField()
    description = models.CharField(max_length=300)
    logo = models.ImageField(null=True)
    metro_area = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    setup_instructions = models.URLField()
    provider_support = models.URLField()
    merchant_category = models.CharField(max_length=100)

class Product(models.Model):
    """Products info
    """
    name = models.CharField(max_length=100)
    mode_type = models.CharField(max_length=50, choices=PRODUCT_MODETYPE)
    pricing_type = models.CharField(max_length=50, choices=PRODUCT_PRICING_TYPE)
    pricing_unit = models.CharField(max_length=50, choices=PRODUCT_PRICING_UNIT)
    pricing_amount = models.DecimalField(max_digits=10, decimal_places=2)
    product_image = models.URLField(null=True)
    product_description = models.CharField(max_length=500)
    metro_area = models.CharField(max_length=100)
    transaction_name = models.CharField(max_length=100)
    discount_amount = models.IntegerField(null=True)
    discount_description = models.CharField(max_length=300)
    provider = models.ForeignKey('Provider', related_name='products', on_delete=models.CASCADE)

    class Meta:
        unique_together = ['name', 'transaction_name']
        ordering = ['-id']

class Transaction(models.Model):
    """ Transation details
    """
    created_at = models.DateTimeField(auto_now=False, auto_now_add=False)
    status = models.CharField(max_length=50, choices=PRODUCT_PRICING_TYPE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.IntegerField(null=True)
    product = models.ForeignKey('Product', related_name='transactions', on_delete=models.CASCADE)
    provider = models.ForeignKey('Provider', on_delete=models.CASCADE)
    flag = models.CharField(max_length=200, null=True)

    class Meta:
        ordering = ['created_at']