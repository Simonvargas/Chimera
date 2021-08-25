from flask_wtf import FlaskForm
from wtforms import StringField, validators, IntegerField


class ProjectForm(FlaskForm):
    user_id = IntegerField('user_id', [validators.DataRequired()])
    category_id = IntegerField('category_id', [validators.DataRequired()])
    name = StringField('name', [validators.DataRequired()])
    image = StringField('image', [validators.DataRequired()])
    details = StringField('details', [validators.DataRequired()])
    funding_goal = IntegerField('funding_goal', [validators.DataRequired()])
    funding_raised = IntegerField('funding_raised')
    backers = IntegerField('backers')
