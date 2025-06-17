
import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LifestyleQuiz from '@/components/LifestyleQuiz';
import PetCard from '@/components/PetCard';
import PetModal from '@/components/PetModal';
import PetRecommendation from '@/components/PetRecommendation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePetfinderAPI } from '@/hooks/usePetfinderAPI';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Screen = 'welcome' | 'quiz' | 'results' | 'loading';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  photos: { medium?: string; large?: string }[];
  contact: {
    address: {
      city?: string;
      state?: string;
    };
    phone?: string;
    email?: string;
  };
  description?: string;
  tags?: string[];
}

const generateRecommendation = (answers: Record<string, string>): string => {
  const { activity, kids, space, schedule, personality } = answers;
  
  let recommendation = "Based on your lifestyle, ";
  
  if (activity === 'high' && space === 'large') {
    recommendation += "you'd be perfect for an energetic, large dog who loves to run and play! ";
  } else if (activity === 'low' && personality === 'calm') {
    recommendation += "a calm, gentle cat or small dog would be ideal for your relaxed lifestyle. ";
  } else if (kids === 'young' && personality === 'playful') {
    recommendation += "a friendly, patient dog that's great with children would be wonderful for your family! ";
  } else if (schedule === 'long' && personality === 'independent') {
    recommendation += "an independent cat who's comfortable being alone would suit your busy schedule perfectly. ";
  } else {
    recommendation += "a medium-energy pet that matches your balanced lifestyle would be great! ";
  }
  
  recommendation += "Let's find some amazing companions waiting for a loving home like yours! 🏠💕";
  
  return recommendation;
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { pets, loading, error, searchPets } = usePetfinderAPI();
  const { toast } = useToast();

  console.log('Current screen:', currentScreen);
  console.log('Quiz answers:', quizAnswers);
  console.log('Pets found:', pets.length);

  const handleQuizComplete = async (answers: Record<string, string>) => {
    console.log('Quiz completed with answers:', answers);
    setQuizAnswers(answers);
    
    setCurrentScreen('loading');
    
    const rec = generateRecommendation(answers);
    setRecommendation(rec);
    
    // Enhanced pet type determination based on new questions
    let preferredType = '';
    if (answers.activity === 'high' || answers.personality === 'playful' || answers.size === 'large') {
      preferredType = 'Dog';
    } else if (answers.activity === 'low' || answers.personality === 'independent' || answers.schedule === 'long') {
      preferredType = 'Cat';
    } else if (answers.size === 'small') {
      // Could be either small dogs or cats
      preferredType = Math.random() > 0.5 ? 'Dog' : 'Cat';
    }
    
    await searchPets(preferredType);
    setCurrentScreen('results');
  };

  const handleToggleFavorite = (petId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(petId)) {
      newFavorites.delete(petId);
      toast({
        title: "Removed from favorites",
        description: "You can always add them back later!",
      });
    } else {
      newFavorites.add(petId);
      toast({
        title: "Added to favorites! 💕",
        description: "You can view your favorites anytime.",
      });
    }
    setFavorites(newFavorites);
  };

  const handleFindMore = async () => {
    setCurrentScreen('loading');
    await searchPets();
    setCurrentScreen('results');
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStartQuiz={() => setCurrentScreen('quiz')} />;
  }

  if (currentScreen === 'quiz') {
    return (
      <LifestyleQuiz 
        onQuizComplete={handleQuizComplete}
        onBack={() => setCurrentScreen('welcome')}
      />
    );
  }

  if (currentScreen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <LoadingSpinner />
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Finding your perfect matches
            </h2>
            <p className="text-gray-600 font-medium">
              Analyzing your preferences and searching through thousands of adoptable pets
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>Connecting to shelters</span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></span>
              <span>Matching profiles</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-700"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentScreen('welcome')}
            className="flex items-center space-x-2 hover:bg-gray-50 rounded-xl px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Start</span>
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Your Perfect Matches
          </h1>
          <Button
            variant="outline"
            onClick={handleFindMore}
            disabled={loading}
            className="flex items-center space-x-2 hover:bg-gray-50 rounded-xl border-gray-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium">Find More</span>
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && <PetRecommendation recommendation={recommendation} />}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Pet Grid */}
        {!loading && pets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetails={setSelectedPet}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(pet.id)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && pets.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-lg mx-auto">
              <div className="text-6xl mb-6">🐾</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No pets found
              </h3>
              <p className="text-gray-600 mb-6 font-medium">
                Don't worry! New pets arrive at shelters daily. 
                Try adjusting your preferences or check back soon.
              </p>
              <Button 
                onClick={handleFindMore} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl px-8 py-3"
              >
                Search Again
              </Button>
            </div>
          </div>
        )}

        {/* Pet Modal */}
        <PetModal
          pet={selectedPet}
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={selectedPet ? favorites.has(selectedPet.id) : false}
        />
      </div>
    </div>
  );
};

export default Index;
