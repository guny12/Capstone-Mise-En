from .db import db
from sqlalchemy.orm import relationship, validates
from datetime import datetime, date, time


class Events(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    hostName= db.Column(db.String(50), nullable=False)
    hostContact= db.Column(db.String(250))
    hostEmail= db.Column(db.String(200), nullable=False)
    hostURL=db.Column(db.Text, nullable=False)
    name= db.Column(db.String(100), nullable=False)
    locationName= db.Column(db.String(200), nullable=False)
    location= db.Column(db.String(400), nullable=False)
    description= db.Column(db.Text, nullable=False)
    date= db.Column(db.Date, nullable=False)
    startTime= db.Column(db.Time, nullable=False)
    type= db.Column(db.String(100), nullable=False)
    totalCost= db.Column(db.DECIMAL(asdecimal=False))
    availableSpots= db.Column(db.Integer)
    thingsNeeded= db.Column(db.Text)
    hostId=db.Column(db.Integer, db.ForeignKey("users.id"))
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    @validates('date')
    def validate_date(self,key,date):
        assert date >= datetime.today()
        return date

    def to_dict(self):
      return {
            "id": self.id,
            "hostName": self.hostName,
            "hostContact": self.hostContact,
            "hostEmail": self.hostEmail,
            "hostURL": self.hostURL,
            "name": self.name,
            "locationName": self.locationName,
            "location": self.location,
            "description": self.description,
            "date": self.date,
            "startTime": self.startTime,
            "type": self.type,
            "totalCost": self.totalCost,
            "availableSpots": self.availableSpots,
            "thingsNeeded": self.thingsNeeded,
            "hostId": self.hostId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
