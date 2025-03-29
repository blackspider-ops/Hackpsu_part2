from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from flask import Flask

# Initialize the Flask application (you might not need this here if you pass the app instance)
# However, for simplicity, we can keep it and initialize it in app.py
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    rides_offered = db.relationship('Ride', backref='driver', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

class Ride(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_datetime = db.Column(db.DateTime, nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    available_seats = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Ride from {self.origin} to {self.destination} on {self.departure_datetime}>"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()