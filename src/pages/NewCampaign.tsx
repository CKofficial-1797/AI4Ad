import DashboardLayout from "@/components/DashboardLayout";
import MultiStepForm from "@/components/form/MultiStepForm";
import React from "react";

const NewCampagin: React.FC = () => {
    return (
        <DashboardLayout
            title="New Campaign"
            subtitle="Create your advertising campaign"
        >
            <MultiStepForm />
        </DashboardLayout>
    );
}

export default NewCampagin;