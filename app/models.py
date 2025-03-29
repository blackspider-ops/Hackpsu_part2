from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db # Import db instance from __init__

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(256)) # Increased length for stronger hashes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Add other fields like name, phone_number, profile_picture etc.

    # Relationships
    rides_offered = db.relationship('Ride', backref='driver', lazy='dynamic')
    bookings = db.relationship('Booking', backref='passenger', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Ride(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    origin = db.Column(db.String(128), nullable=False)
    destination = db.Column(db.String(128), nullable=False)
    departure_time = db.Column(db.DateTime, index=True, nullable=False)
    seats_available = db.Column(db.Integer, nullable=False)
    price_per_seat = db.Column(db.Float, nullable=True, default=0.0) # Or use Decimal for precision
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    bookings = db.relationship('Booking', backref='ride', lazy='dynamic', cascade="all, delete-orphan") # Delete bookings if ride is deleted

    def __repr__(self):
        return f'<Ride {self.id} from {self.origin} to {self.destination}>'

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ride_id = db.Column(db.Integer, db.ForeignKey('ride.id'), nullable=False)
    passenger_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seats_booked = db.Column(db.Integer, default=1, nullable=False)
    status = db.Column(db.String(20), default='pending', nullable=False) # e.g., pending, confirmed, rejected, cancelled
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Ensure a passenger can't book the same ride multiple times (adjust if needed)
    __table_args__ = (db.UniqueConstraint('ride_id', 'passenger_id', name='_ride_passenger_uc'),)

    def __repr__(self):
        return f'<Booking {self.id} for Ride {self.ride_id} by User {self.passenger_id}>'