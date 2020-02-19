from models import Category


def init_categories():
    data = [
        {
          'name': 'react',
          'path': 'react'
        },
        {
          'name': 'redux',
          'path': 'redux'
        },
        {
          'name': 'udacity',
          'path': 'udacity'
        }
    ]
    for item in data:
        category = Category(
          name=item['name'],
          path=item['path']
        )
        category.insert()
