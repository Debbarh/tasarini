
import { Plane } from "lucide-react";

const DefaultStep = () => {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
        <Plane className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Étape en préparation
      </h3>
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        Cette étape sera bientôt disponible pour rendre votre voyage encore plus parfait.
      </p>
    </div>
  );
};

export default DefaultStep;
