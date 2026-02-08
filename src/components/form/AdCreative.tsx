import type { CampaignForm } from "@/types/campaignForm";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdCreativeProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const callToActionTypes: Array<{value: string, label: string}> = [
    { value: "SHOP_NOW", label: "Shop Now" },
    { value: "BOOK_TRAVEL", label: "Book Travel" },
    { value: "LEARN_MORE", label: "Learn More" },
    { value: "SIGN_UP", label: "Sign Up" },
    { value: "DOWNLOAD", label: "Download" },
    { value: "INSTALL_MOBILE_APP", label: "Install Mobile App" },
    { value: "USE_MOBILE_APP", label: "Use Mobile App" },
    { value: "WATCH_VIDEO", label: "Watch Video" },
    { value: "WATCH_MORE", label: "Watch More" },
    { value: "OPEN_LINK", label: "Open Link" },
];

const AdCreative: React.FC<AdCreativeProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts[0] === 'creative' && nameParts.length === 2) {
            onUpdate({
                creative: {
                    ...formData.creative,
                    name: value,
                },
            });
        } else if (nameParts[0] === 'creative' && nameParts[1] === 'object_story_spec' && nameParts.length === 3) {
            const [, , field] = nameParts;
            const newObjectStorySpec = {
                ...formData.creative?.object_story_spec,
                [field]: value,
            };
            if (field === 'link') {
                newObjectStorySpec.call_to_action = {
                    ...newObjectStorySpec.call_to_action,
                    value: { link: value },
                };
            }
            onUpdate({
                creative: {
                    ...formData.creative,
                    object_story_spec: newObjectStorySpec,
                },
            });
        } else if (nameParts[0] === 'creative' && nameParts[1] === 'object_story_spec' && nameParts.length === 4) {
            const [, , linkDataKey, field] = nameParts;
            onUpdate({
                creative: {
                    ...formData.creative,
                    object_story_spec: {
                        ...formData.creative?.object_story_spec,
                        [linkDataKey]: {
                            ...(formData.creative?.object_story_spec?.[linkDataKey as 'link_data1' | 'link_data2'] || {}),
                            [field]: value,
                        },
                    },
                },
            });
        }
    };

    const handleCallToActionChange = (value: string) => {
        onUpdate({
            creative: {
                ...formData.creative,
                object_story_spec: {
                    ...formData.creative?.object_story_spec,
                    call_to_action: {
                        ...formData.creative?.object_story_spec?.call_to_action,
                        type: value,
                    },
                },
            },
        });
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle>Ad Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="creative.object_story_spec.link" className="block text-sm font-medium text-gray-700 mb-1">
                        Link
                    </label>
                    <input
                        id="creative.object_story_spec.link"
                        type="text"
                        value={formData.creative?.object_story_spec?.link || ''}
                        name="creative.object_story_spec.link"
                        onChange={handleChange}
                        placeholder="E.g., Black Friday Sale - Meta Ads"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="creative.object_story_spec.call_to_action.type" className="block text-sm font-medium text-gray-700 mb-1">
                            Call to Action Type
                        </label>
                        <Select
                            onValueChange={handleCallToActionChange}
                            value={formData.creative?.object_story_spec?.call_to_action?.type || ''}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a call to action" />
                            </SelectTrigger>
                            <SelectContent>
                                {callToActionTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ad 1</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="creative.object_story_spec.link_data1.name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="creative.object_story_spec.link_data1.name"
                                type="text"
                                value={formData.creative?.object_story_spec?.link_data1?.name || ''}
                                name="creative.object_story_spec.link_data1.name"
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="creative.object_story_spec.link_data1.message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <input
                                id="creative.object_story_spec.link_data1.message"
                                type="text"
                                value={formData.creative?.object_story_spec?.link_data1?.message || ''}
                                name="creative.object_story_spec.link_data1.message"
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ad 2</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="creative.object_story_spec.link_data2.name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="creative.object_story_spec.link_data2.name"
                                type="text"
                                value={formData.creative?.object_story_spec?.link_data2?.name || ''}
                                name="creative.object_story_spec.link_data2.name"
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="creative.object_story_spec.link_data_2.message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <input
                                id="creative.object_story_spec.link_data2.message"
                                type="text"
                                value={formData.creative?.object_story_spec?.link_data2?.message || ''}
                                name="creative.object_story_spec.link_data2.message"
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={onPrev}
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 uppercase tracking-wide"
                    >
                        Prev
                    </button>
                    <button
                        onClick={onNext}
                        type="button"
                        className="px-6 py-2 bg-gold hover:bg-gold-600 text-navy font-bold rounded-lg shadow-md transition-colors duration-200 uppercase tracking-wide"
                    >
                        Next
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdCreative;
