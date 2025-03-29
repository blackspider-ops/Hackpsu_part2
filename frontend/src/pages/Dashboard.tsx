
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to TUK TUK</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-0">
              <Link to="/find-ride" className="block p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Find a Ride</h3>
                      <p className="text-gray-500">Browse available rides around campus</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary">
                    Browse
                  </Button>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-0">
              <Link to="/list-ride" className="block p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <PlusCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">List a Ride</h3>
                      <p className="text-gray-500">Share your journey with others</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary">
                    Create
                  </Button>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Downtown', icon: <MapPin /> },
            { name: 'Airport', icon: <MapPin /> },
            { name: 'Shopping Mall', icon: <MapPin /> },
            { name: 'Library', icon: <MapPin /> },
            { name: 'Sports Center', icon: <MapPin /> },
            { name: 'Concert Hall', icon: <MapPin /> },
          ].map((destination, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  {destination.icon}
                </div>
                <span className="font-medium">{destination.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
