
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
      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            user={user}
            onLogout={onLogout}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 pb-20 md:pb-0">
          <div className="p-4 md:p-8">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <Sidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            user={user}
            onLogout={onLogout}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
};
