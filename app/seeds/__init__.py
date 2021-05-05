from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .attendees import seed_attendees, undo_attendees

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')



# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_events()
    seed_attendees()
    # Add other seed functions here

def undo_seed(tableName):
    db.session.execute('''TRUNCATE TABLE {tableName} CASCADE;''')
    db.session.execute('''ALTER SEQUENCE {tableName}_id_seq RESTART WITH 1;''')
    db.session.commit()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_seed("users")
    undo_seed("events")
    # undo_seed("attendees")
    # Add other undo functions here
