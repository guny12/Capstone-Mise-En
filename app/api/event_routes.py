from datetime import datetime
from flask import Blueprint, request,
from app.models import User, Event, Attendee,

event_routes = Blueprint("event", __name__)


# Create Event
@event_routes.route("/", methods=["POST"])
def create_event():
    body = request.json

# DELETE Event
