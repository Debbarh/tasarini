import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '@/types/beInspired';
import { activityCategories } from '@/constants/beInspiredData';
import { MapPin, Navigation, Zap, Star, Clock, Euro, Users } from 'lucide-react';

// Configuration des icônes Leaflet
const setupLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface InteractiveMapProps {
  center: [number, number];
  pois: POI[];
  onPOIClick: (poi: POI) => void;
  userLocation: [number, number];
}

// Composant pour contrôler la vue de la carte
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  // Exposer la méthode pour centrer sur un POI
  useEffect(() => {
    if (map) {
      (window as any).centerMapOnPOI = (lat: number, lng: number) => {
        map.setView([lat, lng], 16, {
          animate: true,
          duration: 1
        });
      };
    }
  }, [map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  center, 
  pois, 
  onPOIClick, 
  userLocation 
}) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setupLeafletIcons();
    setMapReady(true);
  }, []);

  // Couleurs par catégorie
  const getCategoryColors = (category: string) => {
    const colors = {
      'culture-history': { bg: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: '#8B5CF6' },
      'adventure-sport': { bg: 'linear-gradient(135deg, #F59E0B, #F97316)', border: '#F59E0B' },
      'relaxation-wellness': { bg: 'linear-gradient(135deg, #10B981, #059669)', border: '#10B981' },
      'gastronomy-flavors': { bg: 'linear-gradient(135deg, #EF4444, #DC2626)', border: '#EF4444' },
      'nightlife-entertainment': { bg: 'linear-gradient(135deg, #EC4899, #BE185D)', border: '#EC4899' },
      'nature-landscapes': { bg: 'linear-gradient(135deg, #22C55E, #16A34A)', border: '#22C55E' },
      'shopping-crafts': { bg: 'linear-gradient(135deg, #3B82F6, #2563EB)', border: '#3B82F6' },
    };
    return colors[category as keyof typeof colors] || colors['culture-history'];
  };

  // Créer des icônes modernes avec couleurs par catégorie
  const createModernPOIIcon = (category: string) => {
    const categoryData = activityCategories.find(cat => cat.id === category);
    const emoji = categoryData?.emoji || '📍';
    const colors = getCategoryColors(category);
    
    return L.divIcon({
      html: `
        <div class="poi-marker-modern" style="position: relative;">
          <div class="poi-marker-content" style="
            position: relative;
            width: 48px;
            height: 48px;
            background: ${colors.bg};
            border: 3px solid white;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 20px ${colors.border}30;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 2;
          ">
            <span style="
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
              transform: scale(1.1);
            ">${emoji}</span>
          </div>
          <div class="poi-marker-pulse" style="
            position: absolute;
            top: 6px;
            left: 6px;
            width: 36px;
            height: 36px;
            background: ${colors.border};
            border-radius: 50%;
            opacity: 0.4;
            animation: poi-pulse 3s infinite;
          "></div>
          <div class="poi-marker-ring" style="
            position: absolute;
            top: 12px;
            left: 12px;
            width: 24px;
            height: 24px;
            border: 2px solid ${colors.border};
            border-radius: 50%;
            opacity: 0.6;
            animation: poi-ring 2s infinite;
          "></div>
        </div>
        <style>
          @keyframes poi-pulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.4; 
            }
            50% { 
              transform: scale(1.5); 
              opacity: 0.1; 
            }
          }
          @keyframes poi-ring {
            0% { 
              transform: scale(1); 
              opacity: 0.6; 
            }
            100% { 
              transform: scale(2); 
              opacity: 0; 
            }
          }
        </style>
      `,
      className: 'custom-poi-marker-enhanced',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24],
    });
  };

  // Icône ultra-moderne pour l'utilisateur
  const createUserIcon = () => {
    return L.divIcon({
      html: `
        <div class="user-marker-modern" style="position: relative;">
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #EF4444, #DC2626);
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4), 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            "></div>
          </div>
          <div style="
            position: absolute;
            top: 4px;
            left: 4px;
            width: 24px;
            height: 24px;
            background: #EF4444;
            border-radius: 50%;
            opacity: 0.4;
            animation: user-wave 2s infinite;
          "></div>
          <div style="
            position: absolute;
            top: 8px;
            left: 8px;
            width: 16px;
            height: 16px;
            background: #EF4444;
            border-radius: 50%;
            opacity: 0.3;
            animation: user-wave 2s infinite 0.5s;
          "></div>
        </div>
        <style>
          @keyframes user-wave {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.4; 
            }
            50% { 
              transform: scale(3); 
              opacity: 0; 
            }
          }
        </style>
      `,
      className: 'user-location-marker-enhanced',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  if (!mapReady) {
    return (
      <div className="h-full w-full bg-neutral-50 rounded-3xl flex items-center justify-center border border-neutral-200/60">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-3 border-neutral-300 border-t-neutral-600 mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-700">Chargement de la carte</h3>
            <p className="text-neutral-500 text-sm">Préparation en cours...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative rounded-3xl overflow-hidden border border-neutral-200/60 shadow-lg bg-neutral-50">
      {/* Header minimaliste */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm border border-neutral-200/60 rounded-xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-neutral-600" />
          <span className="font-medium text-neutral-700 text-sm">Carte Interactive</span>
        </div>
      </div>

      {/* Compteur minimaliste */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm border border-neutral-200/60 rounded-xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
          <span className="font-medium text-neutral-700 text-sm">{pois.length} lieux</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full rounded-3xl"
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
      >
        <MapController center={center} />
        
        {/* Carte avec plus de contraste pour la visibilité */}
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={1.0}
          className="contrasted-base-layer"
        />

        <Marker position={userLocation} icon={createUserIcon()}>
          <Popup closeButton={false} offset={[0, -10]}>
            <div className="bg-gradient-to-br from-background to-muted border border-border/50 rounded-2xl shadow-2xl p-4 min-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-destructive rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-destructive/30 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    📍 Votre position actuelle
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Nous sommes ici, prêts à explorer !
                  </p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createModernPOIIcon(poi.category)}
            eventHandlers={{
              click: () => {
                // Centrer la carte sur le POI cliqué
                if ((window as any).centerMapOnPOI) {
                  (window as any).centerMapOnPOI(poi.latitude, poi.longitude);
                }
                // Appeler aussi la fonction onPOIClick originale
                onPOIClick(poi);
              },
            }}
          >
            <Popup closeButton={false} maxWidth={350} offset={[0, -10]}>
              <div className="bg-gradient-to-br from-background to-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden min-w-[320px]">
                {/* Header avec gradient dynamique */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ 
                    background: getCategoryColors(poi.category).bg,
                  }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl leading-tight">{poi.name}</h3>
                      <span className="text-3xl ml-2">
                        {activityCategories.find(cat => cat.id === poi.category)?.emoji}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{poi.description}</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                </div>
                
                {/* Corps avec informations structurées */}
                <div className="p-6 space-y-4">
                  {/* Statistiques en grille moderne */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-xl border border-yellow-200/50">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-600" fill="currentColor" />
                        <div>
                          <div className="font-bold text-sm text-foreground">{poi.rating}</div>
                          <div className="text-xs text-muted-foreground">({poi.reviews.length} avis)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-xl border border-green-200/50">
                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground capitalize">{poi.budget}</div>
                          <div className="text-xs text-muted-foreground">Budget</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-xl border border-blue-200/50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground capitalize">{poi.duration}</div>
                          <div className="text-xs text-muted-foreground">Durée</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-xl border border-purple-200/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground">{poi.reviews.length}</div>
                          <div className="text-xs text-muted-foreground">Visiteurs</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-xl border border-orange-200/50">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground">
                            {(poi as any).distance ? `${(poi as any).distance}km` : 'Proche'}
                          </div>
                          <div className="text-xs text-muted-foreground">Distance</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action premium */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Centrer la carte sur le POI cliqué
                      if ((window as any).centerMapOnPOI) {
                        (window as any).centerMapOnPOI(poi.latitude, poi.longitude);
                      }
                      onPOIClick(poi);
                    }}
                    className="w-full bg-gradient-to-r from-primary via-primary to-secondary text-white py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Découvrir cette expérience
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Styles CSS avec meilleur contraste */}
      <style>{`
        /* Amélioration du contraste pour la couche de base */}
        .contrasted-base-layer {
          filter: contrast(1.2) saturate(1.1) brightness(0.95) !important;
        }
        
        /* Amélioration générale de la carte pour plus de lisibilité */
        .leaflet-map-pane {
          filter: brightness(0.98) contrast(1.15) saturate(1.05) !important;
        }
        
        /* Effet de profondeur pour les marqueurs */
        .custom-poi-marker-enhanced:hover .poi-marker-content {
          transform: translateY(-4px) scale(1.15) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 30px rgba(59, 130, 246, 0.4) !important;
          filter: brightness(1.1) saturate(1.2) !important;
        }
        
        /* Popups avec effet prismatique */
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 16px !important;
          box-shadow: none !important;
          border: none !important;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25)) !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          font-family: inherit !important;
        }
        
        .leaflet-popup-tip {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
          filter: brightness(1.05) !important;
        }
        
        /* Contrôles de zoom avec effet néon */
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.1) !important;
          border-radius: 16px !important;
          overflow: hidden;
          backdrop-filter: blur(20px) !important;
        }
        
        .leaflet-control-zoom a {
          background: linear-gradient(135deg, hsl(var(--background))/95, hsl(var(--muted))/90) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid hsl(var(--border))/50 !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 0 !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          font-weight: bold !important;
          position: relative !important;
        }
        
        .leaflet-control-zoom a::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(135deg, hsl(var(--primary))/0, hsl(var(--secondary))/0) !important;
          transition: all 0.3s ease !important;
          border-radius: inherit !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary))) !important;
          color: white !important;
          transform: scale(1.05) translateY(-2px) !important;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.3) !important;
          filter: brightness(1.1) saturate(1.2) !important;
        }
        
        .leaflet-control-zoom a:hover::before {
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
        }
        
        .leaflet-control-zoom a:first-child {
          border-top-left-radius: 16px !important;
          border-top-right-radius: 16px !important;
        }
        
        .leaflet-control-zoom a:last-child {
          border-bottom-left-radius: 16px !important;
          border-bottom-right-radius: 16px !important;
        }
        
        .leaflet-control-attribution {
          display: none !important;
        }
        
        /* Effet holographique pour les popups */
        .leaflet-popup {
          margin-bottom: 20px !important;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15)) !important;
        }
        
        /* Animation de scintillement pour les marqueurs */
        .poi-marker-content {
          position: relative !important;
        }
        
        .poi-marker-content::after {
          content: '' !important;
          position: absolute !important;
          top: -2px !important;
          left: -2px !important;
          right: -2px !important;
          bottom: -2px !important;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent) !important;
          border-radius: inherit !important;
          animation: shimmer 3s ease-in-out infinite !important;
          pointer-events: none !important;
        }
        
        @keyframes shimmer {
          0%, 100% { 
            opacity: 0; 
            transform: translateX(-100%); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(100%); 
          }
        }
        
        /* Effet de vagues pour la position utilisateur */
        .user-marker-modern::before {
          content: '' !important;
          position: absolute !important;
          top: -4px !important;
          left: -4px !important;
          right: -4px !important;
          bottom: -4px !important;
          border: 2px solid rgba(239, 68, 68, 0.3) !important;
          border-radius: 50% !important;
          animation: ripple 2s ease-out infinite !important;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        /* Amélioration générale de la carte */
        .leaflet-container {
          filter: contrast(1.05) saturate(1.15) brightness(1.02) !important;
          transition: filter 0.3s ease !important;
        }
        
        .leaflet-container:hover {
          filter: contrast(1.1) saturate(1.2) brightness(1.05) !important;
        }
        
        /* Effet de focus sur les routes importantes */
        .leaflet-overlay-pane svg path[stroke="#FF6B6B"] {
          filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5)) !important;
        }
        
        /* Style des labels de rue plus vibrants */
        .leaflet-overlay-pane .leaflet-marker-pane .leaflet-marker-icon {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;