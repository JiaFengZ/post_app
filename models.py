import os
from sqlalchemy import Column, String, Integer, DateTime, create_engine
from flask_sqlalchemy import SQLAlchemy
import json
import time

database_name = "capstone"
password = 'todo'
user_name = 'postgres'
database_path = "postgresql://{}:{}@{}/{}".format(
  user_name, password, 'localhost:5432', database_name
)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


# Post
class Post(db.Model):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String)
    author = Column(String)
    vote_score = Column(Integer, default=0)
    category = Column(String, nullable=False)
    update_time = db.Column(DateTime, nullable=False)
    comments = db.relationship("Comment")

    def __init__(self, title, body, category, author, update_time):
        self.title = title
        self.body = body
        self.author = author
        self.category = category
        self.update_time = update_time

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        comments = [comment.format() for comment in self.comments]
        return {
          'id': self.id,
          'title': self.title,
          'body': self.body,
          'author': self.author,
          'category': self.category,
          'update_time': format_time(self.update_time),
          'vote_score': self.vote_score,
          'comments': comments
        }


# Comment
class Comment(db.Model):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, db.ForeignKey('posts.id'), nullable=False)
    body = Column(String)
    author = Column(String)
    create_time = db.Column(DateTime, nullable=False)
    vote_score = Column(Integer, default=0)

    def __init__(self, body, author, post_id, create_time):
        self.body = body
        self.author = author
        self.post_id = post_id
        self.create_time = create_time

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
          'id': self.id,
          'post_id': self.post_id,
          'body': self.body,
          'author': self.author,
          'create_time': format_time(self.create_time),
          'vote_score': self.vote_score
        }


# Category
class Category(db.Model):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    path = Column(String)

    def __init__(self, name, path):
        self.name = name
        self.path = path

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def format(self):
        return {
          'id': self.id,
          'name': self.name,
          'path': self.path
        }


def format_time(time_input):
    return int(time.mktime(
      time.strptime(
        time_input.strftime("%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")
      )
    ) * 1000
