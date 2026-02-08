import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const [showMenu, setShowMenu] = React.useState(true);

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  }

  return (
    <div className="flex h-screen bg-cloud">
      <Sidebar visible={showMenu} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${showMenu ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader head={title} subhead={subtitle ? subtitle : ''} showMenu={showMenu} toggleMenu={toggleMenu} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
