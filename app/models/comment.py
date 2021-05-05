from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    attendeeId = db.Column(db.Integer, db.ForeignKey("attendees.id"), nullable=False)
    comment = db.Column(db.String(250), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "attendeeId": self.attendeeId,
            "comment": self.comment,
            "createdAt": self.createdAt,
        }
