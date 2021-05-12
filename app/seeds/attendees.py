from faker import Faker
from app.models import db, Attendee

faker = Faker()


def seed_attendees():

    for i in range(50):
        attendee = Attendee(
            name=faker.name(),
            contactInfo=f"Phone Number: {faker.phone_number()}",
            attendeeEmail=faker.email(),
            attendeeURL=faker.sha256(),
            going=faker.boolean(),
            eventId=i + 1 if i <= 19 else faker.random_int(1, 20),
            host=True,
        )
        db.session.add(attendee)

    for i in range(20):
        attendee = Attendee(
            name=faker.name(),
            contactInfo=f"Phone Number: {faker.phone_number()}",
            attendeeEmail=faker.email(),
            attendeeURL=faker.sha256(),
            going=faker.boolean(),
            eventId=i + 1 if i <= 19 else faker.random_int(1, 20),
            host=True,
            userId=1 if i <= 10 else 2,
        )
        db.session.add(attendee)
    db.session.commit()
