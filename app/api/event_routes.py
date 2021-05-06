from datetime import datetime
from flask import Blueprint, request
from app.models import User, Event, Attendee, db
from app.forms.createEvent_form import CreateEventForm
from . import validation_errors_to_error_messages

event_routes = Blueprint("event", __name__)


# Create Event
@event_routes.route("/", methods=["POST"])
def create_event():
    form = CreateEventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        body = request.json
        name = body["name"]
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
            name=name,
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
        return {"message": "success"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE Event
