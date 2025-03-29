
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RideCard from '../components/rides/RideCard';
import RideDetailModal from '../components/rides/RideDetailModal';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRides } from '../context/RideContext';

const FindRide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { rides } = useRides();

  const handleViewDetails = (id: string) => {
    const ride = rides.find(ride => ride.id === id);
    if (ride) {
      setSelectedRide(ride);
      setIsModalOpen(true);
    }
  };

  const handleRequestRide = (rideId: string) => {
    // Here you would implement the actual ride request logic
    setIsModalOpen(false);
    toast({
      title: "Ride Request Sent!",
      description: "The driver has been notified of your request.",
    });
  };

  const filteredRides = rides.filter(ride => 
    ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.departureLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find a Ride</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by location or destination..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {searchTerm && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Filtering by:</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin size={12} />
                {searchTerm}
                <button 
                  className="ml-1 hover:text-gray-700" 
                  onClick={() => setSearchTerm('')}
                >
                  <X size={12} />
                </button>
              </Badge>
            </div>
          )}
        </div>
        
        {filteredRides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-4">No rides found matching your search.</p>
            <Button onClick={() => setSearchTerm('')} className="btn-tuktuk">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map(ride => (
              <RideCard 
                key={ride.id} 
                ride={ride} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        )}
      </div>
      
      <RideDetailModal
        ride={selectedRide}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestRide={handleRequestRide}
      />
    </div>
  );
};

export default FindRide;
