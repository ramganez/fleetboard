from django.http import HttpResponse
from portal.models import Provider, Product, Transaction
from portal.serializers import ProviderSerializer, ProductSerializer, TransactionSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status


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


class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        This view should return a list of all the products for
        the provider as determined by the merchant_network_id.
        """
        merchant_network_id = self.kwargs["merchant_network_id"]
        return Product.objects.filter(provider__merchant_network_id=merchant_network_id)

    def post(self, request, *args, **kwargs):
        """
        This view will accept new Product and return a list of all the products for
        the provider as determined by the merchant_network_id.
        """
        self.create(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

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
            return HttpResponse("Data not found", status=404)

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

class TransactionList(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        """
        This view should return a list of all the products for
        the provider as determined by the merchant_network_id.
        """
        merchant_network_id = self.kwargs["merchant_network_id"]
        return Transaction.objects.filter(provider__merchant_network_id=merchant_network_id)

