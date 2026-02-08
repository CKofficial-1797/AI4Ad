import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const campaigns = [
  {
    id: 1,
    name: 'Black Friday Sale - Meta',
    platform: 'Meta Ads',
    status: 'Active',
    budget: '$500',
    spent: '$342',
    ctr: '2.8%',
    cpa: '$18.50',
    progress: 68,
    platformColor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Holiday Collection - Google',
    platform: 'Google Ads',
    status: 'Active',
    budget: '$300',
    spent: '$195',
    ctr: '3.4%',
    cpa: '$22.30',
    progress: 65,
    platformColor: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Gen Z Campaign - TikTok',
    platform: 'TikTok Ads',
    status: 'Paused',
    budget: '$200',
    spent: '$89',
    ctr: '4.2%',
    cpa: '$15.20',
    progress: 45,
    platformColor: 'bg-pink-500'
  }
];

const ActiveCampaigns = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Paused': return 'text-yellow-600 bg-yellow-100';
      case 'Ended': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="p-6 bg-white border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-navy font-inter">Active Campaigns</h3>
          <p className="text-gray-600 text-sm font-inter">Manage your running ad campaigns</p>
        </div>
        <Button className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide">
          New Campaign
        </Button>
      </div>
      
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${campaign.platformColor}`}></div>
                <div>
                  <h4 className="font-medium text-navy font-inter">{campaign.name}</h4>
                  <p className="text-sm text-gray-600 font-inter">{campaign.platform}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium font-inter ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500 font-inter">Budget / Spent</p>
                <p className="font-medium text-navy font-inter">{campaign.budget} / {campaign.spent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-inter">CTR / CPA</p>
                <p className="font-medium text-navy font-inter">{campaign.ctr} / {campaign.cpa}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-inter">Budget Usage</span>
                <span className="text-navy font-medium font-inter">{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2" />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">
                {campaign.status === 'Active' ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" size="sm" className="text-xs">Edit</Button>
              <Button variant="outline" size="sm" className="text-xs">Duplicate</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActiveCampaigns;