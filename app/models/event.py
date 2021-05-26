from .db import db
from flask_login import current_user
from sqlalchemy.orm import relationship
from datetime import datetime

# from app.models import Attendee


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    eventName = db.Column(db.String(50), nullable=False)
    locationName = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(400), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    startTime = db.Column(db.Time, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    totalCost = db.Column(db.Numeric(scale=2, asdecimal=False), nullable=True)
    availableSpots = db.Column(db.Integer)
    thingsNeeded = db.Column(db.Text)
    creatorUserId = db.Column(db.Integer, db.ForeignKey("users.id"))
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    eventAttendees = relationship(
        "Attendee",
        primaryjoin="Event.id==Attendee.eventId",
        backref="attendeeEvent",
        cascade="all, delete",
    )
    eventMealplans = relationship("Mealplan", backref="mealplanEvent", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "eventName": self.eventName,
            "locationName": self.locationName,
            "location": self.location,
            "description": self.description,
            "date": self.date,
            "startTime": str(self.startTime),
            "type": self.type,
            "totalCost": self.totalCost if self.totalCost is not None else None,
            "availableSpots": self.availableSpots,
            "thingsNeeded": self.thingsNeeded,
            "creatorUserId": self.creatorUserId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

    def to_user_dict(self):
        return {
            "id": self.id,
            "eventName": self.eventName,
            "locationName": self.locationName,
            "date": self.date,
            "startTime": str(self.startTime),
            "type": self.type,
            "attendeeURL": [
                attendee.attendeeURL for attendee in self.eventAttendees if attendee.userId == current_user.id
            ]
            # "attendeeURL": self.eventAttendees.query.filter(
            #     self.eventAttendees.userId == current_user.id, self.eventAttendees.eventId == self.id
            # )
            # .first()
            # .attendeeURL,
        }

    # def test(self):
    #     # return {"attendeeURL": [attendee.id for attendee in self.eventAttendees]}
    #     return {
    #         "attendeeURL": [attendee.attendeeURL for attendee in self.eventAttendees if attendee.userId == current_user]
    #     }
