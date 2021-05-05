from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User, Event, Attendee


class CreateEventForm(FlaskForm):
