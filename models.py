from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import jwt
from flask import current_app

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(128))
    
    images = db.relationship('Image', back_populates='user', lazy=True)

    is_confirmed = db.Column(db.Boolean, default=False)
    confirmation_token = db.Column(db.String(128), nullable=True)

    def __repr__(self):
        return '<User %r>' % self.id

    def set_password(self, password):
        self.password = generate_password_hash(password)
        return self.password
        
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)},
            current_app.config['SECRET_KEY'], algorithm='HS256'
        )

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['reset_password']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        return User.query.get(id)

    def generate_confirmation_token(self, expires_in=3600):
        return jwt.encode(
            {'confirm_email': self.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)},
            current_app.config['SECRET_KEY'], algorithm='HS256'
        )

    @staticmethod
    def verify_confirmation_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['confirm_email']
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        return User.query.get(id)

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)  # Уникальное имя файла на сервере
    original_filename = db.Column(db.String(255), nullable=False)  # Оригинальное имя файла
    path = db.Column(db.String(255), nullable=False)
    image_metadata = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='images')

    def __repr__(self):
        return '<Image %r>' % self.id

    def __init__(self, filename, original_filename, path, metadata, user_id):
        self.filename = filename
        self.original_filename = original_filename
        self.path = path
        self.metadata = metadata
        print (metadata)
        self.user_id = user_id