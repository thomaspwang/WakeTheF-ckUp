from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from database import Session
from model import User
import json

users_bp = Blueprint('users', __name__)

# Adds a new user in the db, only populating the
# username and password fields. If there is already 
# a user with the same username it returns { "success" : False}
#
# post body: {"username" : USERNAME, "password", PASSWORD}
# returns: {"success" : BOOLEAN}
@users_bp.route('/newUser/', methods=['POST'])
def addUser():
    data = request.json
    #print(request.json)
    ret = {}
    
    session = Session()
    newUser = User(username=data['username'], password=data['password'])
    session.add(newUser)
    try:
        ret['success'] = True
        session.commit()
    except exc.SQLAlchemyError:
        session.rollback()
        ret['success'] = False

    session.close()
    return jsonify(ret)


 
