import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from app import create_app
from models import setup_db, Post, Category, Comment

visitor_role_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9UQXpSVGxGUXpZM05rWTNNVEl5UVRSRU1UVkJNMFEzT1Rjek1FVTVOelUyTmpnNE1rRkRNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1mc25kLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTQyYWMwZTJhYjhhYzBlODY5Y2E4Y2YiLCJhdWQiOiJwb3N0X2FwcF9hdXRoIiwiaWF0IjoxNTgyMDg5OTc5LCJleHAiOjE1ODIwOTcxNzksImF6cCI6IlJ3VzNVWHFya1RLVGFVMVZ5R2tyVmFVd3dVa0RBdmRvIiwic2NvcGUiOiIiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29tbWVudCIsInZvdGU6Y29tbWVudCIsInZvdGU6cG9zdCJdfQ.L1vo3-0ghGQlxYZTNBf6mfLoC_Z_axQJA8lXi-kc_JFmhgzDl1chCWdou8In113njIouqv_e9WXvX9ONS1YxbsMfrEffYzzhFd8biCCgiGn9nOJnC9O-LD8JMXj6cdz2sB2Atd5Xj7ijfDigYXFIT76Vf25N5IdeDiqEic43rdl530Zi5uXvJaNP8GJeUMsFAZ5hD0zFHKPLikJfmxBZGe34Fyn5ZlmEd9xd10nvKUBwEN6h5-Da8ba7k5VY5TJYkaYN-a2WkaZpYlwb7NNBVkcLsonqUtCZHzd_-C_vXB1EKn71YoaCyuj4sk92aNgxHw814SUaBQEG3vLdEvL5dw"
manager_role_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9UQXpSVGxGUXpZM05rWTNNVEl5UVRSRU1UVkJNMFEzT1Rjek1FVTVOelUyTmpnNE1rRkRNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1mc25kLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTQyMWE0YzJhYjhhYzBlODY5Y2E0NDEiLCJhdWQiOiJwb3N0X2FwcF9hdXRoIiwiaWF0IjoxNTgyMDg5OTQ3LCJleHAiOjE1ODIwOTcxNDcsImF6cCI6IlJ3VzNVWHFya1RLVGFVMVZ5R2tyVmFVd3dVa0RBdmRvIiwic2NvcGUiOiIiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29tbWVudCIsImNyZWF0ZTpwb3N0IiwiZGVsZXRlOmNvbW1lbnQiLCJkZWxldGU6cG9zdCIsImVkaXQ6cG9zdCIsInZvdGU6Y29tbWVudCIsInZvdGU6cG9zdCJdfQ.jx9LgXbXEmRMzwLS7hSDlLNzNEMJwBgH8IdQ5f-uudYpkGBj8CUK7mumkiwIK7en6XamdeuSax0ZEtAw7VfJKUEsHzhYIKVMT9rYzv4-E0QmX0YO0RkLXDBQcEcqcNzhqIOMm2XdfOnDzRXB2YR61tfu6HN1UR4u-iXZizlxeCrVfjM3_HAmbsFqxEiPB7Iw8Fp9RC9OR1BF0Xea3lht2iVSqK2KTQfC9TJf_OYIyXiP6fWb9gE_1NTLbpTlXBldPsjPkl6nkzCfuH83N8LPSYzpjmCh5tbEH_lzVH_fZCEDr5DK82WXjAnZvkanTbvH0rb0CDAeF_eJ2wrTHaXKaQ"

