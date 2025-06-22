
import { Database } from 'lucide-react';

const AdminPageTitle = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-light text-gray-900 mb-2">
        Administration
        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
          Backend
        </span>
      </h1>
      <p className="text-xl text-gray-700 flex items-center gap-2">
        <Database className="w-5 h-5" />
        Gestion complète de vos données
      </p>
    </div>
  );
};

export default AdminPageTitle;
