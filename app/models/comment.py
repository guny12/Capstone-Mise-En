from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    commenterURL = db.Column(
        db.Text, db.ForeignKey("attendees.attendeeURL"), db.ForeignKey("events.hostURL"), nullable=False
    )
    eventId = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    comment = db.Column(db.String(250), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "eventId": self.eventId,
        }
