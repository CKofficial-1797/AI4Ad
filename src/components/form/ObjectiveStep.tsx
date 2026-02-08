import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";

interface ObjectiveStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

interface Objective {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

const ObjectiveStep: React.FC<ObjectiveStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [objective, setObjective] = useState(formData.objective || "");

    const objectives: Objective[] = [
        {
            title: "OUTCOME_TRAFFIC",
            desc: "TRAFFIC",
        },
        {
            title: "OUTCOME_LEADS",
            desc: "LEADS",
        },
    ];

    const handleSubmit = () => {
        if (!objective) return alert("Please select an objective.");
        onUpdate({
            objective: objective,
            goal: objective === "OUTCOME_LEADS" ? "LEAD_GENERATION" : "LINK_CLICKS",
            event: "IMPRESSIONS",
        });
        onNext();
    };

    return (
        <div className="space-y-8 p-6 bg-white rounded-xl shadow-md transition-all duration-300">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Campaign Objective</h2>
                <p className="text-gray-600 mt-2">
                    Choose the main goal of your campaign to get started.
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {objectives.map((obj) => (
                    <li
                        key={obj.title}
                        onClick={() => setObjective(obj.title)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start space-x-4
          ${obj.title === objective
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                            }
        `}
                    >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
          ${obj.title === objective ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}
        `}>
                            <span className="text-xl">🎯</span>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{obj.desc}</h3>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between pt-4">
                <button
                    onClick={onPrev}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 uppercase tracking-wide"
                >
                    Prev
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gold hover:bg-gold-600 text-navy font-bold rounded-lg shadow-md transition-colors duration-200 uppercase tracking-wide"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ObjectiveStep;