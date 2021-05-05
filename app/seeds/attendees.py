from faker import Faker
from app.models import db, Attendee

faker = Faker()


def seed_attendees():
    attendeeURLs = []

    for i in range(50):
        attendeeURLs.append(faker.sha256())
        attendee = Attendee(
            contactInfo=f"Phone Number: {faker.phone_number()}",
            attendeeEmail=faker.email(),
            attendeeURL=attendeeURLs[i],
            going=faker.boolean(),
            eventId=i + 1 if i <= 19 else faker.random_int(1, 20),
        )

        db.session.add(attendee)
    db.session.commit()
    return attendeeURLs
