from django.urls import path
from .airport_view import get_airports, create_airport, update_airport, delete_airport, get_airport_by_icao
from .user_view import create_user, login_user

urlpatterns = [
    path('register/', create_user, name='create_user'),
    path('login/', login_user, name='login_user'),
    path('airports/', get_airports, name='get_airports'),
    path('airports/create/', create_airport, name='create_airport'),
    path('airports/update/', update_airport, name='create_or_update_airport'),
    path('airports/<int:airport_id>/update/', update_airport, name='update_airport'),
    path('airports/<int:airport_id>/delete/', delete_airport, name='delete_airport'),
    path('airports/<str:icao>/', get_airport_by_icao, name='get_airport_by_icao')
]

