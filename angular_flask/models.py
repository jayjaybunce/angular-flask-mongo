import datetime

from angular_flask.core import db
from angular_flask import app
from angular_flask.core import mongo_db

class Post2(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	title = mongo_db.StringField(max_length=255, required=True)
	slug = mongo_db.StringField(max_length=255, required=True)
	body = mongo_db.StringField(required=True)
	comments = mongo_db.ListField(mongo_db.EmbeddedDocumentField('Comment'))

	def get_absolute_url(self):
		return url_for('post', kwargs={"slug": self.slug})

	def __unicode__(self):
		return self.title

	meta = {
		'allow_inheritance': True,
		'indexes': ['-created_at', 'slug'],
		'ordering': ['-created_at']
	}
	
class User(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now)
	fname = mongo_db.StringField(max_length=64, required=True)
	lname = mongo_db.StringField(max_length=64, required=True)
	email = mongo_db.StringField(max_length=255, required=True)
	
class Glucose(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	comments = mongo_db.ListField(mongo_db.EmbeddedDocumentField('Comment'))
	user_id = mongo_db.StringField(max_length=24, required=True)
	reading = mongo_db.IntField(required=True)

#This is where we store eating meals and snacks
class Meal(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	comments = mongo_db.ListField(mongo_db.EmbeddedDocumentField('Comment'))

#Event are physical activities
class Event(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	comments = mongo_db.ListField(mongo_db.EmbeddedDocumentField('Comment'))
	event_type = mongo_db.StringField(max_length=255, required=True)

#Categories for events i.e. Sports, Hiking, Running, Excersise
class EventCategories(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	name = mongo_db.StringField(max_length=255, required=True)
	description = mongo_db.StringField(max_length=255, required=True)
	

#List of events
class Events(mongo_db.Document):
	created_at = mongo_db.DateTimeField(default=datetime.datetime.now, required=True)
	comments = mongo_db.ListField(mongo_db.EmbeddedDocumentField('Comment'))

	

# models for which we want to create API endpoints
app.config['API_MODELS'] = { 'user': User, 'Glucose': Glucose,'meal': Meal, 'event': Event }

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'user': User, 'Glucose': Glucose,'meal': Meal, 'event': Event}
