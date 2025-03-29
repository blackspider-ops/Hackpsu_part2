
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export interface Ride {
  id: string;
  driverName: string;
  driverAvatar?: string;
  departureTime: string;
  departureLocation: string;
  destination: string;
  availableSeats: number;
  price?: number;
}

interface RideCardProps {
  ride: Ride;
  onViewDetails: (id: string) => void;
}

const RideCard = ({ ride, onViewDetails }: RideCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={ride.driverAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{ride.driverName}</p>
              <p className="text-sm text-muted-foreground">Driver</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Users className="h-3 w-3 mr-1" /> {ride.availableSeats} seats
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Departure Time</p>
              <p className="text-sm text-muted-foreground">{ride.departureTime}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">From</p>
              <p className="text-sm text-muted-foreground">{ride.departureLocation}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">To</p>
              <p className="text-sm text-muted-foreground">{ride.destination}</p>
            </div>
          </div>

          {ride.price !== undefined && (
            <div className="mt-3">
              <p className="font-semibold text-lg text-tuktuk">${ride.price.toFixed(2)}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3">
        <Button 
          variant="outline"
          className="w-full hover:bg-primary hover:text-white transition-colors"
          onClick={() => onViewDetails(ride.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideCard;
