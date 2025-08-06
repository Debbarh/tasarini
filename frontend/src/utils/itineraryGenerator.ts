
import { TripData, GeneratedItinerary, DayItinerary } from "@/types/itinerary";
import { Sun, Cloud, CloudRain } from "lucide-react";

export const generateSampleItinerary = (data: TripData): GeneratedItinerary => {
  const destinations = data.mode === 'plan' 
    ? (data.countries || ['France'])
    : ['Maroc'];

  const sampleDays: DayItinerary[] = [
    {
      day: 1,
      city: destinations[0] === 'France' ? 'Paris' : 'Marrakech',
      title: destinations[0] === 'France' ? 'Découverte de Paris' : 'Arrivée à Marrakech',
      weather: { icon: Sun, temp: '22°C' },
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      activities: [
        {
          time: "09:00",
          activity: destinations[0] === 'France' ? "Visite de la Tour Eiffel" : "Visite de la Medina",
          type: "culture",
          description: destinations[0] === 'France' ? "Montée au sommet de la Tour Eiffel" : "Exploration des souks traditionnels",
          price: "25€",
          rating: 4.8
        },
        {
          time: "14:00",
          activity: destinations[0] === 'France' ? "Musée du Louvre" : "Palais de la Bahia",
          type: "culture",
          description: destinations[0] === 'France' ? "Visite du plus grand musée du monde" : "Découverte de l'architecture marocaine",
          price: "17€",
          rating: 4.9
        }
      ]
    },
    {
      day: 2,
      city: destinations[0] === 'France' ? 'Paris' : 'Marrakech',
      title: destinations[0] === 'France' ? 'Quartier Montmartre' : 'Jardins de la Koutoubia',
      weather: { icon: Cloud, temp: '19°C' },
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      activities: [
        {
          time: "10:00",
          activity: destinations[0] === 'France' ? "Sacré-Cœur" : "Jardin Majorelle",
          type: "culture",
          description: destinations[0] === 'France' ? "Visite de la basilique" : "Promenade dans les jardins",
          price: "Gratuit",
          rating: 4.7
        }
      ]
    }
  ];

  return {
    title: `Voyage en ${destinations.join(", ")}`,
    destinations,
    duration: "7 jours",
    overview: `Un voyage inoubliable en ${destinations.join(", ")} avec des expériences authentiques.`,
    budget: data.mode === 'plan' ? "Moyen" : "Modéré",
    bestTime: "Printemps",
    highlights: [
      "Sites historiques emblématiques",
      "Gastronomie locale",
      "Culture authentique"
    ],
    weather: { icon: Sun, temp: "22°C", condition: "Ensoleillé" },
    days: sampleDays
  };
};
