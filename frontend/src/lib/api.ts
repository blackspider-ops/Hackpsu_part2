import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/sessions
});

// Auth endpoints
export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/login', { username, password }),
  
  register: (username: string, password: string) => 
    api.post('/auth/register', { username, password }),
  
  logout: () => 
    api.post('/auth/logout'),
  
  getCurrentUser: () => 
    api.get('/auth/user'),
};

// Rides endpoints
export const ridesAPI = {
  getAllRides: () => 
    api.get('/rides'),
  
  getRide: (rideId: number) => 
    api.get(`/rides/${rideId}`),
  
  createRide: (rideData: {
    origin: string;
    destination: string;
    departure_date: string;
    departure_time: string;
    seats: number;
    price: number;
  }) => api.post('/rides', rideData),
  
  searchRides: (searchData: {
    origin: string;
    destination: string;
    search_date: string;
  }) => api.post('/rides/search', searchData),
};

export default api;