from .db import db
from sqlalchemy.orm import relationship
from datetime import datetime


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    eventName = db.Column(db.String(100), nullable=False)
    locationName = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(400), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    startTime = db.Column(db.Time, nullable=False)
    type = db.Column(db.String(100), nullable=False)
    totalCost = db.Column(db.Numeric(scale=2, asdecimal=False), nullable=True)
    availableSpots = db.Column(db.Integer)
    thingsNeeded = db.Column(db.Text)
    creatorUserId = db.Column(db.Integer, db.ForeignKey("users.id"))
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    eventAttendees = relationship("Attendee", backref="attendeeEvent", cascade="all, delete")
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
