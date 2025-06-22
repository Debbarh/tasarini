
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccommodationsTab = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🏨 Hébergements recommandés
        </h3>
        <p className="text-purple-700/80">Des lieux d'exception pour votre séjour</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              🏨 Riad La Maison Arabe
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-purple-700 mb-4 font-medium">Riad de luxe au cœur de la médina de Marrakech</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-purple-600">📍</span>
                <span className="text-purple-800 font-medium">Médina, Marrakech</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-blue-600">⭐</span>
                <span className="text-blue-800 font-medium">4.8/5 (240 avis)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-pink-600">💰</span>
                <span className="text-pink-800 font-medium">180-250€/nuit</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-pink-500 text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              🏨 Four Seasons Casablanca
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-blue-700 mb-4 font-medium">Hôtel moderne avec vue sur l'océan Atlantique</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-blue-600">📍</span>
                <span className="text-blue-800 font-medium">Corniche, Casablanca</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-purple-600">⭐</span>
                <span className="text-purple-800 font-medium">4.9/5 (310 avis)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                <span className="text-pink-600">💰</span>
                <span className="text-pink-800 font-medium">280-350€/nuit</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccommodationsTab;
