import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, X, ArrowLeft } from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import FilterPanel from './components/FilterPanel';
import POIDetailModal from './components/POIDetailModal';
import { FilterOptions, POI } from '@/types/beInspired';
import { samplePOIs } from '@/constants/beInspiredData';

interface LocalExplorerProps {
  onBack: () => void;
}

const LocalExplorer = ({ onBack }: LocalExplorerProps) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([48.8566, 2.3522]);
  const [filters, setFilters] = useState<FilterOptions>({
    activities: [],
    travelerSegment: { type: 'solo' },
    budget: null,
    duration: null,
    proximity: 50,
    accommodationType: []
  });
  const [filteredPOIs, setFilteredPOIs] = useState<POI[]>(samplePOIs);

  useEffect(() => {
    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        console.log('Géolocalisation timeout - utilisation de Paris par défaut');
      }, 2000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          clearTimeout(timeoutId);
          console.log('Géolocalisation refusée - utilisation de Paris par défaut:', error);
        },
        { timeout: 2000 }
      );
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10;
  };

  useEffect(() => {
    let filtered = samplePOIs.map(poi => ({
      ...poi,
      distance: calculateDistance(userLocation[0], userLocation[1], poi.latitude, poi.longitude)
    }));

    if (filters.activities.length > 0) {
      filtered = filtered.filter(poi => 
        filters.activities.includes(poi.category)
      );
    }

    if (filters.travelerSegment.type) {
      filtered = filtered.filter(poi => 
        poi.travelerSegment.includes(filters.travelerSegment.type)
      );
    }

    filtered.sort((a, b) => a.distance - b.distance);
    setFilteredPOIs(filtered);
  }, [filters, userLocation]);

  const handlePOIClick = (poi: POI) => {
    setSelectedPOI(poi);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-8 h-8 text-blue-600" />
                Explorer Local
              </h1>
              <p className="text-gray-600 mt-1">
                Découvrez des expériences uniques près de vous
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            {showFilters ? 'Fermer' : 'Filtres'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredPOIs.length}</div>
            <div className="text-sm text-gray-600">Expériences trouvées</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(userLocation[0] * 1000) / 1000}°N
            </div>
            <div className="text-sm text-gray-600">Votre position</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {filteredPOIs.length > 0 ? `${Math.round(filteredPOIs[0].distance * 10) / 10}km` : '-'}
            </div>
            <div className="text-sm text-gray-600">Plus proche</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <Card className="h-[600px] overflow-hidden">
              <InteractiveMap
                center={userLocation}
                pois={filteredPOIs}
                onPOIClick={handlePOIClick}
                userLocation={userLocation}
              />
            </Card>
          </div>
        </div>

        {selectedPOI && (
          <POIDetailModal
            poi={selectedPOI}
            onClose={() => setSelectedPOI(null)}
            onSave={(poi) => {
              console.log('POI sauvegardé:', poi);
            }}
            onAddToTrip={(poi) => {
              console.log('POI ajouté au voyage:', poi);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LocalExplorer;