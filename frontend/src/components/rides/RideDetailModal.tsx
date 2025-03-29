
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar, User, Users, Info } from 'lucide-react';
import { Ride } from './RideCard';

interface RideDetailModalProps {
  ride: Ride | null;
  open: boolean;
  onClose: () => void;
  onRequestRide: (rideId: string) => void;
}

const RideDetailModal = ({ ride, open, onClose, onRequestRide }: RideDetailModalProps) => {
  if (!ride) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ride Details</DialogTitle>
          <DialogDescription>Complete information about this ride</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={ride.driverAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{ride.driverName}</h3>
              <p className="text-sm text-muted-foreground">Driver</p>
            </div>
          </div>

          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">
                  {new Date(ride.departureTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-sm font-medium">
                  {new Date(ride.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-sm font-medium">{ride.departureLocation}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="text-sm font-medium">{ride.destination}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-secondary p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{ride.availableSeats} seats available</span>
            </div>
            
            {ride.price !== undefined && (
              <Badge className="bg-primary text-white">
                ${ride.price.toFixed(2)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Additional Information</p>
              <p className="text-sm">
                Please be on time. Luggage space is limited to one small bag per passenger.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            className="w-full sm:w-auto btn-tuktuk"
            onClick={() => onRequestRide(ride.id)}
          >
            Request Ride
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RideDetailModal;
