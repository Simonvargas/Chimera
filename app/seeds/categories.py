from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    category1 = Category(type='Health')
    category2 = Category(type='Games')
    category3 = Category(type='Art')
    category4 = Category(type='Design & Tech')
    category5 = Category(type='Music')
    category6 = Category(type='Film')

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.add(category5)
    db.session.add(category6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE backings RESTART IDENTITY CASCADE;')
    db.session.commit()
