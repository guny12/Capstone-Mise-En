from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Mealplan, Event, Item, Attendee
from app.forms.mealplan_form import CreateMealplanForm
from . import validation_errors_to_error_messages

mealplan_routes = Blueprint("mealplan", __name__)


# get all Mealplans that are inside an event Route
# /mealplan/${eventid}
@mealplan_routes.route("/<int:eventId>", methods=["GET"])
def get_mealplans(eventId):
    Mealplans = Mealplan.query.filter(Mealplan.eventId == eventId).all()
    if Mealplans is None:
        return {"errors": "Event does not exist"}, 400
    mealplans = {}
    for mealplan in Mealplans:
        mealplans[mealplan.id] = mealplan.to_dict()
    return {"Mealplans": mealplans}


# create a mealplan inside an event after confirming userURL and permission
@mealplan_routes.route("/<int:eventId>", methods=["POST"])
def create_mealplans(eventId):
    form = CreateMealplanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        name = request.json["name"]
        attendeeURL = request.json["attendeeURL"]
        attendee = Attendee.query.filter(
            Attendee.attendeeURL == attendeeURL, Attendee.host == True, Attendee.eventId == eventId
        ).first()
        if attendee is None:
            return {"errors": "No permission to modify this Event"}
        newMealplan = Mealplan(
            eventId=eventId,
            name=name,
        )
        db.session.add(newMealplan)
        db.session.commit()
        return {"currentMealPlan": newMealplan.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
