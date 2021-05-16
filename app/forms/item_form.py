from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Item, Mealplan


def check_mealPlanId(form, field):
    mealPlanId = field.data
    mealplan = Mealplan.query.filter(Mealplan.id == mealPlanId).first()
    if not mealplan:
        raise ValidationError("Mealplan does not exist")


class CreateItemForm(FlaskForm):
    thing = StringField(
        "thing",
        validators=[
            DataRequired(),
            Length(max=100, message="Thing can be max 100 characters"),
            Length(min=1, message="Thing must be at least 1 character"),
        ],
    )
    mealPlanId = IntegerField(
        "mealPlanId",
        validators=[DataRequired(), check_mealPlanId],
    )
