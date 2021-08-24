from .db import db
from sqlalchemy.sql import func

class Reward(db.Model):
    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    pledge_amount = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    details = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    project_rewards = db.relationship('Project', back_populates='rewards' )

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'pledge_amount': self.pledge_amount,
            'title': self.title,
            'details': self.details,
        }
