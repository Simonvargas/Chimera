from .db import db
from sqlalchemy.sql import func

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    projects = db.relationship('Project', back_populates='category')


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
