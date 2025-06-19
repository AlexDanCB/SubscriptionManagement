
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { CustomersView } from './CustomersView';
import { AnalyticsView } from './AnalyticsView';
import { OverviewView } from './OverviewView';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'customers':
        return <CustomersView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          user={user}
          onLogout={onLogout}
        />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
