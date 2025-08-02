
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework import status
import os
from dotenv import load_dotenv

load_dotenv()
client_id = os.getenv("GOOGLE_CLIENT_ID")


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("DATA:", request.data)
        token = request.data.get("credential")
        if not token:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), "514934800422-1oseovnpc6lilb0f90ti2iah4p856d3v.apps.googleusercontent.com")
            email = idinfo.get("email")
            name = idinfo.get("name", "")

            if not email:
                return Response({'error': 'Email not found in token'}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(username=email, defaults={
                "email": email,
                "first_name": name
            })

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        except Exception as e:
            print("GOOGLE VERIFY ERROR:", e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

