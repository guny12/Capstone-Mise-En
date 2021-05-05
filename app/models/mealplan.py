from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Mealplan(db.Model):
    __tablename__ = "mealplans"

    id = db.Column(db.Integer, primary_key=True)
    eventId = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "eventId": self.eventId,
            "updatedAt": self.updatedAt,
        }
