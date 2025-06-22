# Dans api/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser
from .models import Country, Destination, UserItinerary
from .serializers import CountrySerializer, DestinationSerializer, UserItinerarySerializer

class CountryListView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsAdminUser]  # 👈 Seuls les superusers peuvent accéder

class DestinationListView(generics.ListCreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    
    def get_queryset(self):
        queryset = Destination.objects.all()
        activities = self.request.query_params.get('activities', None)
        budget = self.request.query_params.get('budget', None)
        travel_with = self.request.query_params.get('travel_with', None)
        
        if activities:
            # Filtrer par activités
            queryset = queryset.filter(activities__contains=[activities])
        if budget:
            queryset = queryset.filter(budget_level=budget)
        if travel_with:
            queryset = queryset.filter(best_for=travel_with)
            
        return queryset

@api_view(['POST'])
def get_inspiration(request):
    """API pour obtenir des inspirations basées sur les préférences"""
    form_data = request.data
    
    # Logique pour filtrer les destinations selon les préférences
    destinations = Destination.objects.all()
    
    if form_data.get('activities'):
        activities = form_data['activities']
        destinations = destinations.filter(activities__overlap=activities)
    
    if form_data.get('budget'):
        destinations = destinations.filter(budget_level=form_data['budget'])
    
    if form_data.get('travelWith'):
        destinations = destinations.filter(best_for=form_data['travelWith'])
    
    serializer = DestinationSerializer(destinations[:6], many=True)
    return Response(serializer.data)

class ItineraryCreateView(generics.CreateAPIView):
    queryset = UserItinerary.objects.all()
    serializer_class = UserItinerarySerializer

# Create your views here.
