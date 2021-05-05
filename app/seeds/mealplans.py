from faker import Faker
from app.models import db, Mealplan

faker = Faker()

meals = [
    "risotto",
    "ramen",
    "sushi",
    "bbq",
    "fried rice",
    "vegan",
    "keto",
    "low-cal",
    "Bart's Smart Eats",
    "Jeb's fine dining",
    "Danny's dandan noodles",
    "Drew's stew",
    "Andrew's smoothie",
    "B's Baguettes",
    "Baylen's Van Food",
    "Icarus' Pizza",
    "Jairo's Gyros",
    "Jon's Congee",
    "Josh's Gummies",
    "Kent's Icecream",
    "Mimi's spongecake",
    "Nishi's Sushi",
    "Nat's Froglegs on Duck",
    "Tristan's Popsicles",
    "Troy's Ivory PorkBelly",
]


def seed_mealplans():
    for i in range(50):
        mealplan = Mealplan(
            name=meals[i] if i <= 24 else meals[faker.random_int(1, 23)],
            eventId=i + 1 if i <= 19 else faker.random_int(1, 20),
        )

        db.session.add(mealplan)
    db.session.commit()
