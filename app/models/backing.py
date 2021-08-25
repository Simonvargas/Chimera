from .db import db
from sqlalchemy.sql import func

class Backing(db.Model):
    __tablename__ = 'backings'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer,db.ForeignKey('projects.id'), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user_funds = db.relationship('User', back_populates='funds' )
    project_funds = db.relationship('Project', back_populates='funds')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'amount': self.amount,
        }