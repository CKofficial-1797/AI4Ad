import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'Google Ads',
    description: 'Import audiences & conversions to Shown and publish ads using your own account.',
    icon: '🔍',
    connected: true,
    color: 'border-green-200 bg-green-50'
  },
  {
    name: 'Meta Ads',
    description: 'Import audiences & conversions to Shown and publish ads using your own account.',
    icon: '📘',
    connected: false,
    color: 'border-blue-200 bg-blue-50'
  },
  {
    name: 'TikTok Ads',
    description: 'Create & publish ads directly using your own account.',
    icon: '🎵',
    connected: false,
    color: 'border-pink-200 bg-pink-50'
  },
  {
    name: 'Microsoft Ads',
    description: 'Import audiences & conversions to Shown and publish ads using your own account.',
    icon: '🪟',
    connected: true,
    color: 'border-orange-200 bg-orange-50'
  },
  {
    name: 'LinkedIn Ads',
    description: 'Create & publish ads directly using your own account.',
    icon: '💼',
    connected: false,
    color: 'border-blue-200 bg-blue-50'
  },
  {
    name: 'Twitter Ads',
    description: 'Create & publish ads directly using your own account.',
    icon: '🐦',
    connected: false,
    color: 'border-sky-200 bg-sky-50'
  }
];

const PlatformIntegrations = () => {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-navy font-inter">Platform Integrations</h3>
        <p className="text-gray-600 text-sm font-inter">Connect your advertising platforms to manage campaigns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${platform.color}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{platform.icon}</div>
                <div>
                  <h4 className="font-medium text-navy font-inter">{platform.name}</h4>
                  {platform.connected && (
                    <span className="text-xs text-green-600 font-inter">✓ Connected</span>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 font-inter">{platform.description}</p>
            
            <Button
              variant={platform.connected ? "outline" : "default"}
              size="sm"
              className={`w-full ${
                platform.connected 
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50" 
                  : "bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
              }`}
            >
              {platform.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PlatformIntegrations;