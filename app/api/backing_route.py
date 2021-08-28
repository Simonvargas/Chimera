from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Backing, db, User
from app.forms import BackingForm



backing_routes = Blueprint('backings', __name__)


@backing_routes.route('/')
@login_required
def get_backings():
    backings = Backing.query.all()
    users = User.query.all()
    return {'Backings' : [backing.to_dict() for backing in backings], 'users': [user.to_dict() for user in users]}
# 'watchs' : [watch.to_dict() for watch in watchs]

# @backing_routes.route('/<int:id>')
# @login_required
# def one_project(id):
#     project = Project.query.get(id)
#     return project.to_dict()

# post route
@backing_routes.route('/create', methods=['POST'])
@login_required
def create_backing():
    form = BackingForm()
    print('form data', form.data)
    
    if not form.validate_on_submit():
        backing = Backing(
            project_id = form.data['project_id'],
            user_id = form.data['user_id'],
            amount = form.data['amount'],
            comment = form.data['comment'],
        )
        db.session.add(backing)
        db.session.commit()
        return backing.to_dict()
    return {'error' : 'Invalid request'}


@backing_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_backing(id):
    backing = Backing.query.get(id)
    db.session.delete(backing)
    db.session.commit()
    return {}, 200


@backing_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_backing(id):
    res = Backing.query.get(id)
    form = BackingForm()

    res.comment = form.data['comment']
    db.session.commit()
    return res.to_dict()
    # return {'error' : 'Invalid request'}
