from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'full_name']  # Remove 'username', not present in your model

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user
