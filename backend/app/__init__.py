from flask import Flask
from flask_cors import CORS
from .routes import bp
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    CORS(app)
    swagger = Swagger(app)
    app.register_blueprint(bp, url_prefix='/sp/v1')

    return app