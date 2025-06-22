# Dans api/serializers.py

from rest_framework import serializers
from .models import Country, Destination, UserItinerary

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class DestinationSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)
    
    class Meta:
        model = Destination
        fields = '__all__'

class UserItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserItinerary
        fields = '__all__'
