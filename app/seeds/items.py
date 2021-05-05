from faker import Faker
from app.models import db, Item

faker = Faker()

units = ["mg", "g", "kg"]

things = [
    "apples",
    "asparagus",
    "bananas",
    "potatoes",
    "rice",
    "beef",
    "fish",
    "beets",
    "blueberries",
    "lemon",
    "yogurt",
    "bass",
    "tofu",
    "soysauce",
    "mirin",
    "sake",
    "dashi",
    "kombu",
    "mizuna",
    "shiso",
    "tuna",
    "tortillas",
    "microgreens",
    "microcilantro",
    "tomatoes",
    "onions",
    "jalapenos",
    "spinach",
    "pasta",
    "butter",
    "black pepper",
    "salt",
]


def seed_items():
    for i in range(200):
        item = Item(
            mealPlanId=i + 1 if i <= 49 else faker.random_int(1, 50),
            thing=things[faker.random_int(1, len(things) - 1)],
            quantity=faker.random_int(1, 100),
            unit=units[faker.random_int(1, len(units) - 1)],
        )

        db.session.add(item)
    db.session.commit()
