from faker import Faker
from app.models import db, Attendee
from datetime import datetime
faker = Faker()

types=["public", "private", "catered"]
eventName=["party", "fiesta", "get-together", "cook-off"]
place=["house", "apartment", "loft", "yard"]

def seed_attendees():
    for i in range(50):
        attendee = Attendee(
     contactInfo =
    attendeeEmail= db.Column(db.String(200), nullable=False)
    attendeeURL=db.Column(db.Text, nullable=False)
    going=db.Column(db.Boolean, default=False)
    eventId=db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
        )

        db.session.add(attendee)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key

def undo_attendees():
    db.session.execute('''TRUNCATE TABLE attendees CASCADE;''')
    db.session.execute('''ALTER SEQUENCE attendees_id_seq RESTART WITH 1;''')
    db.session.commit()
