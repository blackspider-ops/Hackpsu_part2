from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, IntegerField, FloatField, TextAreaField, DateTimeLocalField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, NumberRange, Optional
from .models import User

# Note: You might move specific forms (like OfferRideForm) into their respective blueprint folders (e.g., app/rides/forms.py)

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Log In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password', message='Passwords must match.')])
    submit = SubmitField('Register')

    # Custom validators to check if username/email already exist
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

class OfferRideForm(FlaskForm):
    origin = StringField('Origin', validators=[DataRequired()])
    destination = StringField('Destination', validators=[DataRequired()])
    departure_time = DateTimeLocalField('Departure Time', format='%Y-%m-%dT%H:%M', validators=[DataRequired()])
    seats_available = IntegerField('Seats Available', validators=[DataRequired(), NumberRange(min=1)])
    price_per_seat = FloatField('Price per Seat ($)', validators=[Optional(), NumberRange(min=0)]) # Optional price
    description = TextAreaField('Description (Optional)')
    submit = SubmitField('Offer Ride')

class SearchRideForm(FlaskForm):
    origin = StringField('Origin', validators=[DataRequired()])
    destination = StringField('Destination', validators=[DataRequired()])
    # Add date/time fields if needed for more specific search
    submit = SubmitField('Find Rides')

# Add more forms as needed (BookingForm, ProfileEditForm, etc.)