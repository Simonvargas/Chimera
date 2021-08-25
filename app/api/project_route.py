from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm



project_routes = Blueprint('projects', __name__)


@project_routes.route('/')

def get_projects():
    projects = Project.query.all()
    return {'Projects' : [project.to_dict() for project in projects]}
# 'watchs' : [watch.to_dict() for watch in watchs]


# post route
@project_routes.route('/create', methods=['POST'])
@login_required
def create_project():
    form = ProjectForm()
    print('form data', form.data)
    
    if not form.validate_on_submit():
        project = Project(
            user_id = form.data['user_id'],
            category_id = form.data['category_id'],
            name = form.data['name'],
            image = form.data['image'],
            details = form.data['name'],
            funding_goal = form.data['funding_goal'],
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return {'error' : 'Invalid request'}


@project_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    db.session.delete(project)
    db.session.commit()
    return {}, 200


@project_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    res = Project.query.get(id)
    form = ProjectForm()

    res.user_id = form.data['user_id']
    res.category_id = form.data['category_id']
    res.name = form.data['name']
    res.image = form.data['image']
    res.details = form.data['name']
    res.funding_goal = form.data['funding_goal']
    db.session.commit()
    return res.to_dict()
    # return {'error' : 'Invalid request'}
