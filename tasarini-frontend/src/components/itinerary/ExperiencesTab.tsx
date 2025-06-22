
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperiencesTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Expériences uniques recommandées</h3>
      <div className="grid gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🍽️ Cours de cuisine marocaine authentique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Apprenez à préparer un tajine traditionnel avec une famille berbère</p>
            <div className="flex gap-4 text-sm">
              <span>⏱️ 4 heures</span>
              <span>👥 Groupe de 6 max</span>
              <span>💰 85€/personne</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🥾 Randonnée dans l'Atlas avec guide berbère
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Exploration des villages traditionnels et des paysages montagnards</p>
            <div className="flex gap-4 text-sm">
              <span>⏱️ Journée complète</span>
              <span>👥 Groupe privé</span>
              <span>💰 120€/personne</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperiencesTab;
