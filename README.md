# Tuk-Tuk Ride Sharer

This project combines a Flask backend with a React frontend to create a ride-sharing application.

## Project Structure

- `/backend` - Flask backend API
- `/frontend` - React frontend application

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Building for Production

1. Build the frontend:
   ```
   cd frontend
   npm run build
   ```

2. The built files will be available in the `frontend/dist` directory, which the Flask backend can serve.

3. Run the Flask application to serve both the API and the frontend:
   ```
   cd backend
   python app.py
   ```