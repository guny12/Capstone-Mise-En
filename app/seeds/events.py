from faker import Faker
from app.models import db, Events
faker = Faker()

types=["public", "private", "catered"]

def seed_users():
    for i in range(20):
        event = Events(
        hostName= faker.first_name()
        hostContact= faker.phone_number()
        hostEmail= faker.email()
        hostURL=faker.sha256()
        name= f"{faker.name()} place"
        locationName= faker.name()
        location= faker.address()
        description= faker.paragraph(nb_sentences=3)
        date= faker.date_between(start_date='+2y', end_date='+10y')
        startTime= faker.time()
        type= faker.words(1, types, True)
        totalCost= faker.random_int(10,1000)
        availableSpots=faker.random_int(1,20)
        thingsNeeded= "None"
        hostId=1
        )

        db.session.add(event)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and ALTER SEQUENCE resets
# the auto incrementing primary key

def undo_events():
    db.session.execute('''TRUNCATE TABLE events CASCADE;''')
    db.session.execute('''ALTER SEQUENCE events_id_seq RESTART WITH 1;''')
    db.session.commit()
