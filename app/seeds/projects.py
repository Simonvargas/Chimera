from app.models import db, Project


# Adds a demo user, you can add other users here if you want
def seed_projects():
    life = Project(user_id = 1, 
                   category_id = 1, 
                   name='Open heart surgery', 
                   image = 'https://static.scientificamerican.com/sciam/cache/file/557B07E7-0F2B-41DA-82D2B2DFE94433FA_source.jpg', 
                   details = 'Please donate so I can build a better dream', 
                   funding_goal = 15000, funding_raised = 1000, backers = 1)
    life1 = Project(user_id = 1, category_id = 2, name="Roar's Search", image = 'https://cdn.mos.cms.futurecdn.net/ydGns2acC5Qu2NaPJp2557.jpg', details = 'To be evocative, descriptive writing has to unite the concrete image with phrasing that evokes the impression the writer wants the reader to have. Consider “her eyes shone like sapphires, warming my night” versus “the woman’s eyes had a light like sapphires, bright and hard.” Each phrase uses the same concrete image, then employs evocative language to create different impressions.', funding_goal = 15000, funding_raised = 1000, backers = 1)
    life2 = Project(user_id = 2, category_id = 1, name='Tech Health Project', image = 'https://images.ctfassets.net/y5z23yb0t4f0/3AiqCytO1Wmuq4JRC552fn/e83e8efe7cbfe92be89168d8d1726e78/disruptive_dozen_medical_technology.jpg', details = 'Medical technology supports patients in checking the status of a disease or chronic condition. Medical technology help patients overcome injuries and diseases or treating chronic illnesses. Medical technology is found across the whole care pathway, it accelerates recovery and keeps people healthy.', funding_goal = 15000, funding_raised = 1000, backers = 1)
    life2 = Project(user_id = 2, category_id = 1, name='Tech Health Project', image = 'https://images.ctfassets.net/y5z23yb0t4f0/3AiqCytO1Wmuq4JRC552fn/e83e8efe7cbfe92be89168d8d1726e78/disruptive_dozen_medical_technology.jpg', details = 'Medical technology supports patients in checking the status of a disease or chronic condition. Medical technology help patients overcome injuries and diseases or treating chronic illnesses. Medical technology is found across the whole care pathway, it accelerates recovery and keeps people healthy.', funding_goal = 15000, funding_raised = 1000, backers = 1)
    


    db.session.add(life)
    db.session.add(life1)
    db.session.add(life2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
