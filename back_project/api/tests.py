from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch
import jwt
from django.conf import settings
from datetime import datetime, timedelta, timezone
from .models import User
import requests

class UserViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse('login_user')
        self.create_user_url = reverse('create_user')
        self.user_data = {
            'email': 'test@example.com',
            'password': 'testpassword'
        }
        self.user = User.objects.create(email=self.user_data['email'], password=self.user_data['password'])

    def test_login_user_success(self):
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_user_missing_fields(self):
        response = self.client.post(self.login_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Missing fields')

    def test_login_user_invalid_credentials(self):
        invalid_data = {
            'email': 'test@example.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.login_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Invalid credentials')

    def test_create_user_success(self):
        new_user_data = {
            'email': 'newuser@example.com',
            'password': 'newpassword'
        }
        response = self.client.post(self.create_user_url, new_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User created successfully')

    def test_create_user_missing_fields(self):
        response = self.client.post(self.create_user_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Missing fields')

    def test_create_user_invalid_email(self):
        invalid_email_data = {
            'email': 'invalidemail',
            'password': 'newpassword'
        }
        response = self.client.post(self.create_user_url, invalid_email_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid email format')


class AirportViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.get_airport_url = reverse('get_airport_by_icao', args=['KSFO'])
        self.user_data = {
            'email': 'test@example.com',
            'password': 'testpassword'
        }
        self.user = User.objects.create(email=self.user_data['email'], password=self.user_data['password'])
        self.token = self.generate_jwt(self.user_data['email'])

    def generate_jwt(self, email):
        payload = {
            "email": email,
            "exp": datetime.now(timezone.utc) + timedelta(hours=1),
        }
        SECRET_KEY = settings.SECRET_KEY
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token

    def test_get_airport_by_icao_missing_authorization(self):
        response = self.client.get(self.get_airport_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Authorization header missing')

    def test_get_airport_by_icao_invalid_token(self):
        invalid_token = 'invalidtoken'
        response = self.client.get(self.get_airport_url, HTTP_AUTHORIZATION=f'Bearer {invalid_token}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], 'Invalid or expired token')

    @patch('requests.get')
    def test_get_airport_by_icao_success(self, mock_get):
        mock_response = mock_get.return_value
        mock_response.status_code = 200
        mock_response.json.return_value = {'name': 'San Francisco International Airport', 'icao': 'KSFO'}

        response = self.client.get(self.get_airport_url, HTTP_AUTHORIZATION=f'{self.token}')
        self.assertEqual(response.data['name'], 'San Francisco International Airport')
        self.assertEqual(response.data['icao'], 'KSFO')

    @patch('requests.get')
    def test_get_airport_by_icao_request_exception(self, mock_get):
        mock_get.side_effect = requests.exceptions.RequestException("Error fetching data")

        response = self.client.get(self.get_airport_url, HTTP_AUTHORIZATION=f'{self.token}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)