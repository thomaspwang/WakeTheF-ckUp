from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from database import Session
from model import User
import json
import random

users_bp = Blueprint('users', __name__)

# Adds a new user in the db, only populating the
# username and password fields. If there is already 
# a user with the same username it returns { "success" : False}
#
# post body: {"username" : USERNAME, "password", PASSWORD, "address" : ADDRESS, "phone" : PHONE}
# returns: {"success" : BOOLEAN}
@users_bp.route('/newUser/', methods=['POST'])
def addUser():
    data = request.json
    ret = {}

    lat, long = geocode(data['address'])
    
    session = Session()
    newUser = User(username=data['username'], password=data['password'], \
                   friends=[], oncall=[], lat=lat, long=long, phone=data["phone"])
    session.add(newUser)
    try:
        ret['success'] = True
        session.commit()
    except exc.SQLAlchemyError:
        session.rollback()
        ret['success'] = False

    session.close()
    return jsonify(ret)

@users_bp.route('/login/', methods=['POST'])
def loginUser():
    data = request.json
    session = Session()
    user = session.query(User).filter_by(username=data['username'], password=data['password']).first()
    session.close()
    # print(user)

    if user == None:
        return "false"
    else:
        return "true"


    


# post body: {"username": USERNAME, "friends" : ["username1", ...]}
@users_bp.route('/setOncall/', methods=['POST'])
def setOncall():
    data = request.json
    ret = {}

    session = Session()
    user = session.query(User).filter_by(username=data['username']).first()
    
    user.oncall = data["friends"]
    
    try:
        ret['success'] = True
        session.commit()
    except exc.SQLAlchemyError:
        session.rollback()
        ret['success'] = False

    session.close()
    return jsonify(ret)

# post body: {"username": USERNAME, "friends" : ["username1", ...]}
@users_bp.route('/addFriend/', methods=['POST'])
def addFriends():
    data = request.json
    friends = []
    ret = {}

    session = Session()
    user = session.query(User).filter_by(username=data['username']).first()
    result = user.friends
    if result != None:
        friends = result
    
    # N^2 oops
    friend = data['friend']
    if friend not in friends:
        friends.append(friend)
    user.friends = friends
    
    try:
        ret['success'] = True
        session.commit()
    except exc.SQLAlchemyError:
        session.rollback()
        ret['success'] = False

    session.close()
    return jsonify(ret)

def geocode(address):
    return 37.86253507889059 + random.uniform(-1, 1), -122.26139173001866 + random.uniform(-1, 1)

# get params: ?username=USERNAME
@users_bp.route('/getFriends/', methods=['GET'])
def getFriends():
    data = request.args
    ret = {}
    
    session = Session()
    user = session.query(User).filter_by(username=data['username']).first()
    ret['friends'] = user.friends
    session.close()
    return jsonify(ret)
 
