from datetime import datetime
from faker import Faker
from flask import Blueprint, request
from flask_login import current_user
from app.models import User, Event, Attendee, db
from app.forms.attendee_form import CreateAttendeeForm
from . import validation_errors_to_error_messages

faker = Faker()

attendee_routes = Blueprint("attendee", __name__)


#  Create Attendee for eventId
@attendee_routes.route("/<int:eventId>", methods=["POST"])
def create_attendee(eventId):
    form = CreateAttendeeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["eventId"].data = eventId

    if form.validate_on_submit():
        body = request.json
        name = body["name"]
        contactInfo = body["contactInfo"] if "contactInfo" in body else None
        attendeeEmail = body["attendeeEmail"] if "attendeeEmail" in body else None

        userId = body["userId"] if "userId" in body else None

        firstAttendee = True if Attendee.query.filter(Attendee.eventId == eventId).first() is None else False
        host = True if firstAttendee or body["host"] == True else False
        going = True if firstAttendee or "going" in body and body["going"] == True else False
        newURL = faker.sha256()
        uniqueURL = True if Attendee.query.filter(Attendee.attendeeURL == newURL).first() is None else False
        attendeeURL = newURL if uniqueURL else faker.sha256()

        newAttendee = Attendee(
            name=name,
            contactInfo=contactInfo,
            attendeeURL=attendeeURL,
            attendeeEmail=attendeeEmail,
            going=going,
            host=host,
            eventId=eventId,
            userId=userId,
        )
        db.session.add(newAttendee)
        db.session.commit()
        return {"newAttendee": newAttendee.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# get Current Attendee
@attendee_routes.route("/<string:attendeeURL>", methods=["GET"])
def get_attendee(attendeeURL):
    userId = current_user.id if current_user.is_active else None
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if attendee is None:
        return {"errors": "Attendee does not exist"}, 400

    # if there's an active user, then this attendee url is now assigned to them.
    elif attendee.userId is None and userId:
        attendee.userId = userId
        attendee.updatedAt = datetime.now()
        db.session.commit()

    # if there was a useraccount this attendee belongs to, force them to log in to access.
    elif attendee.userId is not None and attendee.userId != userId:
        return {"errors": "You are not the user. Please log in to access"}, 401
    return {"CurrentAttendee": attendee.to_dict()}


# Delete Attendee and event if Attendee was the last host
@attendee_routes.route("/<string:attendeeURL>", methods=["DELETE"])
def delete_attendee(attendeeURL):
    userId = current_user.id if current_user.is_active else None
    attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
    if attendee is None:
        return {"errors": "Attendee does not exist"}, 400

    # check if there's another host in the event they're making. otherwise event will be deleted.
    elif attendee.host is True:
        allHosts = Attendee.query.filter(Attendee.host == True, Attendee.eventId == attendee.eventId).all()
        event = Event.query.get(attendee.eventId)
        if len(allHosts) == 1 and event:
            db.session.delete(event)
    db.session.delete(attendee)
    db.session.commit()
    return {"message": "success"}


# checkAttendee
@attendee_routes.route("/check", methods=["POST"])
def check_attendee():
    form = CreateAttendeeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        return {"attendeeDataOk": True}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE Event
