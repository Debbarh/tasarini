
interface AccommodationStepProps {
  accommodation: string;
  setAccommodation: (accommodation: string) => void;
}

const accommodationTypes = [
  {
    id: 'chez-habitant',
    label: 'Chez l\'habitant',
    desc: 'Séjour authentique en famille',
    emoji: '🏠'
  },
  {
    id: 'hotelier-classe',
    label: 'Établissement hôtelier classé',
    desc: 'Hôtels avec classification officielle',
    emoji: '⭐'
  },
  {
    id: 'camping',
    label: 'Camping',
    desc: 'Nature et plein air',
    emoji: '⛺'
  },
  {
    id: 'experience-unique',
    label: 'Expérience unique',
    desc: 'Hébergements insolites et originaux',
    emoji: '✨'
  },
  {
    id: 'riad-traditionnel',
    label: 'Riad traditionnel',
    desc: 'Charme authentique marocain',
    emoji: '🕌'
  },
  {
    id: 'auberge-jeunesse',
    label: 'Auberge de jeunesse',
    desc: 'Économique et convivial',
    emoji: '🎒'
  }
];

const AccommodationStep = ({ accommodation, setAccommodation }: AccommodationStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Quel type d'hébergement préférez-vous ?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodationTypes.map((option) => (
          <button
            key={option.id}
            onClick={() => setAccommodation(option.id)}
            className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              accommodation === option.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
                : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {option.emoji}
            </div>
            <div className="font-bold text-lg mb-2">{option.label}</div>
            <div className="text-sm opacity-70">{option.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccommodationStep;
