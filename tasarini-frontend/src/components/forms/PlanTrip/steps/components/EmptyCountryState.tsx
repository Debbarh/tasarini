
import React from 'react';
import { Globe } from 'lucide-react';

const EmptyCountryState = React.memo(() => {
  return (
    <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
        <Globe className="w-8 h-8 text-white" />
      </div>
      <h4 className="text-xl font-semibold text-gray-600 mb-2">
        Aucun pays sélectionné
      </h4>
      <p className="text-gray-500">
        Choisissez un pays à gauche pour commencer la configuration
      </p>
    </div>
  );
});

EmptyCountryState.displayName = 'EmptyCountryState';

export default EmptyCountryState;
