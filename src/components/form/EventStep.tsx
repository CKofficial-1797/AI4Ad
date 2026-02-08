import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface EventStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

interface Event {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

const ObjectiveToEvents: Record<string, Event[]> = {
    OUTCOME_AWARENESS: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
    OUTCOME_TRAFFIC: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
    OUTCOME_ENGAGEMENT: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
    OUTCOME_LEADS: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
    OUTCOME_SALES: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
    OUTCOME_APP_PROMOTION: [
        { title: "IMPRESSIONS", desc: "You'll be billed each time your ad is shown." },
    ],
};


const EventStep: React.FC<EventStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [event, setEvent] = useState(formData.event || "");
    const events = ObjectiveToEvents[formData.objective || ""] || [];

    const handleSubmit = () => {
        if (!event) return alert("Please select a event.");
        onUpdate({ event });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Billing Event</h2>
                <p className="text-gray-600 mt-1">
                    Select the event that will trigger billing for your campaign.
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((e) => (
                    <li
                        key={e.title}
                        onClick={() => setEvent(e.title)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer text-left
              ${e.title === event
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 bg-white hover:shadow"
                            }
            `}
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{e.desc}</h3>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <Button
                    onClick={onPrev}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-medium uppercase tracking-wide"
                >
                    Prev
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-gold hover:bg-gold-600 text-navy font-medium uppercase tracking-wide"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default EventStep;
