from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Mealplan(db.Model):
    __tablename__ = "mealplans"

    id = db.Column(db.Integer, primary_key=True)
    eventId = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "contactInfo": self.contactInfo,
            "attendeeEmail": self.attendeeEmail,
            "going": self.going,
            "eventId": self.eventId,
        }
