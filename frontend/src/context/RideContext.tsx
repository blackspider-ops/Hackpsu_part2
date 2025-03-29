
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Ride } from '../components/rides/RideCard';

// Sample initial data
const initialRides: Ride[] = [
  {
    id: '1',
    driverName: 'John Smith',
    departureTime: '2023-05-15T15:30:00',
    departureLocation: 'Library',
    destination: 'Downtown',
    availableSeats: 3,
    price: 5,
  },
  {
    id: '2',
    driverName: 'Emily Johnson',
    departureTime: '2023-05-15T16:45:00',
    departureLocation: 'Dormitory',
    destination: 'Shopping Mall',
    availableSeats: 2,
    price: 3.5,
  },
];

interface RideContextType {
  rides: Ride[];
  addRide: (ride: Ride) => void;
  deleteRide: (id: string) => void;
  userRides: Ride[];
}

export const RideContext = createContext<RideContextType>({
  rides: initialRides,
  addRide: () => {},
  deleteRide: () => {},
  userRides: [],
});

export const RideProvider = ({ children }: { children: ReactNode }) => {
  // Initialize rides from localStorage, falling back to initialRides if not present
  const [rides, setRides] = useState<Ride[]>(() => {
    const storedRides = localStorage.getItem('tuktuk-rides');
    return storedRides ? JSON.parse(storedRides) : initialRides;
  });
  
  // We'll assume these are the current user's rides
  const userRides = rides.filter(ride => ride.driverName === 'You');

  // Update localStorage whenever rides change
  useEffect(() => {
    localStorage.setItem('tuktuk-rides', JSON.stringify(rides));
  }, [rides]);

  const addRide = (ride: Ride) => {
    setRides(prevRides => {
      const newRides = [ride, ...prevRides];
      return newRides;
    });
  };

  const deleteRide = (id: string) => {
    setRides(prevRides => {
      const newRides = prevRides.filter(ride => ride.id !== id);
      return newRides;
    });
  };

  return (
    <RideContext.Provider value={{ rides, addRide, deleteRide, userRides }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRides = () => useContext(RideContext);
