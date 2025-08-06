
export interface Country {
  id: string;
  name: string;
  code: string;
  flagCode: string;
  region: string;
  cities?: string[];
}

export const countriesData: Country[] = [
  // Europe
  {
    id: '1',
    name: 'France',
    code: 'FR',
    flagCode: '🇫🇷',
    region: 'Europe',
    cities: ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux', 'Strasbourg', 'Toulouse', 'Nantes']
  },
  {
    id: '2',
    name: 'Espagne',
    code: 'ES',
    flagCode: '🇪🇸',
    region: 'Europe',
    cities: ['Madrid', 'Barcelone', 'Séville', 'Valence', 'Bilbao', 'Saragosse', 'Málaga', 'Grenade']
  },
  {
    id: '3',
    name: 'Italie',
    code: 'IT',
    flagCode: '🇮🇹',
    region: 'Europe',
    cities: ['Rome', 'Milan', 'Florence', 'Venise', 'Naples', 'Turin', 'Bologne', 'Palerme']
  },
  {
    id: '4',
    name: 'Allemagne',
    code: 'DE',
    flagCode: '🇩🇪',
    region: 'Europe',
    cities: ['Berlin', 'Munich', 'Hambourg', 'Cologne', 'Francfort', 'Stuttgart', 'Düsseldorf', 'Dresde']
  },
  {
    id: '5',
    name: 'Royaume-Uni',
    code: 'GB',
    flagCode: '🇬🇧',
    region: 'Europe',
    cities: ['Londres', 'Manchester', 'Liverpool', 'Edinburgh', 'Belfast', 'Cardiff', 'Birmingham', 'Glasgow']
  },
  {
    id: '6',
    name: 'Portugal',
    code: 'PT',
    flagCode: '🇵🇹',
    region: 'Europe',
    cities: ['Lisbonne', 'Porto', 'Faro', 'Braga', 'Coimbra', 'Aveiro', 'Funchal', 'Évora']
  },
  {
    id: '7',
    name: 'Grèce',
    code: 'GR',
    flagCode: '🇬🇷',
    region: 'Europe',
    cities: ['Athènes', 'Thessalonique', 'Santorin', 'Mykonos', 'Rhodes', 'Crète', 'Patras', 'Héraklion']
  },
  {
    id: '8',
    name: 'Pays-Bas',
    code: 'NL',
    flagCode: '🇳🇱',
    region: 'Europe',
    cities: ['Amsterdam', 'Rotterdam', 'La Haye', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningue', 'Almere']
  },
  {
    id: '9',
    name: 'Belgique',
    code: 'BE',
    flagCode: '🇧🇪',
    region: 'Europe',
    cities: ['Bruxelles', 'Anvers', 'Gand', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Louvain']
  },
  {
    id: '10',
    name: 'Suisse',
    code: 'CH',
    flagCode: '🇨🇭',
    region: 'Europe',
    cities: ['Zurich', 'Genève', 'Bâle', 'Berne', 'Lausanne', 'Winterthur', 'Lucerne', 'Saint-Gall']
  },
  {
    id: '11',
    name: 'Autriche',
    code: 'AT',
    flagCode: '🇦🇹',
    region: 'Europe',
    cities: ['Vienne', 'Salzbourg', 'Innsbruck', 'Graz', 'Linz', 'Hallstatt', 'Melk', 'Kitzbühel']
  },
  {
    id: '12',
    name: 'République tchèque',
    code: 'CZ',
    flagCode: '🇨🇿',
    region: 'Europe',
    cities: ['Prague', 'Brno', 'Ostrava', 'Plzen', 'Liberec', 'Olomouc', 'České Budějovice', 'Hradec Králové']
  },
  {
    id: '13',
    name: 'Pologne',
    code: 'PL',
    flagCode: '🇵🇱',
    region: 'Europe',
    cities: ['Varsovie', 'Cracovie', 'Gdansk', 'Wrocław', 'Poznań', 'Łódź', 'Zakopane', 'Toruń']
  },
  {
    id: '14',
    name: 'Hongrie',
    code: 'HU',
    flagCode: '🇭🇺',
    region: 'Europe',
    cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét']
  },
  {
    id: '15',
    name: 'Croatie',
    code: 'HR',
    flagCode: '🇭🇷',
    region: 'Europe',
    cities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Pula', 'Slavonski Brod', 'Karlovac']
  },
  {
    id: '16',
    name: 'Norvège',
    code: 'NO',
    flagCode: '🇳🇴',
    region: 'Europe',
    cities: ['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes']
  },
  {
    id: '17',
    name: 'Suède',
    code: 'SE',
    flagCode: '🇸🇪',
    region: 'Europe',
    cities: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg']
  },
  {
    id: '18',
    name: 'Danemark',
    code: 'DK',
    flagCode: '🇩🇰',
    region: 'Europe',
    cities: ['Copenhague', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens']
  },
  {
    id: '19',
    name: 'Finlande',
    code: 'FI',
    flagCode: '🇫🇮',
    region: 'Europe',
    cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti']
  },
  {
    id: '20',
    name: 'Islande',
    code: 'IS',
    flagCode: '🇮🇸',
    region: 'Europe',
    cities: ['Reykjavik', 'Kópavogur', 'Hafnarfjörður', 'Akureyri', 'Reykjanesbær', 'Garðabær', 'Mosfellsbær', 'Árborg']
  },

  // Afrique du Nord
  {
    id: '21',
    name: 'Maroc',
    code: 'MA',
    flagCode: '🇲🇦',
    region: 'Afrique',
    cities: ['Marrakech', 'Casablanca', 'Fès', 'Rabat', 'Agadir', 'Tanger', 'Meknès', 'Ouarzazate']
  },
  {
    id: '22',
    name: 'Tunisie',
    code: 'TN',
    flagCode: '🇹🇳',
    region: 'Afrique',
    cities: ['Tunis', 'Sousse', 'Sfax', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Gafsa']
  },
  {
    id: '23',
    name: 'Égypte',
    code: 'EG',
    flagCode: '🇪🇬',
    region: 'Afrique',
    cities: ['Le Caire', 'Alexandrie', 'Louxor', 'Assouan', 'Hurghada', 'Sharm el-Sheikh', 'Gizeh', 'Port-Saïd']
  },
  {
    id: '24',
    name: 'Algérie',
    code: 'DZ',
    flagCode: '🇩🇿',
    region: 'Afrique',
    cities: ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif']
  },
  {
    id: '25',
    name: 'Afrique du Sud',
    code: 'ZA',
    flagCode: '🇿🇦',
    region: 'Afrique',
    cities: ['Le Cap', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Nelspruit']
  },
  {
    id: '26',
    name: 'Kenya',
    code: 'KE',
    flagCode: '🇰🇪',
    region: 'Afrique',
    cities: ['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu', 'Thika', 'Malindi', 'Kitale']
  },
  {
    id: '27',
    name: 'Tanzanie',
    code: 'TZ',
    flagCode: '🇹🇿',
    region: 'Afrique',
    cities: ['Dar es Salaam', 'Dodoma', 'Mwanza', 'Zanzibar', 'Arusha', 'Mbeya', 'Morogoro', 'Tanga']
  },

  // Asie
  {
    id: '28',
    name: 'Japon',
    code: 'JP',
    flagCode: '🇯🇵',
    region: 'Asie',
    cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Sapporo', 'Yokohama', 'Kobe']
  },
  {
    id: '29',
    name: 'Chine',
    code: 'CN',
    flagCode: '🇨🇳',
    region: 'Asie',
    cities: ['Pékin', 'Shanghai', 'Xi\'an', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Nanjing']
  },
  {
    id: '30',
    name: 'Thaïlande',
    code: 'TH',
    flagCode: '🇹🇭',
    region: 'Asie',
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Koh Samui', 'Ayutthaya', 'Krabi', 'Hua Hin']
  },
  {
    id: '31',
    name: 'Inde',
    code: 'IN',
    flagCode: '🇮🇳',
    region: 'Asie',
    cities: ['New Delhi', 'Mumbai', 'Jaipur', 'Agra', 'Varanasi', 'Goa', 'Chennai', 'Bangalore']
  },
  {
    id: '32',
    name: 'Vietnam',
    code: 'VN',
    flagCode: '🇻🇳',
    region: 'Asie',
    cities: ['Hô Chi Minh-Ville', 'Hanoi', 'Da Nang', 'Hoi An', 'Nha Trang', 'Hue', 'Sapa', 'Can Tho']
  },
  {
    id: '33',
    name: 'Corée du Sud',
    code: 'KR',
    flagCode: '🇰🇷',
    region: 'Asie',
    cities: ['Séoul', 'Busan', 'Jeju', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon']
  },
  {
    id: '34',
    name: 'Singapour',
    code: 'SG',
    flagCode: '🇸🇬',
    region: 'Asie',
    cities: ['Singapour', 'Jurong', 'Tampines', 'Bedok', 'Woodlands', 'Sengkang', 'Hougang', 'Punggol']
  },
  {
    id: '35',
    name: 'Malaisie',
    code: 'MY',
    flagCode: '🇲🇾',
    region: 'Asie',
    cities: ['Kuala Lumpur', 'Penang', 'Langkawi', 'Malacca', 'Kota Kinabalu', 'Johor Bahru', 'Ipoh', 'Kuching']
  },
  {
    id: '36',
    name: 'Indonésie',
    code: 'ID',
    flagCode: '🇮🇩',
    region: 'Asie',
    cities: ['Jakarta', 'Bali', 'Yogyakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar']
  },
  {
    id: '37',
    name: 'Philippines',
    code: 'PH',
    flagCode: '🇵🇭',
    region: 'Asie',
    cities: ['Manila', 'Cebu', 'Davao', 'Boracay', 'Palawan', 'Baguio', 'Iloilo', 'Cagayan de Oro']
  },

  // Moyen-Orient
  {
    id: '38',
    name: 'Turquie',
    code: 'TR',
    flagCode: '🇹🇷',
    region: 'Moyen-Orient',
    cities: ['Istanbul', 'Ankara', 'Antalya', 'Cappadoce', 'Izmir', 'Bodrum', 'Pamukkale', 'Ephèse']
  },
  {
    id: '39',
    name: 'Jordanie',
    code: 'JO',
    flagCode: '🇯🇴',
    region: 'Moyen-Orient',
    cities: ['Amman', 'Petra', 'Aqaba', 'Wadi Rum', 'Jerash', 'Madaba', 'Kerak', 'Irbid']
  },
  {
    id: '40',
    name: 'Émirats arabes unis',
    code: 'AE',
    flagCode: '🇦🇪',
    region: 'Moyen-Orient',
    cities: ['Dubaï', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras al-Khaimah', 'Fujairah', 'Umm al-Quwain']
  },
  {
    id: '41',
    name: 'Israël',
    code: 'IL',
    flagCode: '🇮🇱',
    region: 'Moyen-Orient',
    cities: ['Jérusalem', 'Tel Aviv', 'Haifa', 'Eilat', 'Nazareth', 'Bethléem', 'Acre', 'Césarée']
  },
  {
    id: '42',
    name: 'Liban',
    code: 'LB',
    flagCode: '🇱🇧',
    region: 'Moyen-Orient',
    cities: ['Beyrouth', 'Byblos', 'Baalbek', 'Tripoli', 'Sidon', 'Tyr', 'Jounieh', 'Zahlé']
  },

  // Amérique du Nord
  {
    id: '43',
    name: 'États-Unis',
    code: 'US',
    flagCode: '🇺🇸',
    region: 'Amérique du Nord',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Las Vegas', 'Washington', 'Boston']
  },
  {
    id: '44',
    name: 'Canada',
    code: 'CA',
    flagCode: '🇨🇦',
    region: 'Amérique du Nord',
    cities: ['Toronto', 'Vancouver', 'Montréal', 'Calgary', 'Ottawa', 'Edmonton', 'Québec', 'Winnipeg']
  },
  {
    id: '45',
    name: 'Mexique',
    code: 'MX',
    flagCode: '🇲🇽',
    region: 'Amérique du Nord',
    cities: ['Mexico', 'Cancún', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez']
  },

  // Amérique du Sud
  {
    id: '46',
    name: 'Brésil',
    code: 'BR',
    flagCode: '🇧🇷',
    region: 'Amérique du Sud',
    cities: ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasilia', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba']
  },
  {
    id: '47',
    name: 'Argentine',
    code: 'AR',
    flagCode: '🇦🇷',
    region: 'Amérique du Sud',
    cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Tucumán', 'Mar del Plata', 'Salta']
  },
  {
    id: '48',
    name: 'Chili',
    code: 'CL',
    flagCode: '🇨🇱',
    region: 'Amérique du Sud',
    cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca']
  },
  {
    id: '49',
    name: 'Pérou',
    code: 'PE',
    flagCode: '🇵🇪',
    region: 'Amérique du Sud',
    cities: ['Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Huancayo']
  },
  {
    id: '50',
    name: 'Colombie',
    code: 'CO',
    flagCode: '🇨🇴',
    region: 'Amérique du Sud',
    cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Soledad', 'Ibagué']
  },

  // Océanie
  {
    id: '51',
    name: 'Australie',
    code: 'AU',
    flagCode: '🇦🇺',
    region: 'Océanie',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adélaïde', 'Gold Coast', 'Newcastle', 'Canberra']
  },
  {
    id: '52',
    name: 'Nouvelle-Zélande',
    code: 'NZ',
    flagCode: '🇳🇿',
    region: 'Océanie',
    cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North']
  },

  // Autres pays populaires
  {
    id: '53',
    name: 'Russie',
    code: 'RU',
    flagCode: '🇷🇺',
    region: 'Europe/Asie',
    cities: ['Moscou', 'Saint-Pétersbourg', 'Novosibirsk', 'Ekaterinbourg', 'Nijni Novgorod', 'Kazan', 'Tcheliabinsk', 'Omsk']
  },
  {
    id: '54',
    name: 'Ukranie',
    code: 'UA',
    flagCode: '🇺🇦',
    region: 'Europe',
    cities: ['Kiev', 'Kharkiv', 'Odessa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih']
  },
  {
    id: '55',
    name: 'Roumanie',
    code: 'RO',
    flagCode: '🇷🇴',
    region: 'Europe',
    cities: ['Bucarest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Brașov', 'Galați']
  }
];

export const regions = [
  'Tous',
  'Europe', 
  'Afrique', 
  'Asie', 
  'Moyen-Orient', 
  'Amérique du Nord', 
  'Amérique du Sud', 
  'Océanie'
];
