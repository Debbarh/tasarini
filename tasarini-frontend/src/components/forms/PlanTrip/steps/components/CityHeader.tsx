
import React from 'react';
import { X } from 'lucide-react';

interface CityHeaderProps {
  countryName: string;
  onRemoveCountry: () => void;
}

const CityHeader = React.memo<CityHeaderProps>(({ countryName, onRemoveCountry }) => {
  return (
    <div className="flex justify-between items-center pb-6 border-b border-blue-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
          {countryName.charAt(0)}
        </div>
        <div>
          <h5 className="text-2xl font-bold text-gray-900">
            {countryName}
          </h5>
          <p className="text-gray-600">Configuration des villes et dates</p>
        </div>
      </div>
      <button
        onClick={onRemoveCountry}
        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
});

CityHeader.displayName = 'CityHeader';

export default CityHeader;
