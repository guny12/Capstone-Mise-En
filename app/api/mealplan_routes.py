from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Mealplan, Event, Item, Attendee
from app.forms.mealplan_form import CreateMealplanForm
from . import validation_errors_to_error_messages

mealplan_routes = Blueprint("mealplan", __name__)


# get all Mealplans that are inside an event Route
@mealplan_routes.route("/<string:attendeeURL>", methods=["GET"])
def get_mealplans(attendeeURL):
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if attendee is None:
        return {"errors": "Attendee does not exist, a host may have deleted it. Please refresh page"}, 400
    Mealplans = Mealplan.query.filter(Mealplan.eventId == attendee.eventId).all()
    if Mealplans is None:
        return {"errors": "Event does not exist, a host may have deleted it. Please refresh page"}, 400
    mealplans = {}
    for mealplan in Mealplans:
        mealplans[mealplan.id] = mealplan.to_dict()
    # if no mealplans, this returns an empty object back
    return {"Mealplans": mealplans}


# get current Mealplan after editing or accessing single one
@mealplan_routes.route("/current/<int:mealplanId>/<string:attendeeURL>", methods=["GET"])
def get_mealplan(mealplanId, attendeeURL):
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if attendee is None:
        return {"errors": "Attendee does not exist, a host may have deleted it. Please refresh page"}, 400
    mealplan = Mealplan.query.filter(Mealplan.id == mealplanId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist, a host may have deleted it. Please refresh page"}, 400
    return {"CurrentMealplan": mealplan.to_dict()}


# create a mealplan inside an event after confirming userURL and permission
@mealplan_routes.route("/<int:eventId>", methods=["POST"])
def create_mealplan(eventId):
    form = CreateMealplanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        name = request.json["name"]
        attendeeURL = request.json["attendeeURL"]
        attendee = Attendee.query.filter(
            Attendee.attendeeURL == attendeeURL, Attendee.host == True, Attendee.eventId == eventId
        ).first()
        if attendee is None:
            return {"errors": "No permission to modify this Event"}, 400
        newMealplan = Mealplan(
            eventId=eventId,
            name=name,
        )
        db.session.add(newMealplan)
        db.session.commit()
        return {"currentMealPlan": newMealplan.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Delete a mealplan inside an event after confirming userURL and permission
@mealplan_routes.route("/<int:eventId>", methods=["DELETE"])
def delete_mealplan(eventId):
    attendeeURL = request.json["attendeeURL"]
    attendee = Attendee.query.filter(
        Attendee.attendeeURL == attendeeURL, Attendee.host == True, Attendee.eventId == eventId
    ).first()
    if attendee is None:
        return {"errors": "No permission to modify this Event"}, 400
    mealplanId = request.json["mealplanId"]
    mealplan = Mealplan.query.filter(Mealplan.id == mealplanId, Mealplan.eventId == eventId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist, a host may have deleted it. Please refresh page"}, 400
    db.session.delete(mealplan)
    db.session.commit()
    return {"message": "success"}


# edit a mealplan inside an event after confirming userURL and permission
@mealplan_routes.route("/<int:eventId>", methods=["PATCH"])
def edit_mealplan(eventId):
    attendeeURL = request.json["attendeeURL"]
    attendee = Attendee.query.filter(
        Attendee.attendeeURL == attendeeURL, Attendee.host == True, Attendee.eventId == eventId
    ).first()
    if attendee is None:
        return {"errors": "No permission to modify this Event"}, 400
    mealplanId = request.json["mealplanId"]
    mealplan = Mealplan.query.filter(Mealplan.id == mealplanId, Mealplan.eventId == eventId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist, a host may have deleted it. Please refresh page"}, 400
    name = request.json["name"]
    if len(name) >= 1 and len(name) <= 100:
        mealplan.name = name
        mealplan.updatedAt = datetime.now()
        db.session.commit()
        return {"message": "success"}
    else:
        return {"errors": "Mealplan must be between 1 and 100 characters"}, 400
