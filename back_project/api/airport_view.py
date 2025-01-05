from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Airport
from .serializer import AirportSerializer
from django.db import connection
import jwt
from django.conf import settings
import requests

@api_view(['GET'])
def get_airports(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

    user_id = get_user_id_from_token(token)
    if not user_id:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

    with connection.cursor() as cursor:
        cursor.execute("SELECT id, name, link, icao, description, visited FROM api_airport WHERE user_id = %s", [user_id])
        rows = cursor.fetchall()

    airports = [
        Airport(id=row[0], name=row[1], link=row[2], icao=row[3], description=row[4], visited=row[5])
        for row in rows
    ]
    serializer = AirportSerializer(airports, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_airport(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

    user_id = get_user_id_from_token(token)
    if not user_id:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

    name = request.data.get('name')
    link = request.data.get('link')
    icao = request.data.get('icao')
    description = request.data.get('description')
    visited = request.data.get('visited', False)

    if not name or not icao:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "INSERT INTO api_airport (name, link, icao, description, visited, user_id) VALUES (%s, %s, %s, %s, %s, %s)",
                [name, link, icao, description, visited, user_id]
            )
            return Response({'message': 'Airport created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['PUT'])
def update_airport(request, airport_id):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

    user_id = get_user_id_from_token(token)
    if not user_id:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

    name = request.data.get('name')
    link = request.data.get('link')
    icao = request.data.get('icao')
    description = request.data.get('description')
    visited = request.data.get('visited')

    if not name or not icao:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "UPDATE api_airport SET name = %s, link = %s, icao = %s, description = %s, visited = %s WHERE id = %s AND user_id = %s",
                [name, link, icao, description, visited, airport_id, user_id]
            )
            if cursor.rowcount == 0:
                return Response({'error': 'Airport not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'message': 'Airport updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['DELETE'])
def delete_airport(request, airport_id):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

    user_id = get_user_id_from_token(token)
    if not user_id:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

    with connection.cursor() as cursor:
        try:
            cursor.execute("DELETE FROM api_airport WHERE id = %s AND user_id = %s", [airport_id, user_id])
            if cursor.rowcount == 0:
                return Response({'error': 'Airport not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'message': 'Airport deleted successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def get_airport_by_icao(request, icao):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

    user_id = get_user_id_from_token(token)
    if not user_id:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

    url = f"https://airport-web.appspot.com/_ah/api/airportsapi/v1/airports/{icao}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return Response(response.json(), status=response.status_code)
    except requests.exceptions.RequestException as e:
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