import DashboardContent from "@/components/DashboardContent";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {

    return (
        <DashboardLayout
            title="Campaign Dashboard"
            subtitle="Monitor and optimize your ad campaigns with AI-powered insights"
        >
            <DashboardContent />
        </DashboardLayout>
    );
};

export default Dashboard;