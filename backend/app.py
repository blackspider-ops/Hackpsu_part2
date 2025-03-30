from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
import click
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
import secrets

app = Flask(__name__, 
           static_folder='../frontend/dist',
           template_folder='../frontend/dist')

# Enable CORS for all routes
CORS(app, supports_credentials=True)

# Generate a secure random secret key
app.secret_key = secrets.token_hex(16)

# Configure session cookies for cross-origin requests
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_DOMAIN'] = None

# Configure SQLAlchemy database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/tuktuk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SERVER_NAME'] = None

# Initialize the database
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='user')  # New role field
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256')
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Keep rides list for now, will migrate to database in future
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
    email = data.get('email')
    password = data.get('password')

    # Validate password complexity
    if len(password) < 8:
        return {'error': 'Password must be at least 8 characters'}, 400

    try:
        # Start transaction
        db.session.begin()
        
        # Check for existing user
        if User.query.filter((User.username == username) | (User.email == email)).first():
            db.session.rollback()
            return {'error': 'Username or email already exists'}, 400

        # Create and save new user
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return {'success': True, 'message': 'User created successfully'}

    except Exception as e:
        db.session.rollback()
        app.logger.error(f'Registration error: {str(e)}')
        return {'error': 'Database error occurred during registration'}, 500

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Find user by username
    # Check both username and email
    user = User.query.filter((User.username.ilike(username)) | (User.email.ilike(username))).first()
    
    # Check if user exists and password is correct
    if user and user.check_password(password):
        # Set session cookie
        session.clear()
        session['username'] = user.username
        session.permanent = True

        return {'success': True, 'username': user.username}
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

# Create database tables at startup
with app.app_context():
    db.create_all()

# Legacy routes for backward compatibility
@app.route('/legacy')
def legacy_home():
    return render_template('index.html')

@app.route('/legacy/register', methods=['GET', 'POST'])
def legacy_register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            return "Username already exists."
        users[username] = password
        return redirect(url_for('legacy_home'))
    return render_template('register.html')

@app.route('/legacy/login', methods=['GET', 'POST'])
def legacy_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = user.username
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

@app.errorhandler(404)
def not_found_error(error):
    return {'error': 'Resource not found'}, 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return {'error': 'An internal server error occurred'}, 500



@app.cli.command('create-admin')
def create_admin():
    """Create admin user"""
    username = 'admin'
    password = 'pass'
    
    if User.query.filter_by(username=username).first():
        print(f'User {username} already exists')
        return

    admin = User(username=username, email='admin@admin.com', role='admin')
    admin.set_password(password)
    db.session.add(admin)
    db.session.commit()
    print(f'Created admin account: {username}')

@app.cli.command('reset-admin-password')
@click.argument('new_password')
def reset_admin_password(new_password):
    """Reset admin password securely"""
    admin = User.query.filter_by(email='admin@admin.com').first()
    if not admin:
        click.echo('Admin user not found')
        return
    
    admin.set_password(new_password)
    db.session.commit()
    click.echo('Admin password updated successfully')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5172)