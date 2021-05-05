from flask.cli import AppGroup
from ..models import db
from .users import seed_users
from .events import seed_events
from .attendees import seed_attendees

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_events()
    seed_attendees()
    # Add other seed functions here


# Uses a raw SQL query to TRUNCATE the users table, SQL alchemy can't
# TRUNCATE Removes all table data, ALTER SEQUENCE resets primary key
def undo_seed(tableName):
    db.session.execute(f"""TRUNCATE TABLE {tableName} CASCADE;""")
    db.session.execute(f"""ALTER SEQUENCE {tableName}_id_seq RESTART WITH 1;""")
    db.session.commit()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_seed("users")
    undo_seed("events")
    undo_seed("attendees")
    # Add other undo functions here
