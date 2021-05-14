from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Mealplan, Event, Item
from app.forms.mealplan_form import CreateMealplanForm
from . import validation_errors_to_error_messages

mealplan_routes = Blueprint("mealplan", __name__)


# get all Mealplans that are inside an event Route
# /mealplan/${eventid}
@mealplan_routes.route("/<int:eventId>", methods=["GET"])
def get_event_mealplans(eventId):
    Mealplans = Mealplan.query.filter(Mealplan.eventId == eventId).all()
    if Mealplans is None:
        return {"errors": "Event does not exist"}, 400
    mealplans = {}
    for mealplan in Mealplans:
        mealplans[mealplan.id] = mealplan.to_dict()

    return {"Mealplans": mealplans}
