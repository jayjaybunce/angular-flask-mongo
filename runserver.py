import os
from angular_flask import app

def runserver():
	port = int(os.environ.get('PORT', 80))
	app.run(host='104.131.105.238', port=port)

if __name__ == '__main__':
	runserver()
