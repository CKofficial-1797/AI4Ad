import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import type { Campaign } from '@/types/campaign';

interface CampaignFormProps {
  editingCampaign?: Campaign;
}

const CampaignForm = ({ editingCampaign }: CampaignFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    budgetType: 'daily',
    budget: '',
    duration: '',
    targetAudience: '',
    campaignGoal: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingCampaign) {
      console.log('Populating form with campaign data:', editingCampaign);
      setFormData({
        name: editingCampaign.name || '',
        platform: editingCampaign.platform?.toLowerCase() || '',
        budgetType: 'daily',
        budget: editingCampaign.budget?.toString() || '',
        duration: '',
        targetAudience: '',
        campaignGoal: '',
        description: ''
      });
    } else {
      // Reset form for new campaign
      setFormData({
        name: '',
        platform: '',
        budgetType: 'daily',
        budget: '',
        duration: '',
        targetAudience: '',
        campaignGoal: '',
        description: ''
      });
    }
  }, [editingCampaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const action = editingCampaign ? 'Updated' : 'Created';
      toast({
        title: `Campaign ${action} Successfully`,
        description: `${formData.name} has been ${action.toLowerCase()} and will be launched shortly.`,
      });
      setIsSubmitting(false);
      
      // Reset form only if creating new campaign
      if (!editingCampaign) {
        setFormData({
          name: '',
          platform: '',
          budgetType: 'daily',
          budget: '',
          duration: '',
          targetAudience: '',
          campaignGoal: '',
          description: ''
        });
      }
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto border-slate-200">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-900">
          {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        </CardTitle>
        <CardDescription>
          {editingCampaign 
            ? 'Update your campaign settings and optimization' 
            : 'Set up your ad campaign with AI-powered optimization'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Enter campaign name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="h-11"
              />
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="meta">Meta (Facebook & Instagram)</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok Ads</SelectItem>
                  <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget Configuration */}
          <div className="space-y-4">
            <Label>Budget Configuration</Label>
            <RadioGroup 
              value={formData.budgetType} 
              onValueChange={(value) => handleInputChange('budgetType', value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily Budget</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="total" />
                <Label htmlFor="total">Total Budget + Duration</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">
                  {formData.budgetType === 'daily' ? 'Daily Budget ($)' : 'Total Budget ($)'}
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget amount"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              {formData.budgetType === 'total' && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Campaign duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Textarea
              id="audience"
              placeholder="Describe your target audience (age, interests, location, etc.)"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Goal</Label>
            <Select value={formData.campaignGoal} onValueChange={(value) => handleInputChange('campaignGoal', value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select campaign objective" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="traffic">Website Traffic</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="leads">Lead Generation</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="app-installs">App Installs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product/service and campaign objectives"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" className="border-slate-300">
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              className="bg-slate-900 hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (editingCampaign ? "Updating Campaign..." : "Creating Campaign...") 
                : (editingCampaign ? "Update Campaign" : "Create Campaign")
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CampaignForm;