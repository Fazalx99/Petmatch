
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, AlertCircle } from 'lucide-react';

interface APISetupProps {
  onCredentialsSet: () => void;
}

const APISetup = ({ onCredentialsSet }: APISetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('petfinder_api_key');
    const storedSecret = localStorage.getItem('petfinder_secret');
    
    if (storedApiKey && storedSecret) {
      setHasCredentials(true);
      setApiKey(storedApiKey);
      setSecret(storedSecret);
    }
  }, []);

  const handleSaveCredentials = () => {
    if (apiKey.trim() && secret.trim()) {
      localStorage.setItem('petfinder_api_key', apiKey.trim());
      localStorage.setItem('petfinder_secret', secret.trim());
      setHasCredentials(true);
      onCredentialsSet();
    }
  };

  const handleClearCredentials = () => {
    localStorage.removeItem('petfinder_api_key');
    localStorage.removeItem('petfinder_secret');
    setApiKey('');
    setSecret('');
    setHasCredentials(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Petfinder API Setup</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Need API credentials?</p>
                <p>Visit <a href="https://www.petfinder.com/developers/" target="_blank" className="underline">petfinder.com/developers</a> to get your API key and secret.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Petfinder API Key"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="secret">Secret</Label>
              <Input
                id="secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter your Petfinder API Secret"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleSaveCredentials}
              disabled={!apiKey.trim() || !secret.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500"
            >
              {hasCredentials ? 'Update Credentials' : 'Save Credentials'}
            </Button>
            
            {hasCredentials && (
              <Button 
                variant="outline" 
                onClick={handleClearCredentials}
                className="w-full"
              >
                Clear Credentials
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your credentials are stored securely in your browser's local storage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default APISetup;
