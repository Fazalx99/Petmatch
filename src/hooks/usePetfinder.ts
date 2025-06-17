
import { useState, useEffect } from 'react';

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

// Mock pet data for demo purposes
const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 'Young',
    gender: 'Female',
    size: 'Large',
    photos: [{ medium: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop' }],
    contact: {
      address: { city: 'San Francisco', state: 'CA' },
      phone: '(555) 123-4567',
      email: 'adopt@shelter.com'
    },
    description: 'Luna is a sweet, gentle girl who loves long walks and playing fetch. She gets along great with kids and other dogs!',
    tags: ['Friendly', 'Good with kids', 'House trained', 'Loves walks']
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    age: 'Adult',
    gender: 'Male',
    size: 'Medium',
    photos: [{ medium: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop' }],
    contact: {
      address: { city: 'Oakland', state: 'CA' },
      phone: '(555) 987-6543',
      email: 'cats@rescue.org'
    },
    description: 'Whiskers is a calm, affectionate cat who loves to cuddle and purr. Perfect for someone looking for a gentle companion.',
    tags: ['Calm', 'Affectionate', 'Indoor cat', 'Good with seniors']
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Labrador Mix',
    age: 'Adult',
    gender: 'Male',
    size: 'Large',
    photos: [{ medium: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop' }],
    contact: {
      address: { city: 'Berkeley', state: 'CA' },
      phone: '(555) 456-7890',
      email: 'dogs@petrescue.com'
    },
    description: 'Buddy is an energetic, playful dog who loves adventures and meeting new people. He would be perfect for an active family!',
    tags: ['Energetic', 'Playful', 'Good with dogs', 'Loves adventures']
  },
  {
    id: '4',
    name: 'Mittens',
    type: 'Cat',
    breed: 'Tabby',
    age: 'Young',
    gender: 'Female',
    size: 'Small',
    photos: [{ medium: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop' }],
    contact: {
      address: { city: 'San Jose', state: 'CA' },
      phone: '(555) 321-0987',
      email: 'kitties@animalcare.org'
    },
    description: 'Mittens is a playful kitten who loves toys and exploring. She would bring so much joy to any household!',
    tags: ['Playful', 'Young', 'Curious', 'Good with children']
  }
];

export const usePetfinder = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPets = async (type?: string, location?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock data based on type if provided
      let filteredPets = mockPets;
      if (type) {
        filteredPets = mockPets.filter(pet => 
          pet.type.toLowerCase() === type.toLowerCase()
        );
      }
      
      setPets(filteredPets);
    } catch (err) {
      setError('Failed to fetch pets. Please try again.');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  return { pets, loading, error, searchPets };
};
