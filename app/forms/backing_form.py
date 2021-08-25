from flask_wtf import FlaskForm
from wtforms import StringField, validators, IntegerField


class BackingForm(FlaskForm):
    project_id = IntegerField('project_id', [validators.DataRequired()])
    user_id = IntegerField('user_id', [validators.DataRequired()])
    amount = IntegerField('amount', [validators.DataRequired()])
    comment = StringField('comment', [validators.DataRequired()])