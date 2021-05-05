from faker import Faker
from app.models import db, User

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_users():
    demoUser = User(
        firstName="Demo", lastName="User", email="demo@user.iocom", username="demoUser", password="password"
    )
    db.session.add(demoUser)
    for i in range(50):
        demo = User(
            firstName=faker.first_name(),
            lastName=faker.last_name(),
            email=faker.email(),
            username=faker.simple_profile()["username"],
            password=faker.password(length=10),
        )

        db.session.add(demo)

    db.session.commit()
