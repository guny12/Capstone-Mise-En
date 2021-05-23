from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Mealplan, Event, Item, Attendee
from app.forms.item_form import CreateItemForm
from . import validation_errors_to_error_messages

item_routes = Blueprint("item", __name__)


def authenticate_attendee(attendeeURL):
    """
    Authenticates a attendee exists.
    """
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    return "error" if attendee is None else attendee


def authenticate_attendeeHost(attendeeURL):
    """
    Authenticates a attendee is Host.
    """
    attendee = Attendee.query.filter(
        Attendee.attendeeURL == attendeeURL,
        Attendee.host == True,
    ).first()
    return "error" if attendee is None else attendee


def verify_item(itemId):
    """
    Verify item exists.
    """
    item = Item.query.filter(Item.id == itemId).first()
    return "error" if item is None else item


@item_routes.route("/<string:attendeeURL>", methods=["POST"])
def create_items(attendeeURL):
    """
    Create a item inside an mealplan after confirming userURL and permission
    """
    form = CreateItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    attendee = authenticate_attendeeHost(attendeeURL)
    if attendee == "error":
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


@item_routes.route("/<string:attendeeURL>/<int:mealPlanId>", methods=["GET"])
def get_items(attendeeURL, mealPlanId):
    """
    Get all items that are inside an mealplan Route. If no items, returns an empty object/dict.
    """
    attendee = authenticate_attendee(attendeeURL)
    if attendee == "error":
        return {"errors": "No permission to modify this Event"}, 400
    mealplan = Mealplan.query.filter(Mealplan.eventId == attendee.eventId, Mealplan.id == mealPlanId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist"}, 400
    Items = Item.query.filter(Item.mealPlanId == mealPlanId).all()
    items = {}
    for item in Items:
        items[item.id] = item.to_dict()
    return {"Items": items}


@item_routes.route("/<int:itemId>", methods=["PATCH"])
def edit_items(itemId):
    """
    Edit a item inside an mealplan after confirming userURL and permission
    """
    body = request.json
    attendeeURL = body["attendeeURL"]
    attendee = authenticate_attendeeHost(attendeeURL)
    if attendee == "error":
        return {"errors": "No permission to modify this Event"}, 400
    item = verify_item(itemId)
    if item == "error":
        return {"errors": "Item does not exist"}, 400
    mealplan = Mealplan.query.filter(Mealplan.eventId == attendee.eventId, Mealplan.id == item.mealPlanId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist"}, 400
    form = CreateItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        item.thing = body["thing"]
        item.quantity = body["quantity"]
        item.unit = body["unit"]
        item.whoBring = body["whoBring"] if body["whoBring"] is not None and body["whoBring"] != "" else None
        item.updatedAt = datetime.now()
        db.session.commit()
        return {"CurrentItem": item.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@item_routes.route("/<int:itemId>", methods=["DELETE"])
def delete_items(itemId):
    """
    Delete a item inside an mealplan after confirming userURL and permission
    """
    attendeeURL = request.json
    attendee = authenticate_attendeeHost(attendeeURL)
    if attendee == "error":
        return {"errors": "No permission to modify this Event"}, 400
    item = verify_item(itemId)
    if item == "error":
        return {"errors": "Item does not exist"}, 400
    mealplan = Mealplan.query.filter(Mealplan.eventId == attendee.eventId, Mealplan.id == item.mealPlanId).first()
    if mealplan is None:
        return {"errors": "Mealplan does not exist"}, 400
    db.session.delete(item)
    db.session.commit()
    return {"mealplanId": mealplan.id}
