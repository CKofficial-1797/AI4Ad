import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import PerformanceCharts from '@/components/PerformanceCharts';
import CampaignStats from '@/components/CampaignStats';

const Analytics = () => {

  return (
    <DashboardLayout
      title="Analytics & Performance"
      subtitle="Detailed insights into your campaign performance"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <CampaignStats />

        {/* Performance Charts */}
        <PerformanceCharts />

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-4 font-inter">Top Performing Campaigns</h3>
            <div className="space-y-3">
              {[
                { name: 'Black Friday Sale 2024', performance: '+25%', metric: 'CTR' },
                { name: 'Holiday Collection Launch', performance: '+18%', metric: 'Conversions' },
                { name: 'Brand Awareness Q4', performance: '+12%', metric: 'Reach' }
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-navy font-inter">{campaign.name}</div>
                    <div className="text-sm text-gray-600 font-inter">{campaign.metric} improvement</div>
                  </div>
                  <div className="text-green-600 font-semibold font-inter">{campaign.performance}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-4 font-inter">Platform Performance</h3>
            <div className="space-y-4">
              {[
                { platform: 'Meta', spend: '$2,150', roas: '4.2x', color: 'bg-blue-500' },
                { platform: 'Google', spend: '$1,890', roas: '3.8x', color: 'bg-red-500' },
                { platform: 'TikTok', spend: '$950', roas: '3.1x', color: 'bg-purple-500' }
              ].map((platform, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-navy font-inter">{platform.platform}</div>
                    <div className="text-sm text-gray-600 font-inter">Spend: {platform.spend}</div>
                  </div>
                  <div className="text-green-600 font-semibold font-inter">{platform.roas}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;