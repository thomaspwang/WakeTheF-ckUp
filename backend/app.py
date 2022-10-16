import os
from flask import Flask, Blueprint 
from flask_cors import CORS
from users import users_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(users_bp, url_prefix='/users')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)

