# POST APP

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

## login user for live application

### PostVisitor
email: ```1040185058@qq.com```
password: ```123456zZ```

### PostManager
email: ```jiafengztodo@gamil.com```
password: ```123456zZ```

## run the test
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
