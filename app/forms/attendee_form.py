from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField, IntegerField, DecimalField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, Optional
from app.models import User, Event, Attendee


def check_creatorUserId(form, field):
    userId = field.data
    user = User.query.filter(User.id == userId)
    if not user:
        raise ValidationError("Invalid Credentials")


def check_eventId(form, field):
    eventId = field.data
    event = Event.query.filter(Event.id == eventId).first()
    if not event:
        raise ValidationError("Event does not exist")


def check_email(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError("Enter a valid Email")


class CreateAttendeeForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(),
            Length(max=250, message="Name can be max 250 characters"),
            Length(min=1, message="Name must be at least 1 character"),
        ],
    )
    contactInfo = StringField("contactInfo", validators=[Optional()])
    attendeeEmail = StringField(
        "attendeeEmail",
        validators=[
            DataRequired(),
            Length(max=200, message="Email can be max 200 characters"),
            Length(min=1, message="Location Name must be at least 1 character"),
        ],
    )
    going = BooleanField("going")
    host = BooleanField("host")
    eventId = IntegerField(
        "eventId",
        validators=[DataRequired(), check_eventId],
    )
    userId = IntegerField("userId", validators=[check_creatorUserId, Optional()])
