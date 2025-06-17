
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface PetRecommendationProps {
  recommendation: string;
}

const PetRecommendation = ({ recommendation }: PetRecommendationProps) => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your Perfect Pet Match
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetRecommendation;
