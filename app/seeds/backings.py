from app.models import db, Backing


# Adds a demo user, you can add other users here if you want
def seed_projects():
    backing = Backing(project_id = 1, user_id = 1, amount= 1500, comment = "Hope this helps you")
    backing1 = Backing(project_id = 2, user_id = 2, amount= 3500, comment = "I want to help you")
    backing2 = Backing(project_id = 2, user_id = 2, amount= 3500, comment = "I want to help you")

    db.session.add(backing)
    db.session.add(backing1)
    db.session.add(backing2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_backings():
    db.session.execute('TRUNCATE backings RESTART IDENTITY CASCADE;')
    db.session.commit()
