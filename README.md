# POST APP
hosted: ```https://post-app-zjf.herokuapp.com/web```

# login user for live application

## role 1: PostVisitor
email: ```1040185058@qq.com```
password: ```123456zZ```

## role 2: PostManager
email: ```jiafengztodo@gmail.com```
password: ```123456zZ```

## endpoints

### GET categories
Get all of the categories available for the app

### GET /categories/<string:category_path>/posts
Get all of the posts for a particular category

### GET /posts
Get all of the posts

### GET /posts/<int:post_id>
Get the details of a single post

### POST /posts/<int:post_id>
vote for a post

### DELETE /posts/<int:post_id>
DELETE post using a post ID

### POST /posts
Create a new post

#### PATCH /posts/<int:post_id>
Edit the details of an existing post

### GET /posts/<int:post_id>/comments
Get all the comments for a single post

### POST /comments
Add a comment to a post

### POST /comments/<int:comment_id>
vote for a comment

### DELETE /comments/<int:comment_id>
DELETE comment using a comment ID

## role and permissions

### all permissions

* ```create:post``` create a new post

* ```delete:post``` delete the post

* ```edit:post``` edit the post

* ```vote:post``` vote for the post

* ```create:comment``` add a new comment

* ```delete:comment``` delete the comment

* ```vote:comment``` vote for the comment

### vistor(not logged in)
just can view the posts and comments

### role

#### PostManager

have all the permissions

#### PostVisitor

have the following permissions:

* ```create:comment```
* ```vote:comment	```
* ```vote:post```

## run the test

* enable to test, please set the ```visitor_role_token``` and ```manager_role_token``` in test.py

* setup database: ```createdb -h localhost -p 5432 -U postgres capstone```

* run
```
python test.py
```


## development Getting Started

### Installing Dependencies

#### Python 3.7

#### Virtual Enviornment

* virtualenv --python=C:\Users\huawei\AppData\Local\Programs\Python\Python37\python.exe --no-site-packages env
* .\env\Scripts\activate.bat
* .\env\Scripts\deactivate.bat

#### PIP Dependencies

```bash
pip install -r requirements.txt
```

## database
```
createdb -h localhost -p 5432 -U postgres capstone
```

## Running the server

```bash
export FLASK_APP=app # SET FLASK_APP=app
export FLASK_ENV=development # SET FLASK_ENV=development
flask run
```

## Testing

To run the tests, run
```
python test.py
```
