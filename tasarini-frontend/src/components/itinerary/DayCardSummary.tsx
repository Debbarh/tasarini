
interface DayCardSummaryProps {
  activitiesCount: number;
  totalDuration: number;
  totalBudget: number;
}

const DayCardSummary = ({ activitiesCount, totalDuration, totalBudget }: DayCardSummaryProps) => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 rounded-xl border border-purple-200">
      <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
        📊 Résumé de la journée
      </h4>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-purple-600">{activitiesCount}</div>
          <div className="text-purple-500">Activités</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-blue-600">~{totalDuration}h</div>
          <div className="text-blue-500">Durée totale</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-pink-600">{totalBudget}€</div>
          <div className="text-pink-500">Budget estimé</div>
        </div>
      </div>
    </div>
  );
};

export default DayCardSummary;
