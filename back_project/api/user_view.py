from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
import re
import jwt
from django.conf import settings
from datetime import datetime, timedelta, timezone

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT password FROM api_user WHERE email = %s",
            [email]
        )
        row = cursor.fetchone()

    if row is None or row[0] != password:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    token = generate_jwt(email)
    return Response({'token': token}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    if not is_valid_email(email):
        return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "INSERT INTO api_user (email, password) VALUES (%s, %s)",
                [email, password]
            )
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
def get_user_id_from_token(token):
    try:
        SECRET_KEY = settings.SECRET_KEY
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get('email')
        with connection.cursor() as cursor:
            cursor.execute("SELECT id FROM api_user WHERE email = %s", [email])
            row = cursor.fetchone()
            if row:
                return row[0]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    return None

def get_jwt_expiration():
    expiration_hours = getattr(settings, 'JWT_EXPIRATION_HOURS', 1)
    return datetime.now(timezone.utc) + timedelta(hours=expiration_hours)

def generate_jwt(email):
    payload = {
        "email": email,
        "exp": get_jwt_expiration(),
    }
    SECRET_KEY = settings.SECRET_KEY
    
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None