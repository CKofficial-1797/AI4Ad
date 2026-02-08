import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";

interface GoalStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

interface Goal {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

const objectiveToGoals: Record<string, Goal[]> = {
    OUTCOME_TRAFFIC: [
        { title: "LINK_CLICKS", desc: "Get people to click on your ad's link." },
        { title: "IMPRESSIONS", desc: "Maximize the number of times your ad is shown." },
    ],
    OUTCOME_ENGAGEMENT: [
        { title: "IMPRESSIONS", desc: "Maximize the number of times your ad is shown." },
    ],
    OUTCOME_LEADS: [
        { title: "LEAD_GENERATION", desc: "Capture potential customer information." },
    ],
};


const GoalStep: React.FC<GoalStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [goal, setGoal] = useState(formData.goal || "");
    const goals = objectiveToGoals[formData.objective || ""] || [];

    const handleSubmit = () => {
        if (!goal) return alert("Please select a goal.");
        onUpdate({ goal });
        onNext();
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Campaign Goal</h2>
                <p className="text-gray-600 mt-2">
                    Choose the primary goal for your campaign.
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {goals.map((g) => (
                    <li
                        key={g.title}
                        onClick={() => setGoal(g.title)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-start space-x-4 ${g.title === goal
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                            }`}
                    >
                        <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${g.title === goal ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            <span className="text-xl">🎯</span>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{g.desc}</h3>
                           
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

export default GoalStep;
