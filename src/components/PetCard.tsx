
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  photos: { medium?: string }[];
  contact: {
    address: {
      city?: string;
      state?: string;
    };
  };
  description?: string;
  tags?: string[];
}

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
  onToggleFavorite: (petId: string) => void;
  isFavorite: boolean;
}

const PetCard = ({ pet, onViewDetails, onToggleFavorite, isFavorite }: PetCardProps) => {
  const getDefaultImage = () => {
    return pet.type === 'Dog' 
      ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop'
      : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="relative">
        <img 
          src={pet.photos[0]?.medium || getDefaultImage()}
          alt={pet.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = getDefaultImage();
          }}
        />
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-2 right-2 rounded-full p-2 ${
            isFavorite ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-600'
          } hover:scale-110 transition-all duration-200`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pet.id);
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
        </div>
        
        {pet.contact.address.city && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {pet.contact.address.city}, {pet.contact.address.state}
          </div>
        )}
        
        {pet.tags && pet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pet.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Button 
          onClick={() => onViewDetails(pet)}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-xl transition-all duration-300"
        >
          Meet {pet.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PetCard;
