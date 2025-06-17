
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

const WelcomeScreen = ({ onStartQuiz }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300">
                <Heart className="w-12 h-12 text-white" />
                <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="absolute -top-3 -right-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce delay-500"></div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Pet<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Match</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                Discover your perfect furry companion through our intelligent matching system. 
                Real pets, real connections, real love.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-gray-600">Smart algorithm analyzes your lifestyle for perfect pet compatibility</p>
            </div>
            
            <div className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Local Shelters</h3>
              <p className="text-sm text-gray-600">Connect with adoptable pets from verified shelters near you</p>
            </div>
            
            <div className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Forever Homes</h3>
              <p className="text-sm text-gray-600">Help rescue animals find their perfect forever family</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <Button 
              onClick={onStartQuiz}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Live pet data</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                <span>Instant matching</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></span>
                <span>100% free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