test_created_post_id = None
test_created_comment_id = None


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "capstone"
        self.database_path = "postgresql://{}:{}@{}/{}".format(
          'postgres', 'todo', 'localhost:5432', self.database_name
        )
        setup_db(self.app, self.database_path)

        self.post_visitor_headers = {
          "Authorization": "Bearer " + visitor_role_token
        }

        self.post_manager_headers = {
          "Authorization": "Bearer " + manager_role_token
        }

        self.new_post = {
          "title": "question",
          "body": "What movie is your?",
          "author": "zjf",
          "category": "react"
        }

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    test GET /categories
    """
    def test_0_get_categories(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['categories'])

    def test_1_get_categories_method_not_allowed(self):
        res = self.client().post('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'method not allowed')

    """
    test GET /categories/<string:category_path>/posts
    """
    def test_2_get_posts_by_category(self):
        res = self.client().get('/categories/react/posts')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['posts'])

    def test_3_get_posts_by_category_method_not_allowed(self):
        res = self.client().post('/categories/react/posts')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'method not allowed')

    """
    test GET /posts
    """
    def test_4_get_posts(self):
        res = self.client().get('/posts')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['posts'])

    """
    test Create a new post POST /posts
    """
    def test_5_create_new_post_vistor_role(self):
        res = self.client().post(
          '/posts',
          json=self.new_post,
          headers=self.post_visitor_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 403)
        self.assertEqual(data['success'], False)

    def test_6_create_new_post_manager_role(self):
        res = self.client().post(
          '/posts',
          json=self.new_post,
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['post'])

        global test_created_post_id
        test_created_post_id = data['post']['id']

    """
    test edit PATCH /posts/<int:post_id>
    """
    def test_7_edit_post_visitor_role(self):
        global test_created_post_id
        res = self.client().patch(
          '/posts/' + str(test_created_post_id),
          json={"title": "test_edit", "body": "test_edit"},
          headers=self.post_visitor_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 403)
        self.assertEqual(data['success'], False)

    def test_8_edit_post_manager_role(self):
        global test_created_post_id
        res = self.client().patch(
          '/posts/' + str(test_created_post_id),
          json={"title": "test_edit", "body": "test_edit"},
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        post = data['post']
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(post)
        self.assertEqual(post['title'], 'test_edit')

    """
    test get posy detail GET /posts/<int:post_id>
    """
    def test_a_get_posts_detail(self):
        global test_created_post_id
        res = self.client().get('/posts/' + str(test_created_post_id))
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['post'])

    def test_b_get_posts_detail_not_found(self):
        res = self.client().get('/posts/1111')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')

    """
    test GET /posts/<int:post_id>/comments
    """
    def test_c_get_comments(self):
        global test_created_post_id
        res = self.client().get(
          '/posts/' + str(test_created_post_id) + '/comments'
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertIsNotNone(data['comments'])

    def test_d_get_comments_method_not_allowed(self):
        global test_created_post_id
        res = self.client().post(
          '/posts/' + str(test_created_post_id) + '/comments'
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'method not allowed')

    """
    test add a new comment POST /comments
    """
    def test_e_create_new_comment(self):

        global test_created_comment_id
        global test_created_post_id

        res = self.client().post('/comments', json={
            "body": "test comment",
            "author": "zjf",
            "postId": str(test_created_post_id)
          },
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['comment'])

        test_created_comment_id = data['comment']['id']

    def test_f_comment_creation_unprocessable(self):
        res = self.client().post('/comments', json={
            "body": "test comment",
            "author": "zjf"
          },
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'unprocessable')

    """
    test DELETE /comments/<int:comment_id>
    """
    def test_g_delete_comment(self):
        global test_created_comment_id
        res = self.client().delete(
          '/comments/' + str(test_created_comment_id),
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        comment = Comment.query.filter(
          Comment.id == test_created_comment_id
        ).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], test_created_comment_id)
        self.assertEqual(comment, None)

    def test_h_delete_comment_not_exist(self):
        res = self.client().delete(
          '/comments/1111',
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'unprocessable')

    """
    test DELETE /posts/<int:post_id>
    """
    def test_i_delete_post(self):
        global test_created_post_id
        res = self.client().delete(
          '/posts/' + str(test_created_post_id),
          headers=self.post_manager_headers
        )
        data = json.loads(res.data)

        post = Post.query.filter(Post.id == test_created_post_id).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], test_created_post_id)
        self.assertEqual(post, None)

    def test_j_delete_post_not_allowed(self):
        res = self.client().delete(
          '/posts/' + str(test_created_post_id),
          headers=self.post_visitor_headers
        )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 403)
        self.assertEqual(data['success'], False)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
