import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
import random
import sys

from models import setup_db, Post, Comment, Category
from init_data import init_categories


def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  
  # Set up CORS. Allow '*' for origins
  CORS(app)

  @app.after_request
  def after_request(response):
    response.headers.add(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,true'
    )
    response.headers.add(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,OPTIONS'
    )
    return response


  # Get all of the categories available for the app
  @app.route('/categories', methods=['GET'])
  def get_categories():
    data = Category.query.order_by(Category.id).all()
    if len(data) == 0:
      init_categories()
    data = Category.query.order_by(Category.id).all()
    categories = [categorie.format() for categorie in data]

    return jsonify({
      'success': True,
      'categories': categories
    })


  # Get all of the posts for a particular category
  @app.route('/categories/<string:category_path>/posts', methods=['GET'])
  def get_posts_by_category(category_path):
    data = Post.query.filter(Post.category == category_path).all()
    posts = [post.format() for post in data]

    return jsonify({
      'success': True,
      'posts': posts
    })


  # Get all of the posts
  @app.route('/posts', methods=['GET'])
  def get_posts():
    data = Post.query.order_by(Post.id).all()
    posts = [post.format() for post in data]

    return jsonify({
      'success': True,
      'posts': posts
    })


  # Get the details of a single post
  @app.route('/posts/<int:post_id>', methods=['GET'])
  def get_post_detail(post_id):
    post = Post.query.get(post_id)

    if post is None:
        abort(404)

    return jsonify({
      'success': True,
      'post': post.format()
    })


  # vote on a post
  @app.route('/posts/<int:post_id>', methods=['POST'])
  def vote_post(post_id):
    try:
      post = Post.query.get(post_id)

      if post is None:
        abort(404)
      if post.vote_score is None:
        post.vote_score = 0
      if request.json['option'] is 'upVote':
        post.vote_score = post.vote_score + 1
      elif post.vote_score > 0:
        post.vote_score = post.vote_score - 1
      post.update()

      return jsonify({
        'success': True,
        'post': post.format()
      })

    except Exception:
      abort(422)


  # DELETE post using a post ID
  @app.route('/posts/<int:post_id>', methods=['DELETE'])
  def delete_post(post_id):
    try:
      post = Post.query.get(post_id)

      if post is None:
        abort(404)

      post.delete()

      return jsonify({
        'success': True,
        'deleted': post_id
      })

    except Exception:
      abort(422)


  # Create a new post
  @app.route('/posts', methods=['POST'])
  def create_post():
    body = request.get_json()

    try:
      post = Post(
        title=body.get('title', None),
        body=body.get('body', None),
        category=body.get('category'),
        author=body.get('author', None),
        update_time=datetime.datetime.now()
      )
      post.insert()

      return jsonify({
        'success': True,
        'post': post.format()
      })

    except Exception:
      print(sys.exc_info())
      abort(422)


  # Edit the details of an existing post
  @app.route('/posts/<int:post_id>', methods=['PATCH'])
  def edit_post(post_id):
      try:
          post = Post.query.get(post_id)
          if post is None:
              abort(404)
          body = request.get_json()
          post.title = body.get('title', None)
          post.body = body.get('body', None)
          post.update_time = datetime.datetime.now()
          post.update()
      except Exception:
          print(sys.exc_info())
          abort(422)
      return jsonify({
        'success': True,
        'post': post.format()
      })


  # Get all the comments for a single post
  @app.route('/posts/<int:post_id>/comments', methods=['GET'])
  def get_comments_by_post(post_id):
    data = Comment.query.filter(Comment.post_id == post_id).all()
    comments = [comment.format() for comment in data]

    return jsonify({
      'success': True,
      'comments': comments
    })


  # Add a comment to a post
  @app.route('/comments', methods=['POST'])
  def create_comment():
    body = request.get_json()

    try:
      comment = Comment(
        body=body.get('body', None),
        post_id=body.get('postId', None),
        author=body.get('author', None),
        create_time=datetime.datetime.now()
      )
      comment.insert()

      return jsonify({
        'success': True,
        'comment': comment.format()
      })

    except Exception:
      abort(422)


  # vote on a comment
  @app.route('/comments/<int:comment_id>', methods=['POST'])
  def vote_comment(comment_id):
    try:
      comment = Comment.query.get(comment_id)

      if comment is None:
        abort(404)
      if comment.vote_score is None:
        comment.vote_score = 0
      if request.json['option'] is 'upVote':
        comment.vote_score = post.vote_score + 1
      elif comment.vote_score > 0:
        comment.vote_score = post.vote_score - 1
      comment.update()

      return jsonify({
        'success': True,
        'comment': comment.format()
      })

    except Exception:
      abort(422)


  # DELETE comment using a comment ID
  @app.route('/comments/<int:comment_id>', methods=['DELETE'])
  def delete_comment(comment_id):
    try:
      comment = Comment.query.get(post_id)

      if comment is None:
        abort(404)

      comment.delete()

      return jsonify({
        'success': True,
        'deleted': comment_id
      })

    except Exception:
      abort(422)


  # Get the details for a single comment
  @app.route('/comments/<int:comment_id>', methods=['GET'])
  def get_comment_detail(comment_id):
    comment = Comment.query.get(comment_id)

    if comment is None:
        abort(404)

    return jsonify({
      'success': True,
      'comment': comment.format()
    })


  # Error Handling
  '''
  422
  '''
  @app.errorhandler(422)
  def unprocessable(error):
      return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable"
        }), 422


  '''
  404
  '''
  @app.errorhandler(404)
  def not_found(error):
      return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
        }), 404


  '''
  400
  '''
  @app.errorhandler(400)
  def bad_request(error):
      return jsonify({
        "success": False,
        "error": 400,
        "message": "bad request"
        }), 400


  '''
  405
  '''
  @app.errorhandler(405)
  def not_allowed(error):
      return jsonify({
        "success": False,
        "error": 405,
        "message": "method not allowed"
        }), 405


  '''
  AuthError
  '''
  @app.errorhandler(401)
  def user_unauthorized(error):
      return jsonify({
        "success": False,
        "error": 401,
        "message": error.description
        }), 401


  @app.errorhandler(403)
  def resource_unauthorized(error):
      return jsonify({
        "success": False,
        "error": 403,
        "message": error.description
        }), 403

  
  return app

    