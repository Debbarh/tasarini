# Dans api/management/commands/populate_data.py (créez ces dossiers)
# Créez d'abord : api/management/ et api/management/commands/

from django.core.management.base import BaseCommand
from api.models import Country, Destination

class Command(BaseCommand):
    help = 'Populate database with sample data'
    
    def handle(self, *args, **options):
        # Créer des pays
        countries_data = [
            {'name': 'Maroc', 'code': 'MA', 'continent': 'Africa'},
            {'name': 'Japon', 'code': 'JP', 'continent': 'Asia'},
            {'name': 'Grèce', 'code': 'GR', 'continent': 'Europe'},
            {'name': 'Indonésie', 'code': 'ID', 'continent': 'Asia'},
            {'name': 'Turquie', 'code': 'TR', 'continent': 'Europe/Asia'},
        ]
        
        for country_data in countries_data:
            country, created = Country.objects.get_or_create(**country_data)
            if created:
                self.stdout.write(f'Created country: {country.name}')
        
        # Créer des destinations
        destinations_data = [
            {
                'name': 'Marrakech',
                'country': Country.objects.get(name='Maroc'),
                'description': 'La ville rouge vous séduira par ses souks colorés',
                'image_url': 'https://images.unsplash.com/photo-1539650116574-75c0c6d0b678',
                'activities': ['culture', 'food', 'art'],
                'budget_level': 'medium',
                'best_for': 'couple'
            },
            {
                'name': 'Kyoto',
                'country': Country.objects.get(name='Japon'),
                'description': 'Ancienne capitale impériale aux temples majestueux',
                'image_url': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
                'activities': ['culture', 'nature', 'relax'],
                'budget_level': 'high',
                'best_for': 'solo'
            },
            # Ajoutez d'autres destinations...
        ]
        
        for dest_data in destinations_data:
            destination, created = Destination.objects.get_or_create(**dest_data)
            if created:
                self.stdout.write(f'Created destination: {destination.name}')
