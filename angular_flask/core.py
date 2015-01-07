import os

from angular_flask import app

from flask.ext.restless import APIManager
from flask.ext.mongoengine import MongoEngine

db_url = os.environ.get('DATABASE_URL')
print db_url
app.config["MONGODB_SETTINGS"] = {'db': "intersect",'host':db_url}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

mongo_db = MongoEngine(app)

api_manager = APIManager(app)

