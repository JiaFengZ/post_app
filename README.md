## Getting Started

### Installing Dependencies

#### Python 3.7

#### Virtual Enviornment

* virtualenv --python=C:\Users\huawei\AppData\Local\Programs\Python\Python37\python.exe --no-site-packages env
* .\env\Scripts\activate.bat
* .\env\Scripts\deactivate.bat

#### PIP Dependencies

```bash
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
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
