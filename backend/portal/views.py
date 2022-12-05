from django.http import HttpResponse
from portal.models import Provider, Product
from portal.serializers import ProviderSerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class ProviderDetail(APIView):
    """
        ProviderDetails view to get and update the provider details
    """

    def get_object(self, merchant_network_id):
        provider = Provider.objects.get(merchant_network_id=merchant_network_id)
        return provider

    def get(self, request, merchant_network_id, format=None):
        try:
            provider = self.get_object(merchant_network_id)
            serializer = ProviderSerializer(provider)
            return Response(serializer.data)
        except Provider.DoesNotExist:
            return HttpResponse(status=404)

    def patch(self, request, merchant_network_id, format=None):
        provider = self.get_object(merchant_network_id)
        serializer = ProviderSerializer(provider, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductList(APIView):
    """
        Product view to list and create the products
    """
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetail(APIView):
    """
        ProductDetails view to get, update and delete the product details
    """
    def get_object(self, pk):
        product = Product.objects.get(pk=pk)
        return product

    def get(self, request, pk, format=None):
        try:
            product = self.get_object(pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return HttpResponse('Data not found', status=404)

    def patch(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
