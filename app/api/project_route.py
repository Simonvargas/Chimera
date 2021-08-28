from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Project, db
from app.forms import ProjectForm



project_routes = Blueprint('projects', __name__)


@project_routes.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return {'Projects' : [project.to_dict() for project in projects]}
# 'watchs' : [watch.to_dict() for watch in watchs]

@project_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_project(id):
    project = Project.query.get(id)
    return project.to_dict()



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
            details = form.data['details'],
            funding_goal = form.data['funding_goal'],
            funding_raised = form.data['funding_raised'],
            backers = form.data['backers']
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
    res.details = form.data['details']
    res.funding_goal = form.data['funding_goal']
    db.session.commit()
    return res.to_dict()
    # return {'error' : 'Invalid request'}


@project_routes.route('/editfunds/<int:id>', methods=['PUT'])
@login_required
def update_funding(id):
    res = Project.query.get(id)
    form = ProjectForm()

    res.funding_raised = form.data['funding_raised']
    db.session.commit()
    return res.to_dict()

