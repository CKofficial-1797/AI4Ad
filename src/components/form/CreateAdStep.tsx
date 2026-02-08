import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateAdStepProps {
    onPrev: () => void;
    onCreateAdManually: () => void;
    onCreateAdWithAI: () => void;
}

const CreateAdStep: React.FC<CreateAdStepProps> = ({ onPrev, onCreateAdManually, onCreateAdWithAI }) => {
    return (
        <Card className="bg-white rounded-xl shadow-md transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Create Ad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-gray-600">
                    Choose how you want to create your ad.
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Button
                        onClick={onPrev}
                        variant="outline"
                        className="px-5 py-2.5 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors duration-200"
                    >
                        Prev
                    </Button>

                    <div className="flex space-x-4 w-full sm:w-auto">
                        <Button
                            onClick={onCreateAdManually}
                            className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                        >
                            Manually
                        </Button>
                        <Button
                            onClick={onCreateAdWithAI}
                            className="px-6 py-2 bg-gold hover:bg-gold-600 text-navy font-bold rounded-lg shadow-md transition-colors duration-200 uppercase tracking-wide"
                        >
                            <span>✨</span>
                            <span>Generate via AI</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CreateAdStep;
