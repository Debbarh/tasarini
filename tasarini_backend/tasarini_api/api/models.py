# Dans api/models.py

from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3, unique=True)
    continent = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Destination(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    description = models.TextField()
    image_url = models.URLField()
    activities = models.JSONField(default=list)  # ["culture", "adventure", etc.]
    budget_level = models.CharField(max_length=20)  # "budget", "mid-range", "luxury"
    best_for = models.CharField(max_length=50)  # "solo", "couple", "family", etc.
    
    def __str__(self):
        return f"{self.name}, {self.country.name}"

class UserItinerary(models.Model):
    title = models.CharField(max_length=200)
    destinations = models.JSONField(default=list)
    activities = models.JSONField(default=list)
    budget = models.CharField(max_length=20)
    travel_with = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
