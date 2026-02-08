import React from 'react';
import { Progress } from '../ui/progress';

const UpdatingStep: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Updating Campaign...</h2>
            <p className="text-gray-600">Please wait while we update your campaign.</p>
            <Progress value={50} className="w-1/2" />
        </div>
    );
};

export default UpdatingStep;
