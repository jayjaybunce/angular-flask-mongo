import os

from flask import Flask, request, Response, jsonify
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

from angular_flask import app

# routing for API endpoints (generated from the models designated as API_MODELS)
from angular_flask.core import api_manager
from angular_flask.models import *

#for model_name in app.config['API_MODELS']:
#	model_class = app.config['API_MODELS'][model_name]
#	api_manager.create_api(model_class, methods=['GET', 'POST'])

session = api_manager.session

app.config["MONGODB_SETTINGS"] = {'DB': "project1"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
@app.route('/contact-us')
@app.route('/fire-alarm')
@app.route('/fire-suppression')
@app.route('/system-design')
@app.route('/blog')
@app.route('/reading')
def basic_pages(**kwargs):
	return make_response(open('angular_flask/templates/index.html').read())

# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource exists
from sqlalchemy.sql import exists

crud_url_models = app.config['CRUD_URL_MODELS']
api_models = app.config['API_MODELS']

def get_doc_id(model_class,document_id):
	count = model_class.objects(id=document_id).count()
	
	if count > 1:
		return True
	else:
		return False
	
@app.route('/<collection>', methods=['GET','POST'])
@app.route('/<collection>/<document_id>', methods=['GET'])
def rest_pages(collection,document_id=None):
	if collection in crud_url_models:
		model_class = crud_url_models[collection]
		if document_id is None:
			return make_response(open('angular_flask/templates/index.html').read())	
		elif get_doc_id(model_class,document_id):
			return make_response(open('angular_flask/templates/index.html').read())								
	abort(404)

@app.route('/api/<collection>', methods=['GET','POST','DELETE'])
@app.route('/api/<collection>/<document_id>', methods=['GET','POST','DELETE'])
def collection(collection,document_id=None):
	if collection in api_models:
		model_class = crud_url_models[collection]
		model = model_class()
		if document_id is None:
			if request.method == 'GET':
				res = model_class.objects.all()
				return jsonify(result = res)
			elif request.method == 'POST':
				args = request.json
				#Create instance of model
				
				#Loop through all the parameters passed and save them in model
				
				required_fields = {}
				
				for k,v in User._fields.iteritems():
					if v.required:
						print k
									
				for value in args:
					attr = setattr(model,value,args.get(value))
				
					
				model.save()
				
				data = {"id":str(model.id)}
				
				resp = jsonify(data)
				resp.status_code = 200
				
				return resp
					
		else:
			if request.method == 'DELETE':
				
				if document_id is None:
					print document_id
					resp.status_code = 400
					return resp
				else:
					print "Else reached"
					res = model_class.objects(id = document_id)
					res.delete()
					
					data = {"status":"OK"}
				
					resp = jsonify(data)
					resp.status_code = 200
				
					return resp
					
			else:			
			
				res = model_class.objects.get(id=document_id)
			
				resp = jsonify(result = res)	
			
				resp.status_code = 200
			
				return resp
			
	abort(404)

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'static'),
							   'img/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404



