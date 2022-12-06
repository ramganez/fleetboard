from django.urls import path
from portal import views

urlpatterns = [
    path('provider/<str:merchant_network_id>/', views.ProviderDetail.as_view()),
    path('products/<str:merchant_network_id>/', views.ProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path('transactions/<str:merchant_network_id>/', views.TransactionList.as_view()),
    path("transaction-flag/<int:pk>/", views.TransactionFlagDetail.as_view()),  
]