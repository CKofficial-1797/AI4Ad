import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your account and preferences"
    >
      <div className="max-w-2xl space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy mb-4 font-inter">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Name</label>
              <Input defaultValue="Admin User" className="font-inter" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Email</label>
              <Input defaultValue="admin@mail.com" className="font-inter" />
            </div>
            <Button className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium">
              Save Changes
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy mb-4 font-inter">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy font-inter">Campaign Alerts</div>
                <div className="text-sm text-gray-600 font-inter">Get notified when campaigns need attention</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy font-inter">Performance Reports</div>
                <div className="text-sm text-gray-600 font-inter">Weekly performance summaries</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy font-inter">Budget Alerts</div>
                <div className="text-sm text-gray-600 font-inter">Alerts when approaching budget limits</div>
              </div>
              <Switch />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;