from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Mealplan, Event, Item, Attendee
from app.forms.item_form import CreateItemForm
from . import validation_errors_to_error_messages

item_routes = Blueprint("item", __name__)


# create a item inside an mealplan after confirming userURL and permission
@item_routes.route("/<string:attendeeURL>", methods=["POST"])
def create_items(attendeeURL):
    form = CreateItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    attendee = Attendee.query.filter(
        Attendee.attendeeURL == attendeeURL,
        Attendee.host == True,
    ).first()
    if attendee is None:
        return {"errors": "No permission to modify this Event"}, 400
    mealPlanId = request.json["mealPlanId"] if "mealPlanId" in request.json else None
    mealplan = Mealplan.query.filter(
        Mealplan.eventId == attendee.eventId,
        Mealplan.id == mealPlanId,
    ).first()
    if mealplan is None or mealPlanId is None:
        return {"errors": "Mealplan does not exist"}, 400

    if form.validate_on_submit():
        thing = request.json["thing"]
        quantity = request.json["quantity"]
        unit = request.json["unit"]
        mealPlanId = request.json["mealPlanId"]
        newItem = Item(
            mealPlanId=mealPlanId,
            thing=thing,
            quantity=quantity,
            unit=unit,
            whoBring=None,
        )
        db.session.add(newItem)
        db.session.commit()
        return {"CurrentItem": newItem.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# get all items that are inside an mealplan Route
@item_routes.route("/<string:attendeeURL>", methods=["GET"])
def get_items(attendeeURL):
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if attendee is None:
        return {"errors": "Attendee does not exist"}
    Mealplans = Mealplan.query.filter(Mealplan.eventId == attendee.eventId).all()
    if Mealplans is None:
        return {"errors": "Event does not exist"}, 400
    mealplans = {}
    for mealplan in Mealplans:
        mealplans[mealplan.id] = mealplan.to_dict()
    # if no mealplans, this returns an empty object back
    return {"Mealplans": mealplans}


# Delete a item inside an mealplan after confirming userURL and permission
@item_routes.route("/<int:mealPlanId>", methods=["DELETE"])
def delete_items(mealPlanId):
    attendeeURL = request.json["attendeeURL"]
    attendee = Attendee.query.filter(
        Attendee.attendeeURL == attendeeURL, Attendee.host == True, Attendee.eventId == eventId
    ).first()
    if attendee is None:
        return {"errors": "No permission to modify this Event"}, 400
    mealplanId = request.json["mealplanId"]
    mealplan = Mealplan.query.filter(Mealplan.id == mealplanId, Mealplan.eventId == eventId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist"}, 400
    db.session.delete(mealplan)
    db.session.commit()
    return {"message": "success"}
