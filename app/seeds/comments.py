from faker import Faker
from app.models import db, Comment

faker = Faker()


def seed_comments(attendeeURLs):
    for i in range(50):
        comment = Comment(
            commenterURL=attendeeURLs[i],
            eventId=i + 1 if i <= 19 else faker.random_int(1, 20),
        )

        db.session.add(comment)
    db.session.commit()
