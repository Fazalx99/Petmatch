
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: { value: string; label: string; emoji: string; description?: string }[];
}

interface LifestyleQuizProps {
  onQuizComplete: (answers: Record<string, string>) => void;
  onBack: () => void;
}

const questions: QuizQuestion[] = [
  {
    id: 'activity',
    question: 'How active is your lifestyle?',
    subtitle: 'This helps us match you with pets that fit your energy level',
    options: [
      { value: 'low', label: 'Relaxed & Calm', emoji: '🛋️', description: 'I prefer quiet activities and indoor relaxation' },
      { value: 'moderate', label: 'Moderately Active', emoji: '🚶', description: 'I enjoy daily walks and light outdoor activities' },
      { value: 'high', label: 'Very Active', emoji: '🏃', description: 'I love hiking, running, and outdoor adventures' },
    ]
  },
  {
    id: 'experience',
    question: 'What\'s your experience with pets?',
    subtitle: 'Understanding your background helps us recommend the right match',
    options: [
      { value: 'first-time', label: 'First-time Owner', emoji: '🌱', description: 'This would be my first pet' },
      { value: 'some', label: 'Some Experience', emoji: '🎓', description: 'I\'ve had pets before but still learning' },
      { value: 'experienced', label: 'Very Experienced', emoji: '👨‍🏫', description: 'I\'ve owned and trained multiple pets' },
    ]
  },
  {
    id: 'kids',
    question: 'Do you have children at home?',
    subtitle: 'Some pets are naturally better with kids of different ages',
    options: [
      { value: 'none', label: 'No Children', emoji: '👤', description: 'Just adults in the household' },
      { value: 'young', label: 'Young Children', emoji: '👶', description: 'Kids under 10 years old' },
      { value: 'teens', label: 'Teenagers', emoji: '🧒', description: 'Kids 10+ years old' },
    ]
  },
  {
    id: 'space',
    question: 'What\'s your living situation?',
    subtitle: 'Different pets thrive in different environments',
    options: [
      { value: 'apartment', label: 'Apartment/Condo', emoji: '🏢', description: 'Urban living with limited outdoor space' },
      { value: 'house', label: 'House with Yard', emoji: '🏠', description: 'Suburban home with some outdoor space' },
      { value: 'large', label: 'Large Property', emoji: '🏡', description: 'Rural or large suburban property' },
    ]
  },
  {
    id: 'schedule',
    question: 'How many hours are you away from home daily?',
    subtitle: 'This helps determine how independent your pet needs to be',
    options: [
      { value: 'few', label: 'Mostly Home', emoji: '🏠', description: '1-4 hours away, work from home or retired' },
      { value: 'normal', label: 'Regular Schedule', emoji: '💼', description: '5-8 hours, typical work schedule' },
      { value: 'long', label: 'Long Hours', emoji: '⏰', description: '9+ hours, busy work or travel schedule' },
    ]
  },
  {
    id: 'personality',
    question: 'What personality would you prefer in a pet?',
    subtitle: 'Let\'s find a pet whose temperament matches yours',
    options: [
      { value: 'calm', label: 'Calm & Gentle', emoji: '😌', description: 'Peaceful, relaxed, and low-maintenance' },
      { value: 'playful', label: 'Playful & Energetic', emoji: '🎾', description: 'Active, fun-loving, and interactive' },
      { value: 'independent', label: 'Independent & Chill', emoji: '😎', description: 'Self-sufficient and doesn\'t need constant attention' },
    ]
  },
  {
    id: 'size',
    question: 'What size pet appeals to you most?',
    subtitle: 'Consider your living space and personal preferences',
    options: [
      { value: 'small', label: 'Small & Compact', emoji: '🐹', description: 'Easy to handle, portable, less space needed' },
      { value: 'medium', label: 'Medium Sized', emoji: '🐕', description: 'Good balance of companionship and manageability' },
      { value: 'large', label: 'Large & Majestic', emoji: '🐕‍🦺', description: 'Impressive presence, great protection, loyal companion' },
    ]
  },
  {
    id: 'commitment',
    question: 'How long are you prepared to care for a pet?',
    subtitle: 'Different pets have different lifespans and needs',
    options: [
      { value: 'short', label: '5-8 Years', emoji: '⏳', description: 'Shorter commitment, good for first-time owners' },
      { value: 'medium', label: '8-12 Years', emoji: '📅', description: 'Medium-term companion through life changes' },
      { value: 'long', label: '12+ Years', emoji: '💖', description: 'Lifelong commitment, family member for decades' },
    ]
  }
];

const LifestyleQuiz = ({ onQuizComplete, onBack }: LifestyleQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => onQuizComplete(newAnswers), 300);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goBack}
            className="rounded-full hover:bg-white/80 border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="text-sm font-medium text-gray-500">
            {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">
              {question.question}
            </h2>
            {question.subtitle && (
              <p className="text-gray-600 font-medium">
                {question.subtitle}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Card 
                key={option.value}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-200 bg-white"
                onClick={() => handleAnswer(question.id, option.value)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {option.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleQuiz;
