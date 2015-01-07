import os

from angular_flask import app

from flask.ext.restless import APIManager
from flask.ext.mongoengine import MongoEngine

app.config["MONGODB_SETTINGS"] = {"host":"mongodb://heroku_app33066573:dtnnejfhktva4o84jcrbv3cmqv@ds031721.mongolab.com:31721/heroku_app33066573"}


mongo_db = MongoEngine(app)

api_manager = APIManager(app)
