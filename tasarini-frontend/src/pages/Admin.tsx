
import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminPageTitle from '@/components/admin/AdminPageTitle';
import AdminOverviewCards from '@/components/admin/AdminOverviewCards';
import AdminTabsContainer from '@/components/admin/AdminTabsContainer';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('countries');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AdminPageTitle />
        
        <AdminOverviewCards 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <AdminTabsContainer 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </main>
    </div>
  );
};

export default Admin;
