import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeftSquareIcon, ChevronRightSquareIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ head, subhead, showMenu, toggleMenu }: { head: string, subhead: string, showMenu: boolean, toggleMenu: () => void }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewCampaign = () => {
    navigate('/new-campaign');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className='flex items-center space-x-2.5'>
            {showMenu ?
              <ChevronLeftSquareIcon className='size-7 cursor-pointer' onClick={toggleMenu} />
              : <ChevronRightSquareIcon className='size-7 cursor-pointer' onClick={toggleMenu} />
            }
            <h1 className="hidden md:block text-2xl font-bold text-navy font-inter">{head}</h1>
          </div>
          <p className="hidden md:block text-gray-600 font-inter">{subhead}</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={handleNewCampaign}
            className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
          >
            New Campaign
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 font-outfit font-medium uppercase tracking-wide"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;