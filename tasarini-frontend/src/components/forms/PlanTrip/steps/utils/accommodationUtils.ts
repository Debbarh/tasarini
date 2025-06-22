
export const getCategoryColorClasses = (color: string, isActive: boolean) => {
  const colorMap = {
    purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
    pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100',
    red: isActive ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
  };
  return colorMap[color as keyof typeof colorMap] || 'bg-gray-100';
};

export const filterAccommodationsBySearch = (accommodations: any[], searchTerm: string) => {
  if (!searchTerm) return accommodations;
  return accommodations.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterPreferencesBySearch = (preferences: any[], searchTerm: string) => {
  if (!searchTerm) return preferences;
  return preferences.filter(pref => 
    pref.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const groupPreferencesByCategory = (filteredPreferences: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  filteredPreferences.forEach(pref => {
    if (!grouped[pref.category]) {
      grouped[pref.category] = [];
    }
    grouped[pref.category].push(pref);
  });
  return grouped;
};
