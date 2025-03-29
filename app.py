from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a strong, random key in a real application

# Dummy data (replace with a database in a real application)
users = {}
rides = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            return "Username already exists."
        users[username] = password
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            return "Invalid username or password."
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/offer_ride', methods=['GET', 'POST'])
def offer_ride():
    if 'username' not in session:
        return redirect(url_for('login'))
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
            return redirect(url_for('rides_list'))
        except ValueError:
            return "Invalid date or time format."
    return render_template('offer_ride.html')

@app.route('/find_ride', methods=['GET', 'POST'])
def find_ride():
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

@app.route('/rides')
def rides_list():
    available_rides = [ride for ride in rides if ride['available_seats'] > 0]
    return render_template('rides_list.html', rides=available_rides)

@app.route('/ride/<int:ride_id>')
def ride_details(ride_id):
    if 0 <= ride_id < len(rides):
        return render_template('ride_details.html', ride=rides[ride_id], ride_id=ride_id)
    return "Ride not found."

if __name__ == '__main__':
    app.run(debug=True)