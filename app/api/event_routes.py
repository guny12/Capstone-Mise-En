from datetime import datetime
from faker import Faker
from flask import Blueprint, request
from flask_login import current_user
from app.models import User, Event, Attendee, db
from app.forms.event_form import CreateEventForm
from . import validation_errors_to_error_messages

faker = Faker()
event_routes = Blueprint("event", __name__)


# Create Event
@event_routes.route("/", methods=["POST"])
def create_event():
    form = CreateEventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        body = request.json
        eventName = body["eventName"]
        locationName = body["locationName"]
        location = body["location"]
        description = body["description"]
        date = body["date"]
        startTime = body["startTime"]
        type = body["type"]
        totalCost = body["totalCost"] if "totalCost" in body else None
        availableSpots = body["availableSpots"] if "availableSpots" in body else None
        thingsNeeded = body["thingsNeeded"] if "thingsNeeded" in body else None
        creatorUserId = body["creatorUserId"] if "creatorUserId" in body else None

        newEvent = Event(
            eventName=eventName,
            locationName=locationName,
            location=location,
            description=description,
            date=date,
            startTime=startTime,
            type=type,
            totalCost=totalCost,
            availableSpots=availableSpots,
            thingsNeeded=thingsNeeded,
            creatorUserId=creatorUserId,
        )
        db.session.add(newEvent)
        db.session.commit()
        return {"CurrentEvent": newEvent.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Update Event
@event_routes.route("/<int:eventId>", methods=["PATCH"])
def update_event(eventId):
    form = CreateEventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        event = Event.query.get(eventId)
        body = request.json
        attendee = Attendee.query.filter(Attendee.attendeeURL == body["attendeeURL"], Attendee.host == True).first()
        if attendee is None:
            return {"errors": "No permission to modify this event"}
        event.eventName = body["eventName"]
        event.locationName = body["locationName"]
        event.location = body["location"]
        event.description = body["description"]
        event.date = body["date"]
        event.startTime = body["startTime"]
        event.type = body["type"]
        event.totalCost = body["totalCost"] if body["totalCost"] is not None and body["totalCost"] != "" else None
        event.availableSpots = (
            body["availableSpots"] if body["availableSpots"] is not None and body["availableSpots"] != "" else None
        )
        event.thingsNeeded = (
            body["thingsNeeded"] if body["thingsNeeded"] is not None and body["thingsNeeded"] != "" else None
        )
        event.updatedAt = datetime.now()
        db.session.commit()
        return {"CurrentEvent": event.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# checkEvent
@event_routes.route("/check", methods=["POST"])
def check_event():
    form = CreateEventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        return {"eventDataOk": True}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# getEvent Route
@event_routes.route("/<int:eventId>", methods=["GET"])
def get_event(eventId):
    event = Event.query.get(eventId)
    if event is None:
        return {"errors": "Event does not exist"}, 400
    return {"CurrentEvent": event.to_dict()}


# deleteEvent Route
@event_routes.route("/<int:eventId>/<string:attendeeURL>", methods=["DELETE"])
def delete_event(eventId, attendeeURL):
    host = Attendee.query.filter(
        Attendee.host == True, Attendee.attendeeURL == attendeeURL, Attendee.eventId == eventId
    ).first()
    event = Event.query.get(eventId)
    # prevent people from deleting demo events
    if host is None or 1 <= event.id <= 20:
        return {"errors": "You do not have permission to delete this event"}, 401

    db.session.delete(event)
    db.session.commit()
    return {"message": "success"}
