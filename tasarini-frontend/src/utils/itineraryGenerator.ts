import { TripData, GeneratedItinerary, Activity, BookingOption } from "@/types/itinerary";
import { Sun } from "lucide-react";

import { AffiliateService } from "@/services/affiliateService";

export const generateSampleItinerary = (data: TripData): GeneratedItinerary => {
  const sampleActivities: Activity[] = [
    {
      time: "09:00",
      activity: "Visite de la Médina de Marrakech",
      type: "Culture",
      description: "Exploration des souks traditionnels et de la place Jemaa el-Fna",
      price: "25€",
      rating: 4.7,
      affiliate: {
        ...AffiliateService.generateSampleAffiliateData(),
        affiliateId: 'viator_medina_001',
        bookingUrl: 'https://www.viator.com/tours/Marrakech/medina-tour',
        originalPrice: 35,
        discountedPrice: 25,
        providerName: 'Viator'
      },
      bookingOptions: {
        restaurant: [
          {
            id: 'rest_001',
            title: 'Restaurant Nomad - Terrasse avec vue',
            price: 45,
            provider: 'OpenTable',
            rating: 4.5,
            features: ['Vue panoramique', 'Cuisine moderne', 'Terrasse'],
            bookingUrl: 'https://opentable.com/nomad-marrakech',
            affiliate: {
              ...AffiliateService.generateSampleAffiliateData(),
              affiliateId: 'opentable_nomad_001',
              providerName: 'OpenTable',
              originalPrice: 45
            }
          }
        ],
        transport: [
          {
            id: 'trans_001',
            title: 'Transfert privé depuis l\'hôtel',
            price: 15,
            provider: 'Local Partner',
            rating: 4.8,
            features: ['Véhicule climatisé', 'Chauffeur local', 'Prise en charge hôtel'],
            bookingUrl: 'https://partner.com/transfer',
            affiliate: {
              ...AffiliateService.generateSampleAffiliateData(),
              affiliateId: 'transfer_001',
              providerName: 'TransferDirect',
              originalPrice: 15
            }
          }
        ]
      }
    },
    {
      time: "14:30",
      activity: "Cours de cuisine marocaine",
      type: "Gastronomie",
      description: "Apprenez à préparer un tajine authentique avec une famille berbère",
      price: "85€",
      rating: 4.9,
      affiliate: {
        ...AffiliateService.generateSampleAffiliateData(),
        affiliateId: 'getyourguide_cooking_001',
        bookingUrl: 'https://www.getyourguide.com/marrakech/cooking-class',
        originalPrice: 95,
        discountedPrice: 85,
        providerName: 'GetYourGuide',
        rating: 4.9,
        reviews: 156,
        commission: 12.0
      }
    },
  ];
  
  return {
    title: "Escapade Magique au Maroc",
    destinations: ["Marrakech", "Casablanca"],
    duration: "7 jours / 6 nuits",
    overview: "Un voyage enchanteur au cœur du Maroc, entre traditions millénaires et modernité. Découvrez les trésors de Marrakech et l'élégance de Casablanca dans une aventure inoubliable.",
    reasoning: data.mode === 'inspire' ? "Destination parfaite pour découvrir la richesse culturelle du Maghreb, avec un excellent rapport qualité-prix et des expériences authentiques selon vos préférences." : undefined,
    budget: "1200-1800€ par personne",
    bestTime: "Mars à Mai, Septembre à Novembre",
    highlights: [
      "🕌 Visite guidée de la médina de Marrakech",
      "🍽️ Cours de cuisine marocaine authentique",
      "🏨 Nuit dans un riad traditionnel",
      "🚗 Excursion dans l'Atlas marocain"
    ],
    weather: { icon: Sun, temp: "24°C", condition: "Ensoleillé" },
    days: [
      {
        day: 1,
        city: "Marrakech",
        title: "Arrivée et découverte de la médina",
        weather: { icon: Sun, temp: "26°C" },
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80",
        activities: sampleActivities
      }
    ]
  };
};
