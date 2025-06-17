
import { useState } from 'react';

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

interface PetfinderTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PetfinderPet {
  id: number;
  name: string;
  type: string;
  species: string;
  breeds: {
    primary: string;
    secondary?: string;
  };
  age: string;
  gender: string;
  size: string;
  photos: Array<{
    small?: string;
    medium?: string;
    large?: string;
    full?: string;
  }>;
  contact: {
    address: {
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
    phone?: string;
    email?: string;
  };
  description?: string;
  tags?: string[];
}

export const usePetfinderAPI = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async (): Promise<string> => {
    const apiKey = 'RgoJIXAL9dVOZrLZrcqdpzHwN2106uF0a2xgb4DsBCzIZKr4ET';
    const secret = 'Vp6PxJJWo3rDCEYtSqKAlrUwBHy7wUvobakPJkdb';

    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: apiKey,
        client_secret: secret,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Petfinder API');
    }

    const data: PetfinderTokenResponse = await response.json();
    return data.access_token;
  };

  const transformPetfinderPet = (pet: PetfinderPet): Pet => {
    return {
      id: pet.id.toString(),
      name: pet.name,
      type: pet.type,
      breed: pet.breeds.primary + (pet.breeds.secondary ? ` / ${pet.breeds.secondary}` : ''),
      age: pet.age,
      gender: pet.gender,
      size: pet.size,
      photos: pet.photos.map(photo => ({
        medium: photo.medium,
        large: photo.large,
      })),
      contact: {
        address: {
          city: pet.contact.address.city,
          state: pet.contact.address.state,
        },
        phone: pet.contact.phone,
        email: pet.contact.email,
      },
      description: pet.description,
      tags: pet.tags,
    };
  };

  const searchPets = async (type?: string, location?: string) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      
      const params = new URLSearchParams({
        limit: '20',
      });

      if (type) {
        params.append('type', type);
      }

      if (location) {
        params.append('location', location);
      }

      console.log('Searching pets with params:', params.toString());

      const response = await fetch(`https://api.petfinder.com/v2/animals?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pets from Petfinder API');
      }

      const data = await response.json();
      console.log('API response:', data);
      
      const transformedPets = data.animals.map(transformPetfinderPet);
      console.log('Transformed pets:', transformedPets);
      setPets(transformedPets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pets';
      setError(errorMessage);
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  return { pets, loading, error, searchPets };
};
