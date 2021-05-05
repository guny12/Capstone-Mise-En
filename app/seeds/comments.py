from faker import Faker
from app.models import db, Comment

faker = Faker()


def seed_comments():
    for i in range(49):
        comment = Comment(
            attendeeId=i + 1,
            comment=faker.sentence(),
        )

        db.session.add(comment)
    db.session.commit()
