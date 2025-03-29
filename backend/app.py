from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__, 
           static_folder='../frontend/dist',
           template_folder='../frontend/dist')

# Enable CORS for all routes
CORS(app, supports_credentials=True)

app.secret_key = 'your_secret_key'  # Change this to a strong, random key in a real application

app.config['SERVER_NAME'] = None

# Dummy data (replace with a database in a real application)
users = {}
rides = []

# API routes
@app.route('/api/rides', methods=['GET'])
def get_rides():
    available_rides = [ride for ride in rides if ride['available_seats'] > 0]
    return {'rides': available_rides}

@app.route('/api/rides', methods=['POST'])
def create_ride():
    if 'username' not in session:
        return {'error': 'Not logged in'}, 401
    
    data = request.json
    origin = data.get('origin')
    destination = data.get('destination')
    departure_date = data.get('departure_date')
    departure_time = data.get('departure_time')
    seats = int(data.get('seats'))
    price = float(data.get('price'))
    
    departure_datetime_str = f"{departure_date} {departure_time}"
    try:
        departure_datetime = datetime.strptime(departure_datetime_str, '%Y-%m-%d %H:%M')
        rides.append({
            'driver': session['username'],
            'origin': origin,
            'destination': destination,
            'departure_datetime': departure_datetime,
            'seats': seats,
            'available_seats': seats,
            'price': price
        })
        return {'success': True, 'ride_id': len(rides) - 1}
    except ValueError:
        return {'error': 'Invalid date or time format'}, 400

@app.route('/api/rides/search', methods=['POST'])
def search_rides():
    data = request.json
    origin = data.get('origin')
    destination = data.get('destination')
    search_date_str = data.get('search_date')
    
    try:
        search_date = datetime.strptime(search_date_str, '%Y-%m-%d').date()
        found_rides = [
            ride for ride in rides
            if ride['origin'].lower() == origin.lower() and
            ride['destination'].lower() == destination.lower() and
            ride['departure_datetime'].date() == search_date and
            ride['available_seats'] > 0
        ]
        return {'rides': found_rides}
    except ValueError:
        return {'error': 'Invalid date format'}, 400

@app.route('/api/rides/<int:ride_id>', methods=['GET'])
def get_ride(ride_id):
    if 0 <= ride_id < len(rides):
        return {'ride': rides[ride_id]}
    return {'error': 'Ride not found'}, 404

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return {'error': 'Username already exists'}, 400
    
    users[username] = password
    return {'success': True}

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users and users[username] == password:
        session['username'] = username
        return {'success': True, 'username': username}
    else:
        return {'error': 'Invalid username or password'}, 401

@app.route('/api/auth/logout', methods=['POST'])
def api_logout():
    session.pop('username', None)
    return {'success': True}

@app.route('/api/auth/user', methods=['GET'])
def get_user():
    if 'username' in session:
        return {'logged_in': True, 'username': session['username']}
    return {'logged_in': False}

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Legacy routes for backward compatibility
@app.route('/legacy')
def legacy_index():
    return render_template('index.html')

@app.route('/legacy/register', methods=['GET', 'POST'])
def legacy_register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            return "Username already exists."
        users[username] = password
        return redirect(url_for('legacy_login'))
    return render_template('register.html')

@app.route('/legacy/login', methods=['GET', 'POST'])
def legacy_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('legacy_dashboard'))
        else:
            return "Invalid username or password."
    return render_template('login.html')

@app.route('/legacy/logout')
def legacy_logout():
    session.pop('username', None)
    return redirect(url_for('legacy_index'))

@app.route('/legacy/dashboard')
def legacy_dashboard():
    if 'username' in session:
        return render_template('dashboard.html', username=session['username'])
    return redirect(url_for('legacy_login'))

@app.route('/legacy/offer_ride', methods=['GET', 'POST'])
def legacy_offer_ride():
    if 'username' not in session:
        return redirect(url_for('legacy_login'))
    if request.method == 'POST':
        origin = request.form['origin']
        destination = request.form['destination']
        departure_date = request.form['departure_date']
        departure_time = request.form['departure_time']
        seats = int(request.form['seats'])
        price = float(request.form['price'])
        departure_datetime_str = f"{departure_date} {departure_time}"
        try:
            departure_datetime = datetime.strptime(departure_datetime_str, '%Y-%m-%d %H:%M')
            rides.append({
                'driver': session['username'],
                'origin': origin,
                'destination': destination,
                'departure_datetime': departure_datetime,
                'seats': seats,
                'available_seats': seats,
                'price': price
            })
            return redirect(url_for('legacy_rides_list'))
        except ValueError:
            return "Invalid date or time format."
    return render_template('offer_ride.html')

@app.route('/legacy/find_ride', methods=['GET', 'POST'])
def legacy_find_ride():
    if request.method == 'POST':
        origin = request.form['origin']
        destination = request.form['destination']
        search_date_str = request.form['search_date']
        try:
            search_date = datetime.strptime(search_date_str, '%Y-%m-%d').date()
            found_rides = [
                ride for ride in rides
                if ride['origin'].lower() == origin.lower() and
                ride['destination'].lower() == destination.lower() and
                ride['departure_datetime'].date() == search_date and
                ride['available_seats'] > 0
            ]
            return render_template('rides_list.html', rides=found_rides)
        except ValueError:
            return "Invalid date format."
    return render_template('find_ride.html')

@app.route('/legacy/rides')
def legacy_rides_list():
    available_rides = [ride for ride in rides if ride['available_seats'] > 0]
    return render_template('rides_list.html', rides=available_rides)

@app.route('/legacy/ride/<int:ride_id>')
def legacy_ride_details(ride_id):
    if 0 <= ride_id < len(rides):
        return render_template('ride_details.html', ride=rides[ride_id], ride_id=ride_id)
    return "Ride not found."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5172)