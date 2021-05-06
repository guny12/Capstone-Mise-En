from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, Optional
from app.models import User, Event, Attendee
import datetime


def check_creatorUserId(form, field):
    userId = field.data
    user = User.query.filter(User.id == userId)
    if not user:
        raise ValidationError("Invalid Credentials")


def check_eventId(form, field):
    userId = field.data
    user = User.query.filter(User.id == userId)
    if not user:
        raise ValidationError("Invalid Credentials")


class CreateAttendeeForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(),
            Length(max=250, message="Name can be max 250 characters"),
            Length(min=1, message="Name must be at least 1 character"),
        ],
    )
    contactInfo = StringField(
        "contactInfo",
        validators=[
            DataRequired(),
            Length(max=250, message="Location Name can be max 250 characters"),
            Length(min=1, message="Location Name must be at least 1 character"),
        ],
    )
    eventId = IntegerField(
        "eventId",
        validators=[
            DataRequired(),
        ],
    )
    userId = IntegerField("userId", validators=[check_creatorUserId, Optional()])
