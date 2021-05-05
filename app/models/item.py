from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    mealPlanId = db.Column(db.Integer, db.ForeignKey("mealplans.id"), nullable=False)
    thing = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "mealPlanId": self.mealPlanId,
            "thing": self.thing,
            "quantity": self.quantity,
            "unit": self.unit,
        }
