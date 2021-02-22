import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_sqlalchemy import SQLAlchemy
from factory import create_app, Config

app = create_app(Config)
db = SQLAlchemy(app)

from models import User, Brand, ModelOfCar

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()