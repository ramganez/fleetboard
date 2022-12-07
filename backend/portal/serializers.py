from rest_framework import serializers

from portal.models import Provider, Product, Transaction
from portal.config import *


class ProviderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = Provider
        fields = "__all__"

    def get_type(self, obj):
        return "PROFILE"


class ProductSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_type(self, obj):
        return "PRODUCT"


class TransactionSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name")
    created_at = serializers.DateTimeField(
        format="%d-%m-%Y %H:%M:%S", required=False, read_only=True
    )

    class Meta:
        model = Transaction
        fields = "__all__"
