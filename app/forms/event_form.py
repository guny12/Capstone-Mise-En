from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField, IntegerField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, Optional
from app.models import User
import datetime


# def check_creatorUserId(form, field):
#     userId = field.data
#     user = User.query.filter(User.id == userId)
#     if not user:
#         raise ValidationError("Invalid Credentials")


def check_date(form, field):
    date = field.data
    today = datetime.date.today()
    if date < today:
        raise ValidationError("Please pick a date that hasn't passed")


def check_startTime(form, field):
    targetDate = form.date.data
    startTime = str(field.data)
    today = str(datetime.date.today())
    targetTime = today + " " + startTime
    targetTime = datetime.datetime.strptime(targetTime, "%Y-%m-%d %H:%M:%S")
    today = datetime.date.today()
    now = datetime.datetime.now()
    if targetTime < now and targetDate <= today:
        raise ValidationError("Please pick a time that hasn't passed")


class CreateEventForm(FlaskForm):
    eventName = StringField(
        "eventName",
        validators=[
            DataRequired(),
            Length(max=100, message="Name can be max 100 characters"),
            Length(min=1, message="Name must be at least 1 character"),
        ],
    )
    locationName = StringField(
        "locationName",
        validators=[
            DataRequired(),
            Length(max=200, message="Location Name can be max 200 characters"),
            Length(min=1, message="Location Name must be at least 1 character"),
        ],
    )
    location = StringField(
        "location",
        validators=[
            DataRequired(),
            Length(max=400, message="Location can be max 400 characters"),
            Length(min=1, message="Location Name must be at least 1 character"),
        ],
    )
    date = DateField("date", validators=[DataRequired(), check_date])
    startTime = TimeField("startTime", validators=[DataRequired(), check_startTime])
    type = StringField("type", validators=[DataRequired()])
    totalCost = DecimalField("totalCost", validators=[NumberRange(min=0), Optional()])
    availableSpots = IntegerField("availableSpots", validators=[NumberRange(min=0), Optional()])
    thingsNeeded = StringField("thingsNeed", validators=[Optional()])
    # creatorUserId = IntegerField("creatorUserId", validators=[check_creatorUserId, Optional()])
