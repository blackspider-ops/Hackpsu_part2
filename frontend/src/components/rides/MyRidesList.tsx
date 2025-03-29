
import React from 'react';
import { Button } from "@/components/ui/button";
import { Ride } from './RideCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface MyRidesListProps {
  rides: Ride[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyRidesList = ({ rides, onEdit, onDelete }: MyRidesListProps) => {
  if (rides.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't listed any rides yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell className="font-medium">{ride.departureLocation}</TableCell>
              <TableCell>{ride.destination}</TableCell>
              <TableCell>{new Date(ride.departureTime).toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Users className="h-3 w-3 mr-1" /> {ride.availableSeats}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(ride.id)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(ride.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyRidesList;
