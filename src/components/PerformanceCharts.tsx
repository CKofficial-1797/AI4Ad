import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = [
  { name: 'Mon', impressions: 12400, clicks: 350, conversions: 28, spend: 245 },
  { name: 'Tue', impressions: 15600, clicks: 420, conversions: 35, spend: 320 },
  { name: 'Wed', impressions: 18200, clicks: 510, conversions: 42, spend: 380 },
  { name: 'Thu', impressions: 16800, clicks: 465, conversions: 38, spend: 340 },
  { name: 'Fri', impressions: 21500, clicks: 680, conversions: 55, spend: 485 },
  { name: 'Sat', impressions: 19200, clicks: 580, conversions: 48, spend: 420 },
  { name: 'Sun', impressions: 14800, clicks: 420, conversions: 32, spend: 295 },
];

const campaignPerformance = [
  { name: 'Meta Ads', ctr: 2.8, cpa: 18.5, spend: 1250 },
  { name: 'Google Ads', ctr: 3.4, cpa: 22.3, spend: 1680 },
  { name: 'TikTok Ads', ctr: 4.2, cpa: 15.2, spend: 890 },
  { name: 'LinkedIn Ads', ctr: 1.9, cpa: 35.8, spend: 430 },
];

const PerformanceCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Performance */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-navy font-inter">Weekly Performance</h3>
          <p className="text-gray-600 text-sm font-inter">Clicks and conversions over time</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} fontFamily="Inter" />
            <YAxis stroke="#6b7280" fontSize={12} fontFamily="Inter" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#252F5B', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontFamily: 'Inter'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stackId="1"
              stroke="#F9B015" 
              fill="#F9B015"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="conversions" 
              stackId="1"
              stroke="#252F5B" 
              fill="#252F5B"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Campaign Performance */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-navy font-inter">Campaign Performance</h3>
          <p className="text-gray-600 text-sm font-inter">CTR and spend by platform</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={campaignPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} fontFamily="Inter" />
            <YAxis stroke="#6b7280" fontSize={12} fontFamily="Inter" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#252F5B', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontFamily: 'Inter'
              }} 
            />
            <Bar dataKey="ctr" fill="#F9B015" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spend" fill="#252F5B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default PerformanceCharts;