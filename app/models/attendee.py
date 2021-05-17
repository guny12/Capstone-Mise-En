from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Attendee(db.Model):
    __tablename__ = "attendees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    contactInfo = db.Column(db.String(250))
    attendeeEmail = db.Column(db.String(50))
    attendeeURL = db.Column(db.String(64), nullable=False)
    going = db.Column(db.Boolean, default=False)
    host = db.Column(db.Boolean, default=False)
    eventId = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    attendeeComments = relationship("Comment", backref="commentAttendee", cascade="all,delete")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "contactInfo": self.contactInfo,
            "attendeeURL": self.attendeeURL,
            # "attendeeEmail": self.attendeeEmail,
            "going": self.going,
            "host": self.host,
            "eventId": self.eventId,
            "userId": self.userId,
        }

    def attendee_dict(self):
        return {
            "name": self.name,
            "contactInfo": self.contactInfo,
            # "attendeeEmail": self.attendeeEmail,
            "going": self.going,
            "host": self.host,
            "id": self.id,
        }
