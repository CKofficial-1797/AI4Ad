import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpa: number;
}

interface AnalyticsProps {
  campaigns: Campaign[];
}

const Analytics: React.FC<AnalyticsProps> = ({ campaigns }) => {

  const performanceData = [
    { date: '2024-01-01', impressions: 12000, clicks: 240, spend: 180 },
    { date: '2024-01-02', impressions: 15000, clicks: 310, spend: 220 },
    { date: '2024-01-03', impressions: 18000, clicks: 380, spend: 290 },
    { date: '2024-01-04', impressions: 16000, clicks: 340, spend: 260 },
    { date: '2024-01-05', impressions: 20000, clicks: 420, spend: 320 },
    { date: '2024-01-06', impressions: 22000, clicks: 460, spend: 350 },
    { date: '2024-01-07', impressions: 25000, clicks: 510, spend: 390 }
  ];

  const platformData = campaigns.reduce((acc, campaign) => {
    const existing = acc.find(p => p.platform === campaign.platform);
    if (existing) {
      existing.spend += campaign.spent;
      existing.campaigns += 1;
    } else {
      acc.push({
        platform: campaign.platform,
        spend: campaign.spent,
        campaigns: 1
      });
    }
    return acc;
  }, [] as { platform: string; spend: number; campaigns: number }[]);

  const COLORS = ['#1e293b', '#475569', '#64748b', '#94a3b8'];

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgCTR = totalClicks > 0 ? ((totalClicks / totalImpressions) * 100) : 0;
  const avgCPC = totalClicks > 0 ? (totalSpend / totalClicks) : 0;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs last week</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">↑ 8% vs last week</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Average CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCTR.toFixed(2)}%</div>
            <p className="text-xs text-green-600 mt-1">↑ 5% vs last week</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Average CPC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${avgCPC.toFixed(2)}</div>
            <p className="text-xs text-red-600 mt-1">↓ 3% vs last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Performance Trends</CardTitle>
            <CardDescription>Daily impressions, clicks, and spend over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="impressions" stroke="#1e293b" strokeWidth={2} name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke="#64748b" strokeWidth={2} name="Clicks" />
                  <Line type="monotone" dataKey="spend" stroke="#94a3b8" strokeWidth={2} name="Spend ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Spend by Platform</CardTitle>
            <CardDescription>Distribution of ad spend across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ platform, spend }) => `${platform}: $${spend}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="spend"
                  >
                    {platformData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Breakdown */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Campaign Performance Breakdown</CardTitle>
          <CardDescription>Detailed metrics for each campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                    <Badge 
                      className={campaign.status === 'Active' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }
                    >
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className="text-slate-600">{campaign.platform}</Badge>
                  </div>
                  <div className="text-sm text-slate-600">
                    Budget: ${campaign.budget} | Spent: ${campaign.spent} ({((campaign.spent/campaign.budget)*100).toFixed(1)}%)
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">{campaign.impressions.toLocaleString()}</div>
                    <div className="text-xs text-slate-600">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">{campaign.clicks.toLocaleString()}</div>
                    <div className="text-xs text-slate-600">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">{campaign.ctr}%</div>
                    <div className="text-xs text-slate-600">CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">${campaign.cpc}</div>
                    <div className="text-xs text-slate-600">CPC</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">${campaign.cpa}</div>
                    <div className="text-xs text-slate-600">CPA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;