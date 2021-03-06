"""creating tables

Revision ID: e8918ddc02d3
Revises: 
Create Date: 2021-05-17 04:11:34.983220

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8918ddc02d3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=75), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('hashedPassword', sa.String(length=100), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('eventName', sa.String(length=50), nullable=False),
    sa.Column('locationName', sa.String(length=100), nullable=False),
    sa.Column('location', sa.String(length=400), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('startTime', sa.Time(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('totalCost', sa.Numeric(scale=2, asdecimal=False), nullable=True),
    sa.Column('availableSpots', sa.Integer(), nullable=True),
    sa.Column('thingsNeeded', sa.Text(), nullable=True),
    sa.Column('creatorUserId', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creatorUserId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('attendees',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('contactInfo', sa.String(length=250), nullable=True),
    sa.Column('attendeeEmail', sa.String(length=50), nullable=True),
    sa.Column('attendeeURL', sa.String(length=64), nullable=False),
    sa.Column('going', sa.Boolean(), nullable=True),
    sa.Column('host', sa.Boolean(), nullable=True),
    sa.Column('eventId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['eventId'], ['events.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mealplans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('eventId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['eventId'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('attendeeId', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=250), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['attendeeId'], ['attendees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mealPlanId', sa.Integer(), nullable=False),
    sa.Column('thing', sa.String(length=50), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('unit', sa.String(length=50), nullable=False),
    sa.Column('whoBring', sa.String(length=64), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['mealPlanId'], ['mealplans.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('items')
    op.drop_table('comments')
    op.drop_table('mealplans')
    op.drop_table('attendees')
    op.drop_table('events')
    op.drop_table('users')
    # ### end Alembic commands ###
