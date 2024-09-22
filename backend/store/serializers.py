from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class WarhouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warhouse
        fields = "__all__"

        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']  # Fields required for registration

    def validate(self, data):
        # Check if the username is already taken
        if User.objects.filter(username=data['username']).exists():
            print("Username is already taken!")  # Debug: Username exists
            raise serializers.ValidationError("Username is already taken!")

        # Check if the email is provided
        if data.get("email") is None:
            print("This field is required.")  # Debug: Email is missing
            err = {"email": "This field is required."}
            raise serializers.ValidationError(err)

        # Check if the email is already registered
        if User.objects.filter(email=data['email']).exists():
            print("Email address is already registered")  # Debug: Email exists
            raise serializers.ValidationError("Email address is already registered")

        return data  # Return validated data

    def create(self, validated_data):
        # Create a new user with the validated data
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])# Set and hash the user's password
        user.save()# Save the user to the databas

        return user  # Return the created user