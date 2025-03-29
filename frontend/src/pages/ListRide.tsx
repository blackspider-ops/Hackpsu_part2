
import React from 'react';
import Navbar from '../components/Navbar';
import CreateRideForm from '../components/rides/CreateRideForm';
import MyRidesList from '../components/rides/MyRidesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ride } from '../components/rides/RideCard';
import { useToast } from '@/hooks/use-toast';
import { useRides } from '../context/RideContext';

const ListRide = () => {
  const { userRides, addRide, deleteRide } = useRides();
  const { toast } = useToast();

  const handleSubmitRide = (rideData: {
    departureLocation: string;
    destination: string;
    departureDate: Date;
    departureTime: string;
    seats: number;
    price?: number;
    description: string;
  }) => {
    // Create a new ride
    const newRide: Ride = {
      id: `ride-${Date.now()}`,
      driverName: 'You',
      departureTime: `${rideData.departureDate.toISOString().split('T')[0]}T${rideData.departureTime}:00`,
      departureLocation: rideData.departureLocation,
      destination: rideData.destination,
      availableSeats: rideData.seats,
      price: rideData.price,
    };
    
    // Add ride to context
    addRide(newRide);
    
    toast({
      title: "Ride Posted Successfully!",
      description: "Your ride has been listed and is now visible to others.",
    });
  };

  const handleEditRide = (id: string) => {
    // In a real app, you would implement editing functionality
    toast({
      title: "Edit Ride",
      description: `Editing ride with ID: ${id}`,
    });
  };

  const handleDeleteRide = (id: string) => {
    // Delete the ride using context
    deleteRide(id);
    
    toast({
      title: "Ride Deleted",
      description: "Your ride has been removed from the listings.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">List Your Rides</h1>
        
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides ({userRides.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <CreateRideForm onSubmit={handleSubmitRide} />
          </TabsContent>
          
          <TabsContent value="my-rides">
            <MyRidesList 
              rides={userRides} 
              onEdit={handleEditRide} 
              onDelete={handleDeleteRide} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ListRide;
