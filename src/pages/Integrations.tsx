import DashboardLayout from '@/components/DashboardLayout';
import PlatformIntegrations from '@/components/PlatformIntegrations';

const Integrations = () => {

  return (
    <DashboardLayout
      title="Platform Integrations"
      subtitle="Connect and manage your advertising platforms"
    >
      <PlatformIntegrations />
    </DashboardLayout>
  );
};

export default Integrations;
