from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Attendees(db.Model):
    __tablename__ = 'attendees'

    id = db.Column(db.Integer, primary_key=True)
    contactInfo = db.Column(db.String(250))
    attendeeEmail= db.Column(db.String(200), nullable=False)
    attendeeURL=db.Column(db.Text, nullable=False)
    going=db.Column(db.Boolean, default=False)
    eventId=db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
      return {
        "id": self.id,
        "contactInfo": self.contactInfo,
        "attendeeEmail": self.attendeeEmail,
        "going": self.going,
        "eventId": self.eventId,
        }
