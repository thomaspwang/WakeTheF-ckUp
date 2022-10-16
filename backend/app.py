import os
#from sqlalchemy import create_engine, text
#from sqlalchemy.orm import sessionmaker
from flask import Flask, Blueprint 
from flask_cors import CORS
from users import users_bp
#DATABASE_URL="cockroachdb://jeremy:MKixjPluseHEGPBYsPHCJA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dwolf-gnoll-5791"

#engine = create_engine(DATABASE_URL)
#conn = engine.connect()
#Session = sessionmaker(bind=engine)

app = Flask(__name__)
CORS(app)

app.register_blueprint(users_bp, url_prefix='/users')

#@app.teardown_appcontext
#def shutdown_session(exception=None):
#    session.remove()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)

#res = conn.execute(text("SELECT now()")).fetchall()
#print(res)

