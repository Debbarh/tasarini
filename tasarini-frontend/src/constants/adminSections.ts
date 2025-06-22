
import { Globe, MapPin, Users, Calendar, Hotel, FileText } from 'lucide-react';

export const adminSections = [
  { id: 'countries', label: 'Pays', icon: Globe, count: 45, description: 'Gestion des pays et destinations' },
  { id: 'cities', label: 'Villes', icon: MapPin, count: 127, description: 'Villes et informations locales' },
  { id: 'preferences', label: 'Préférences', icon: Users, count: 89, description: 'Préférences utilisateurs' },
  { id: 'programs', label: 'Programmes', icon: Calendar, count: 34, description: 'Itinéraires générés' },
  { id: 'tours', label: 'Tours', icon: Hotel, count: 23, description: 'Circuits et packages' },
  { id: 'pages', label: 'Pages Web', icon: FileText, count: 12, description: 'Contenu CMS' }
];
