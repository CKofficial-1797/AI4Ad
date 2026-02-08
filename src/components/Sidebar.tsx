import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: '📊', path: '/' },
  { name: 'Campaigns', icon: '🚀', path: '/campaigns' },
  { name: 'Analytics', icon: '📈', path: '/analytics' },
  { name: 'A/B Testing', icon: '🧪', path: '/ab-testing' },
  { name: 'Billing', icon: '💳', path: '/billing' },
  { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar = ({ visible }: { visible: boolean }) => {
  const location = useLocation();

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-navy text-white flex-col transform ${visible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      {/* Logo */}
      <div className="border-r-4 border-navy">
        <img className='h-36 w-full mx-auto object-cover rounded-b-4xl' src='/logo.jpg'/>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-inter mb-2">MONITORING</p>
          <ul className="space-y-1">
            {navigation.slice(0, 4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-inter text-sm",
                      isActive
                        ? "bg-gold text-navy font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-navy-600 hover:text-white"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-inter mb-2">AD CAMPAIGNS</p>
        </div>

        <div>
          <ul className="space-y-1">
            {navigation.slice(4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-inter text-sm",
                      isActive
                        ? "bg-gold text-navy font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-navy-600 hover:text-white"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
