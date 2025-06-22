# Dans api/urls.py (créez ce fichier)

from django.urls import path
from . import views
from . import views, auth_views

urlpatterns = [
    path('countries/', views.CountryListView.as_view(), name='countries'),
    path('destinations/', views.DestinationListView.as_view(), name='destinations'),
    path('inspiration/', views.get_inspiration, name='inspiration'),
    path('itinerary/', views.ItineraryCreateView.as_view(), name='create-itinerary'),
    path('auth/register/', auth_views.register, name='register'),
    path('auth/login/', auth_views.login, name='login'),
    path('auth/logout/', auth_views.logout, name='logout'),
]
