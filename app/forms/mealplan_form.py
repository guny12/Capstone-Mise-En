from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.fields.core import
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import  Event


def check_eventId(form, field):
    eventId = field.data
    event = Event.query.filter(Event.id == eventId).first()
    if not event:
        raise ValidationError("Event does not exist")


class CreateMealplanForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(),
            Length(max=100, message="Name can be max 100 characters"),
            Length(min=1, message="Name must be at least 1 character"),
        ],
    )
    eventId = IntegerField(
        "eventId",
        validators=[DataRequired(), check_eventId],
    )
