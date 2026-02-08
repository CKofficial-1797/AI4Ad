import CampaignStats from './CampaignStats';
import ActiveCampaigns from './ActiveCampaigns';
import PerformanceCharts from './PerformanceCharts';

const DashboardContent = () => {
  return (
    <div className="space-y-6 min-h-full">
      <CampaignStats />
      
      <PerformanceCharts />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveCampaigns />
      </div>
    </div>
  );
};

export default DashboardContent;