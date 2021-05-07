from datetime import datetime
from faker import Faker
from flask import Blueprint, request
from flask_login import current_user
from app.models import User, Event, Attendee, db
from app.forms.event_form import CreateEventForm
from app.forms.attendee_form import CreateAttendeeForm
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
    event = Event.get(eventId)
    if event is None:
        return {"errors": "Event does not exist"}, 400
    return {"CurrentEvent": event.to_dict()}


# deleteEvent Route
@event_routes.route("/<int:eventId>/<string:attendeeURL>", methods=["DELETE"])
def delete_event(eventId, attendeeURL):
    print(attendeeURL, eventId, "\n\n\n\n\n THIS \n\n\n\n")
    host = Attendee.query.filter(
        Attendee.host == True, Attendee.attendeeURL == attendeeURL, Attendee.eventId == eventId
    ).first()
    if host is None:
        return {"errors": "You do not have permission to delete this event"}, 401
    event = Event.query.get(eventId)
    db.session.delete(event)
    db.session.commit()
    return {"message": "success"}
