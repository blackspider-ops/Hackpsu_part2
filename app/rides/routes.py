from flask import render_template, redirect, url_for, flash, request
from flask_login import current_user, login_required
from datetime import datetime
from . import rides
from .. import db
from ..models import Ride, Booking, User
from ..forms import OfferRideForm, SearchRideForm # Import forms

@rides.route('/offer', methods=['GET', 'POST'])
@login_required
def offer_ride():
    form = OfferRideForm()
    if form.validate_on_submit():
        # Convert DateTimeLocalField string back to datetime object
        departure_time_obj = datetime.strptime(form.departure_time.data.strftime('%Y-%m-%dT%H:%M'), '%Y-%m-%dT%H:%M')

        ride = Ride(
            driver_id=current_user.id,
            origin=form.origin.data,
            destination=form.destination.data,
            departure_time=departure_time_obj,
            seats_available=form.seats_available.data,
            price_per_seat=form.price_per_seat.data,
            description=form.description.data
        )
        db.session.add(ride)
        db.session.commit()
        flash('Your ride has been offered!', 'success')
        return redirect(url_for('users.dashboard')) # Redirect to dashboard or ride detail page
    return render_template('rides/offer_ride.html', title='Offer a Ride', form=form)

@rides.route('/find', methods=['GET', 'POST'])
def find_ride():
    form = SearchRideForm()
    results = None
    if form.validate_on_submit():
        # Basic search logic (improve with date/time filters)
        origin = form.origin.data
        destination = form.destination.data
        now = datetime.utcnow() # Don't show past rides

        # Query rides matching origin/destination and future departure time
        results = Ride.query.filter(
            Ride.origin.ilike(f'%{origin}%'), # Case-insensitive search
            Ride.destination.ilike(f'%{destination}%'),
            Ride.departure_time > now,
            Ride.seats_available > 0 # Only show rides with seats
        ).order_by(Ride.departure_time.asc()).all()

        if not results:
            flash('No matching rides found.', 'info')

    return render_template('rides/find_ride.html', title='Find a Ride', form=form, results=results)


@rides.route('/ride/<int:ride_id>')
def ride_detail(ride_id):
    ride = Ride.query.get_or_404(ride_id)
    # Check if current user has already booked this ride (for button logic)
    existing_booking = None
    if current_user.is_authenticated:
        existing_booking = Booking.query.filter_by(ride_id=ride.id, passenger_id=current_user.id).first()

    return render_template('rides/ride_detail.html', title='Ride Details', ride=ride, existing_booking=existing_booking)


@rides.route('/ride/<int:ride_id>/book', methods=['POST']) # Use POST for booking action
@login_required
def book_ride(ride_id):
    ride = Ride.query.get_or_404(ride_id)

    # --- Basic Booking Logic (Needs Improvement) ---
    # 1. Check if user is the driver
    if ride.driver_id == current_user.id:
        flash("You cannot book your own ride.", 'warning')
        return redirect(url_for('rides.ride_detail', ride_id=ride.id))

    # 2. Check if already booked
    existing_booking = Booking.query.filter_by(ride_id=ride.id, passenger_id=current_user.id).first()
    if existing_booking:
        flash('You have already requested to book this ride.', 'info')
        return redirect(url_for('rides.ride_detail', ride_id=ride.id))

    # 3. Check for available seats
    if ride.seats_available <= 0:
        flash('Sorry, this ride is full.', 'danger')
        return redirect(url_for('rides.ride_detail', ride_id=ride.id))

    # 4. Create Booking (simple auto-confirm for hackathon, ideally needs driver approval)
    try:
        booking = Booking(ride_id=ride.id, passenger_id=current_user.id, status='confirmed') # Auto-confirm
        ride.seats_available -= 1 # Decrement seats

        db.session.add(booking)
        db.session.commit()
        flash('Ride booked successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error booking ride: {str(e)}', 'danger')

    return redirect(url_for('users.dashboard')) # Redirect to dashboard

# Add routes for cancelling bookings, managing offered rides (editing/deleting), approving requests etc.
@rides.route('/booking/<int:booking_id>/cancel', methods=['POST'])
@login_required
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    ride = Ride.query.get(booking.ride_id) # Get associated ride

    # Ensure the current user is the passenger who made the booking
    if booking.passenger_id != current_user.id:
        flash('You do not have permission to cancel this booking.', 'danger')
        return redirect(url_for('users.dashboard'))

    # Prevent cancelling if ride already happened? (Optional check)
    # if ride and ride.departure_time < datetime.utcnow():
    #     flash('Cannot cancel booking for a past ride.', 'warning')
    #     return redirect(url_for('users.dashboard'))

    try:
        # Increment seats available back on the ride if it exists and booking was confirmed
        if ride and booking.status == 'confirmed':
            ride.seats_available += booking.seats_booked # Add back booked seats

        # Remove the booking record
        db.session.delete(booking)
        db.session.commit()
        flash('Booking cancelled successfully.', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error cancelling booking: {str(e)}', 'danger')

    return redirect(url_for('users.dashboard'))


@rides.route('/ride/<int:ride_id>/delete', methods=['POST'])
@login_required
def delete_ride(ride_id):
    ride = Ride.query.get_or_404(ride_id)

    # Ensure the current user is the driver of the ride
    if ride.driver_id != current_user.id:
        flash('You do not have permission to delete this ride.', 'danger')
        return redirect(url_for('users.dashboard'))

    try:
        # Cascade delete should handle associated bookings due to model definition
        db.session.delete(ride)
        db.session.commit()
        flash('Ride successfully deleted.', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error deleting ride: {str(e)}', 'danger')

    return redirect(url_for('users.dashboard'))