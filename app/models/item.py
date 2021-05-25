from .db import db
from datetime import datetime
from app.models import Attendee


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    mealPlanId = db.Column(db.Integer, db.ForeignKey("mealplans.id"), nullable=False)
    thing = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(50), nullable=False)
    whoBring = db.Column(db.String(64))
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def check_whoBring(self, attendeeURL):
        attendee = Attendee.query.filter(Attendee.attendeeURL == attendeeURL).first()
        if attendee is None:
            return None
        return attendee.name

    def to_dict(self):
        return {
            "id": self.id,
            "mealPlanId": self.mealPlanId,
            "thing": self.thing,
            "quantity": self.quantity,
            "unit": self.unit,
            "whoBring": self.check_whoBring(self.whoBring),
            "updatedAt": self.updatedAt,
        }
