from flask import render_template, flash, redirect, url_for
from flask_login import current_user, login_required
from . import users
from ..models import User, Ride, Booking

@users.route('/dashboard')
@login_required
def dashboard():
    # Get rides offered by the current user
    rides_offered = Ride.query.filter_by(driver_id=current_user.id).order_by(Ride.departure_time.desc()).all()

    # Get bookings made by the current user
    bookings_made = Booking.query.filter_by(passenger_id=current_user.id).join(Ride).order_by(Ride.departure_time.desc()).all()
    
    # Get booking requests for rides offered by the current user (if implementing approval)
    # booking_requests = Booking.query.join(Ride).filter(Ride.driver_id == current_user.id, Booking.status == 'pending').all()


    return render_template('users/dashboard.html',
                           title='Dashboard',
                           rides_offered=rides_offered,
                           bookings_made=bookings_made)
                           # booking_requests=booking_requests)


@users.route('/profile/<username>')
@login_required # Might allow viewing public profiles without login later
def profile(username):
    user = User.query.filter_by(username=username).first_or_404()
    # Add logic for editing profile if user is viewing their own page
    can_edit = (user == current_user)
    return render_template('users/profile.html', title=f'{user.username}\'s Profile', user=user, can_edit=can_edit)

# Add routes for editing profile