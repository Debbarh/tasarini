
import React from 'react';

interface Country {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CityProgressProps {
  country: Country;
  isComplete: boolean;
}

const CityProgress = React.memo<CityProgressProps>(({ country, isComplete }) => {
  return (
    <div className="pt-6 border-t border-blue-200">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-semibold text-gray-700">
            Progression: {country.cities.length} ville{country.cities.length > 1 ? 's' : ''} sélectionnée{country.cities.length > 1 ? 's' : ''}
          </span>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-xs font-bold">
            <span>✓</span> Configuration terminée
          </div>
        )}
      </div>
    </div>
  );
});

CityProgress.displayName = 'CityProgress';

export default CityProgress;
