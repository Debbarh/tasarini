
import React from 'react';
import { Globe } from 'lucide-react';

const DestinationHeader = React.memo(() => {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <Globe className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-4">
        Planifiez votre voyage multi-destinations
      </h3>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Sélectionnez vos pays, configurez vos villes et définissez vos dates de voyage pour créer 
        l'itinéraire parfait qui correspond à vos envies d'aventure.
      </p>
    </div>
  );
});

DestinationHeader.displayName = 'DestinationHeader';

export default DestinationHeader;
