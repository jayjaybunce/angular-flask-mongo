import os

from angular_flask import app

from flask.ext.restless import APIManager
from flask.ext.mongoengine import MongoEngine

app.config["MONGODB_SETTINGS"] = {"host":os.environ.get('MONGOLAB_URI'}


mongo_db = MongoEngine(app)

api_manager = APIManager(app)
