from django.shortcuts import render

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status

from .serializers import *

from django.utils import timezone


class ConfirmOrder(APIView):
    # Require token authentication
    authentication_classes = [TokenAuthentication]
    # Only authenticated users can access
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        try:
            # Check if the request has an order ID
            order_data = data.get('order')
            if not order_data:
                return Response({"error": "Order data is missing."}, status=status.HTTP_400_BAD_REQUEST)

            # Expecting order ID to be provided for updating
            order_id = order_data.get('id')
            if order_id:
                # If the order ID is provided, try to fetch the existing order
                try:
                    order = Order.objects.get(id=order_id, user=user)
                except Order.DoesNotExist:
                    return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
            else:
                # If no order ID is provided, create a new order
                order = Order.objects.create(
                    user=user,
                    netTotal=order_data.get('netTotal'),
                    date=timezone.now().date()  # Set the current date for new orders
                )

            # If the order exists or was created, update its netTotal
            if not order_id:
                order.netTotal = order_data.get('netTotal', order.netTotal)
                order.save()

            # Clear existing products related to this order (if updating)
            if order_id:
                Product.objects.filter(order=order).delete()

            # Process the product data
            product_data_list = data.get('products')
            if not product_data_list:
                return Response({"error": "Product data is missing."}, status=status.HTTP_400_BAD_REQUEST)

            # Create new products for this order
            for product_data in product_data_list:
                Product.objects.create(
                    order=order,
                    title=product_data.get('title'),
                    price=product_data.get('price'),
                    rate=product_data.get('rate'),
                    # Default to empty string if 'des' is missing
                    description=product_data.get('des', ''),
                    category=product_data.get('category')
                )

            # Prepare response with updated order and associated products
            response_data = {
                "order": OrderSerializer(order).data,
                "products": ProductSerializer(Product.objects.filter(order=order), many=True).data
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderView(APIView):
    # Require token authentication
    authentication_classes = [TokenAuthentication]
    # Only authenticated users can access
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            # Fetch all orders for the authenticated user
            orders = Order.objects.filter(user=user)
            if not orders.exists():
                return Response({"error": "No order found for the provided user."}, status=status.HTTP_404_NOT_FOUND)

            # Serialize the orders
            orders_serializer = OrderSerializer(orders, many=True)

            response_data = []
            # For each serialized order, fetch the related products and serialize them
            for order in orders_serializer.data:
                # Fetch products related to the current order
                products = Product.objects.filter(order__id=order["id"])
                # Serialize the products
                products_serializer = ProductSerializer(products, many=True)
                # Append the serialized order and its products to the response data
                response_data.append({**order, "products": products_serializer.data})

            # Return the serialized data with a 200 OK status
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    def get(self, request):
        try:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            # Return the profile data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        data = request.data  # Get the data from the request
        # Initialize serializer with input data
        serializer = LoginSerializer(data=data)

        if serializer.is_valid():
            # Authenticate user with provided username and password
            user = authenticate(
                username=serializer.data['username'], password=serializer.data['password'])
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": str(token)}, status=status.HTTP_202_ACCEPTED)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serial = RegisterSerializer(data=data)

        # Check if the serialized data is valid
        if not serial.is_valid():
            return Response({"error": serial.errors}, status=status.HTTP_400_BAD_REQUEST)

        # Save the new user data if valid
        serial.save()
        # Create a copy of the serialized data for the response
        response_data = serial.data.copy()
        # Remove the password from the response if present
        response_data.pop('password', None)
        # Return success response with the registered user data (minus password)
        return Response({"status": "Success", "data": response_data}, status=status.HTTP_201_CREATED)
