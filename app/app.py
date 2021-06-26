from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
import os
from database.db import initialize_db
from resources.routes import initialize_routes
from flask_jwt_extended import JWTManager
import logging
logging.basicConfig(filename='example.log',level=logging.DEBUG)

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

ENVIRONMENT_MONGO_USER = os.environ.get("MONGO_ADMIN_USER", "root")
ENVIRONMENT_MONGO_PASS = os.environ.get("MONGO_ADMIN_PASS", "Secret")
app.config['MONGODB_SETTINGS'] = {
    'host': "mongodb://{}:{}@{}/movie-bag?authSource=admin".format(ENVIRONMENT_MONGO_USER, ENVIRONMENT_MONGO_PASS, 'mongo:27017')
}
logging.info(app.config['MONGODB_SETTINGS'])

initialize_db(app)
initialize_routes(api)

if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    app.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)