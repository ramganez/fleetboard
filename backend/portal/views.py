from datetime import datetime
from django.http import HttpResponse
from django.utils.timezone import make_aware

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status

from portal.models import Provider, Product, Transaction
from portal.serializers import (
    ProviderSerializer,
    ProductSerializer,
    TransactionSerializer,
)
from portal.utils import get_chart_data


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
            
            # to update the response data with chart data 
            updated_data = {'chart_data': get_chart_data(provider)}
            updated_data.update(serializer.data)

            return Response(updated_data)
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
        This view should return a list of all the txns for
        the provider as determined by the merchant_network_id and filter with date range.
        """
        merchant_network_id = self.kwargs["merchant_network_id"]
    
        # filter merchant txn with date range
        if self.request.query_params.get('start'):
            start_date = datetime.strptime(self.request.query_params["start"], "%Y-%m-%d") # #'2022-10-07
            end_date = datetime.strptime(self.request.query_params["end"], "%Y-%m-%d") # #'2022-10-07
            return Transaction.objects.filter(
                provider__merchant_network_id=merchant_network_id
            ).filter(created_at__range=(make_aware(start_date), make_aware(end_date)))

        # return all txn list for the merchant
        return Transaction.objects.filter(
            provider__merchant_network_id=merchant_network_id
        )

class TransactionFlagDetail(APIView):
    """
    View to set flag to the transaction
    """

    def get_object(self, pk):
        provider = Transaction.objects.get(id=pk)
        return provider

    def patch(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
