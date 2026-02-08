import { Card } from '@/components/ui/card';

const stats = [
  {
    title: 'Active Campaigns',
    value: '12',
    change: '+3 new',
    positive: true,
    icon: '🚀'
  },
  {
    title: 'Total Spend',
    value: '$4,250',
    change: '+12%',
    positive: true,
    icon: '💰'
  },
  {
    title: 'Avg CPA',
    value: '$24.50',
    change: '-8%',
    positive: true,
    icon: '🎯'
  },
  {
    title: 'CTR',
    value: '3.2%',
    change: '+0.4%',
    positive: true,
    icon: '📊'
  }
];

const CampaignStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-inter font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-navy mt-2 font-inter">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'} font-inter`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-1 font-inter">from last week</span>
              </div>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CampaignStats;