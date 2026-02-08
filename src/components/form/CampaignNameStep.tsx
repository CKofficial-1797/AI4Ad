import React, { useState } from "react";
import type { CampaignForm } from "@/types/campaignForm";

interface CampaignNameStepProps {
    onNext: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const CampaignNameStep: React.FC<CampaignNameStepProps> = ({
    onNext,
    onUpdate,
    formData,
}) => {
    const [campaignName, setCampaignName] = useState(formData.name || "");
    const [platform, setPlatform] = useState(formData.platform || "meta");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaignName.trim()) {
            setError("Campaign name is required");
            return;
        }
        onUpdate({ name: campaignName, platform: platform as 'meta' | 'google' | 'tiktok' });
        onNext();
    };

    return (
        <div className="space-y-8 p-6 bg-white rounded-xl shadow-md transition-all duration-300">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Name and Platform</h2>
                <p className="text-gray-600 mt-1">
                    Give your campaign a descriptive name and choose the platform where you want to run your ads.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Name
                    </label>
                    <input
                        id="campaignName"
                        type="text"
                        value={campaignName}
                        onChange={(e) => {
                            setCampaignName(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="E.g., Black Friday Sale - Meta Ads"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${error
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-blue-300"
                            }`}
                    />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Platform
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center transition-all duration-200 ${platform === 'meta'
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            onClick={() => setPlatform('meta')}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png?20211104123859"
                                alt="Meta"
                                className="h-20 mb-2"
                            />
                        </div>

                        <div
                            className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center transition-all duration-200 ${platform === 'google'
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            onClick={() => setPlatform('google')}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/408px-Google_2015_logo.svg.png?20160213081640"
                                alt="Google"
                                className="h-20 mb-2"
                            />
                        </div>

                        <div
                            className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center transition-all duration-200 ${platform === 'tiktok'
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            onClick={() => setPlatform('tiktok')}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/750px-TikTok_logo.svg.png?20200415104610"
                                alt="TikTok"
                                className="h-20 mb-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                   <button
                    type="submit"
                    className="px-6 py-2 bg-gold hover:bg-gold-600 text-navy font-bold rounded-lg shadow-md transition-colors duration-200 uppercase tracking-wide"
                >
                    Next
                </button>
                </div>
            </form>
        </div>
    );
};

export default CampaignNameStep;
