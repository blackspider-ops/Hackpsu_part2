
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, School } from 'lucide-react';

interface Institute {
  id: string;
  name: string;
  logo?: string;
}

const institutes: Institute[] = [
  { id: 'psu', name: 'Penn State University' },
  { id: 'mit', name: 'MIT' },
  { id: 'stanford', name: 'Stanford University' },
  { id: 'harvard', name: 'Harvard University' },
  { id: 'yale', name: 'Yale University' },
  { id: 'berkeley', name: 'UC Berkeley' },
];

interface InstituteSelectorProps {
  onSelect: (instituteId: string) => void;
}

const InstituteSelector = ({ onSelect }: InstituteSelectorProps) => {
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedInstitute(id);
  };

  const handleContinue = () => {
    if (selectedInstitute) {
      onSelect(selectedInstitute);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Select Your Institute</CardTitle>
        <CardDescription>Choose the educational institution you're affiliated with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {institutes.map((institute) => (
            <div
              key={institute.id}
              className={`p-4 border rounded-md cursor-pointer transition-all card-hover ${
                selectedInstitute === institute.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => handleSelect(institute.id)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {institute.logo ? (
                    <img src={institute.logo} alt={institute.name} className="h-6 w-6" />
                  ) : (
                    <School className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {institute.name}
                  </p>
                </div>
                {selectedInstitute === institute.id && (
                  <div className="text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button 
          onClick={handleContinue}
          disabled={!selectedInstitute}
          className="w-full btn-tuktuk"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstituteSelector;
