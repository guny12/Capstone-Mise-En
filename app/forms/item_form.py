from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, Optional
from app.models import Item, Mealplan, Attendee


def check_mealPlanId(form, field):
    mealPlanId = field.data
    mealplan = Mealplan.query.filter(Mealplan.id == mealPlanId).first()
    if not mealplan:
        raise ValidationError("Mealplan does not exist")


def check_whoBring(form, field):
    attendeeURL = field.data
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if not attendee:
        raise ValidationError("Attendee does not exist")


def thing_exists(form, field):
    mealplanId = form.mealPlanId.data
    thing = field.data
    thingExists = Item.query.filter(Item.thing.lower() == thing.lower(), Item.mealPlanId == mealplanId).first()
    if thingExists:
        raise ValidationError("Item already exists in this mealplan")


class CreateItemForm(FlaskForm):
    thing = StringField(
        "thing",
        validators=[
            DataRequired(),
            Length(max=100, message="Thing can be max 100 characters"),
            Length(min=1, message="Thing must be at least 1 character"),
            thing_exists,
        ],
    )
    mealPlanId = IntegerField(
        "mealPlanId",
        validators=[DataRequired(), check_mealPlanId],
    )
    quantity = IntegerField(
        "quantity",
        validators=[DataRequired(), NumberRange(min=0)],
    )
    # put a validator to select form a list of specific units later
    unit = StringField(
        "unit",
        validators=[
            DataRequired(),
            Length(max=100, message="Unit can be max 100 characters"),
            Length(min=1, message="Unit must be at least 1 character"),
        ],
    )
    whoBring = StringField("whoBring", validators=[Optional(), check_whoBring])
