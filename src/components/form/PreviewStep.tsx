import type { CampaignForm, Ad } from "@/types/campaignForm";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewStepProps {
    onPrev: () => void;
    onSubmit: () => void;
    formData: CampaignForm;
}

const AdPreviewCard: React.FC<{ ad: Ad, title: string, link: string, call_to_action?: { type?: string, value?: { link?: string } } }> = ({ ad, link, call_to_action }) => {
    if (!ad) {
        return null;
    }

    return (
        <Card className="w-full mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg">
            <CardHeader>
                <CardTitle>Sponsored</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="flex space-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 px-1 rounded-full bg-blue-100">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-bold">{ad.name}</h3>
                            <p className="text-xs text-gray-600">{link ? link : 'No link provided'}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <a href={call_to_action?.value?.link || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-800 font-bold">{ad.name}
                        </a>
                        <p className="text-gray-600 text-sm">{ad.message}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const PreviewStep: React.FC<PreviewStepProps> = ({ onPrev, onSubmit, formData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ad Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-4">
                    {formData.creative?.object_story_spec?.link_data1 && (
                        <AdPreviewCard
                            ad={formData.creative.object_story_spec.link_data1}
                            title="Ad 1"
                            link={formData.creative.object_story_spec.link ?? ''}
                            call_to_action={formData.creative.object_story_spec.call_to_action}
                        />
                    )}
                    {formData.creative?.object_story_spec?.link_data2 && (
                        <AdPreviewCard
                            ad={formData.creative.object_story_spec.link_data2}
                            title="Ad 2"
                            link={formData.creative.object_story_spec.link ?? ''}
                            call_to_action={formData.creative.object_story_spec.call_to_action}
                        />
                    )}
                </div>
                <div className="flex justify-between">
                    <Button onClick={onPrev} variant="outline">Prev</Button>
                    <Button onClick={onSubmit}>Publish</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default PreviewStep;
