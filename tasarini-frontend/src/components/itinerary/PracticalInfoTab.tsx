
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, Utensils, Star } from "lucide-react";

const PracticalInfoTab = () => {
  // Données d'exemple qui correspondraient à votre modèle Django
  const practicalInfo = {
    visa: "Passeport français valable 6 mois. Visa non requis pour séjours < 90 jours.",
    health: "Aucun vaccin obligatoire. Assurance voyage recommandée.",
    currency: "Dirham marocain (MAD). 1€ ≈ 10.7 MAD",
    language: "Arabe, Berbère, Français largement parlé",
    transport: "Taxis, bus, train. Négocier les prix des taxis.",
    safety: "Destination sûre. Attention aux pickpockets dans les souks.",
    customs: "Pays musulman. Tenue vestimentaire respectueuse recommandée."
  };

  const bestDishes = [
    { name: "Tajine d'agneau aux pruneaux", description: "Plat traditionnel mijoté aux épices", price: "12-18€" },
    { name: "Couscous royal", description: "Vendredi dans les familles berbères", price: "15-25€" },
    { name: "Pastilla au pigeon", description: "Feuilleté sucré-salé authentique", price: "8-15€" },
    { name: "Thé à la menthe", description: "Rituel de l'hospitalité marocaine", price: "2-5€" }
  ];

  const mustSee = [
    { name: "Place Jemaa el-Fna", description: "Cœur battant de Marrakech, spectacles nocturnes" },
    { name: "Mosquée Koutoubia", description: "Minaret emblématique, visible de toute la ville" },
    { name: "Palais Bahia", description: "Architecture mauresque exceptionnelle" },
    { name: "Jardins Majorelle", description: "Oasis de sérénité, ancienne propriété d'Yves Saint Laurent" }
  ];

  const giftIdeas = [
    { item: "Tapis berbère", where: "Souk des tapis, négocier le prix", price: "50-300€" },
    { item: "Huile d'argan bio", where: "Coopératives féminines d'Essaouira", price: "15-30€" },
    { item: "Babouches en cuir", where: "Souk Smarine, quartier des maroquiniers", price: "20-60€" },
    { item: "Épices du souk", where: "Souk des épices, mélange ras el hanout", price: "5-15€" }
  ];

  const similarDestinations = [
    "Fès - Médina classée UNESCO",
    "Istanbul - Croisée des cultures", 
    "Séville - Heritage mauresque",
    "Tunis - Médina authentique"
  ];

  return (
    <div className="space-y-8">
      {/* Header avec raisons de visiter */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            <Star className="w-6 h-6 text-purple-600" />
            Pourquoi choisir Marrakech ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-purple-800 leading-relaxed">
            Marrakech vous séduira par son authenticité préservée, ses souks colorés, 
            son patrimoine architectural exceptionnel et sa gastronomie raffinée. 
            Une destination où tradition et modernité se côtoient harmonieusement.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Culture millénaire", "Gastronomie authentique", "Artisanat local", "Climat ensoleillé"].map(highlight => (
              <Badge key={highlight} className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                {highlight}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Informations essentielles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Info className="w-5 h-5 text-blue-600" />
              Informations Essentielles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Formalités</h4>
                <p className="text-sm text-blue-700">{practicalInfo.visa}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🏥 Santé</h4>
                <p className="text-sm text-green-700">{practicalInfo.health}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💰 Monnaie</h4>
                <p className="text-sm text-yellow-700">{practicalInfo.currency}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🗣️ Langue</h4>
                <p className="text-sm text-purple-700">{practicalInfo.language}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lieux incontournables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="w-5 h-5 text-red-600" />
              Lieux Incontournables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mustSee.map((place, idx) => (
                <div key={idx} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800">{place.name}</h4>
                  <p className="text-sm text-red-700">{place.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gastronomie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Utensils className="w-6 h-6 text-green-600" />
            Meilleurs Plats à Découvrir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {bestDishes.map((dish, idx) => (
              <div key={idx} className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-green-800">{dish.name}</h4>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                    {dish.price}
                  </span>
                </div>
                <p className="text-sm text-green-700">{dish.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Idées cadeaux */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">🎁 Idées Cadeaux Authentiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {giftIdeas.map((gift, idx) => (
                <div key={idx} className="p-4 bg-pink-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-pink-800">{gift.item}</h4>
                    <span className="text-sm text-pink-600">{gift.price}</span>
                  </div>
                  <p className="text-sm text-pink-700">{gift.where}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Destinations similaires */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">🌍 Destinations Similaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {similarDestinations.map((dest, idx) => (
                <div key={idx} className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <span className="text-indigo-800 font-medium">{dest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conseils pratiques */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-xl">💡 Conseils Pratiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-100 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">🚗 Transport</h4>
              <p className="text-sm text-orange-700">{practicalInfo.transport}</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">🛡️ Sécurité</h4>
              <p className="text-sm text-red-700">{practicalInfo.safety}</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🕌 Culture</h4>
              <p className="text-sm text-purple-700">{practicalInfo.customs}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalInfoTab;
