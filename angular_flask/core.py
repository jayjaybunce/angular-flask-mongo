from angular_flask import app

from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager
from flask.ext.mongoengine import MongoEngine


db = SQLAlchemy(app)

app.config["MONGODB_SETTINGS"] = {'DB': "project1"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

mongo_db = MongoEngine(app)

api_manager = APIManager(app)

