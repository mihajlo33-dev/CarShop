from flask_sqlalchemy import SQLAlchemy
import os
import sys
from flask import Flask, send_from_directory, request, jsonify, render_template
from flask_cors import CORS
from flask_migrate import Migrate



project_root = os.path.dirname(__file__)
template_path = os.path.join(project_root, './')



app = Flask(__name__, static_folder='./../../frontend', template_folder=template_path)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
migrate = Migrate(app, db)
db.create_all()

class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    image_file = db.Column(db.String(120), nullable=True,default='default.jpg')
    password = db.Column(db.String(60),nullable=True)

    def __repr__(self):
        return  f"User('{self.username}','{self.email}','{self.image_file}')"

class Brand(db.Model):
    brandId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    brandName = db.Column(db.String(120), unique=True, nullable=True)

class modelOfCar(db.Model):
    modelId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    modelName = db.Column(db.String(120), unique=True, nullable=True)


