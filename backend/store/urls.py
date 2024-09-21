from django.urls import path
from .views import *

urlpatterns = [
    path('confirm-order/',ConfirmOrder.as_view()),
    path('orders/',OrderView.as_view()),
    path('products/',ProductView.as_view()),
    path('login/',LoginView.as_view()),
    path('register/',RegisterView.as_view()),
]