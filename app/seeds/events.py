from faker import Faker
from app.models import db, Events
from datetime import datetime
faker = Faker()

types=["public", "private", "catered"]
eventName=["party", "fiesta", "get-together", "cook-off"]
place=["house", "apartment", "loft", "yard"]

def seed_events():
    for i in range(20):
        event = Events(
        hostName= faker.first_name(),
        hostContact= faker.phone_number(),
        hostEmail= faker.email(),
        hostURL=faker.sha256(),
        name= f"{faker.name()}'s {faker.words(1, eventName, True)[0]}",
        locationName= f"{faker.name()}'s {faker.words(1, place, True)[0]}",
        location= faker.address(),
        description= faker.paragraph(nb_sentences=3),
        date= datetime.strptime(f"{faker.future_date()}","%Y-%m-%d"),
        startTime= faker.time(),
        type= faker.words(1, types, False),
        totalCost= float(f"{faker.random_int(10,1000)}.{faker.random_int(1,9)}{faker.random_int(1,9)}"),
        availableSpots=faker.random_int(1,20),
        thingsNeeded= "None",
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
