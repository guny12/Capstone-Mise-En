from datetime import datetime
from flask import Blueprint, request
from app.models import User, Event, Attendee
from app.forms.createEvent_form import CreateEventForm
from . import validation_errors_to_error_messages

event_routes = Blueprint("event", __name__)


# Create Event
@event_routes.route("/", methods=["POST"])
def create_event():
    form = CreateEventForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        print("THIS HAPPENED\n\n\n\n\n\n\n")
        body = request.json
        return {"message": "success"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# DELETE Event
