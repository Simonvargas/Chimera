from .db import db
from sqlalchemy.sql import func


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(1000), nullable=False)
    details = db.Column(db.String(2000), nullable=False)
    funding_goal = db.Column(db.Integer, nullable=False)
    funding_raised = db.Column(db.Integer, nullable=True)
    backers = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship("User", back_populates="projects")
    category = db.relationship('Category', back_populates='projects')
    rewards = db.relationship('Reward', back_populates='project_rewards')
    funds = db.relationship('Backing', back_populates='project_funds')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'name': self.name,
            'image': self.image,
            'details': self.details,
            'funding_goal': self.funding_goal,
            'funding_raised': self.funding_raised,
            'backers': self.backers,
        }
