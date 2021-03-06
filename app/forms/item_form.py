from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, Optional
from app.models import Item, Mealplan


def check_mealPlanId(form, field):
    mealPlanId = field.data
    mealplan = Mealplan.query.filter(Mealplan.id == mealPlanId).first()
    if not mealplan:
        raise ValidationError("Mealplan does not exist")


def thing_exists(form, field):
    mealplanId = form.mealPlanId.data
    thing = field.data
    thingExists = Item.query.filter(
        Item.thing == thing, Item.mealPlanId == mealplanId, Item.id != form.itemId.data
    ).first()
    if thingExists:
        raise ValidationError("Item already exists in this mealplan")


class CreateItemForm(FlaskForm):
    thing = StringField(
        "thing",
        validators=[
            DataRequired(),
            Length(max=50, message="Thing can be max 50 characters"),
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
    # put a validator to select form a list of specific units later, to stop people from making false units?
    unit = StringField(
        "unit",
        validators=[
            DataRequired(),
            Length(max=50, message="Unit can be max 50 characters"),
            Length(min=1, message="Unit must be at least 1 character"),
        ],
    )
    itemId = IntegerField("itemId", validators=[Optional(), NumberRange(min=0)])
