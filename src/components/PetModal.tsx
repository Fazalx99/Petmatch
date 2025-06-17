
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Phone, Mail, X } from 'lucide-react';

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

interface PetModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (petId: string) => void;
  isFavorite: boolean;
}

const PetModal = ({ pet, isOpen, onClose, onToggleFavorite, isFavorite }: PetModalProps) => {
  if (!pet) return null;

  const getDefaultImage = () => {
    return pet.type === 'Dog' 
      ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop';
  };

  const handlePhoneCall = () => {
    if (pet.contact.phone) {
      window.open(`tel:${pet.contact.phone}`, '_self');
    }
  };

  const handleEmailContact = () => {
    if (pet.contact.email) {
      window.open(`mailto:${pet.contact.email}?subject=Interested in adopting ${pet.name}`, '_self');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">{pet.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(pet.id)}
              className={`rounded-full p-2 ${
                isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={pet.photos[0]?.large || pet.photos[0]?.medium || getDefaultImage()}
              alt={pet.name}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = getDefaultImage();
              }}
            />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700">Breed</h4>
              <p className="text-gray-600">{pet.breed}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Age</h4>
              <p className="text-gray-600">{pet.age}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Gender</h4>
              <p className="text-gray-600">{pet.gender}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Size</h4>
              <p className="text-gray-600">{pet.size}</p>
            </div>
          </div>

          {/* Tags */}
          {pet.tags && pet.tags.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Personality</h4>
              <div className="flex flex-wrap gap-2">
                {pet.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {pet.description && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">About {pet.name}</h4>
              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-gray-700">Contact Information</h4>
            
            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{pet.contact.address.city}, {pet.contact.address.state}</span>
            </div>

            {/* Phone and Email */}
            <div className="space-y-2">
              {pet.contact.phone && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{pet.contact.phone}</span>
                </div>
              )}
              {pet.contact.email && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">{pet.contact.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Actions */}
          <div className="flex flex-col space-y-3 pt-4 border-t">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg py-6 rounded-xl">
              Adopt {pet.name} 💕
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              {pet.contact.phone && (
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={handlePhoneCall}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </Button>
              )}
              {pet.contact.email && (
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={handleEmailContact}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetModal;
