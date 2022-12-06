from rest_framework import serializers
from portal.models import Provider, Product, Transaction, Flag
from portal.config import *


class ProviderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = Provider
        fields = "__all__"

    def get_type(self, obj):
        return 'PROFILE'

class ProductSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_type(self, obj):
        return 'PRODUCT'
