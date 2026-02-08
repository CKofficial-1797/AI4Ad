import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import type { Campaign } from '@/types/campaign';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(import.meta.env.VITE_XANO_CAMPAIGN_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      const sortedCampaigns = response.data.sort((a: Campaign, b: Campaign) => b.updated_at - a.updated_at);
      setCampaigns(sortedCampaigns);
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.token) {
      fetchCampaigns();
    }
  }, [user, fetchCampaigns]);

  const filteredCampaigns = useMemo(() => {
    if (filter === 'All') {
      return campaigns;
    }
    return campaigns.filter(campaign => campaign.status === filter.toUpperCase());
  }, [campaigns, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Meta': return 'bg-blue-100 text-blue-800';
      case 'Google': return 'bg-red-100 text-red-800';
      case 'TikTok': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  const handleNewCampaign = () => {
    navigate('/new-campaign');
  };

  return (
    <DashboardLayout
      title="Campaign Management"
      subtitle="Create, monitor, and optimize your advertising campaigns"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button
              onClick={handleNewCampaign}
              className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
            >
              New Campaign
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant={filter === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('All')}>All</Button>
            <Button variant={filter === 'Active' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('Active')}>Active</Button>
            <Button variant={filter === 'Paused' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('Paused')}>Paused</Button>
            <Button variant="outline" size="sm" onClick={fetchCampaigns}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Campaigns Table */}
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Campaign</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Objective</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">Loading...</td>
                  </tr>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-navy font-inter">{campaign.name}</div>
                          <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getPlatformColor(campaign.objective)}>
                          {campaign.objective}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">
                            {campaign.status.toUpperCase() === 'ACTIVE' ? 'Pause' : 'Resume'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
