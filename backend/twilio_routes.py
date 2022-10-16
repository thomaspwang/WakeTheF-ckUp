from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from database import Session
from model import User
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse, Say
import json, os, time
from multiprocessing import Process, Manager

twilio_bp = Blueprint('twilio', __name__)
try:
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)
except:
    account_sid = 0
    auth_token = 0


manager = Manager()
queue = manager.dict() # phonenum : bool[]
waitTime = 10

# post body: {"username": USERNAME, "friends" : ["username1", ...]}
@twilio_bp.route('/activateAlarm/', methods=['POST'])
def explode():
    data = request.json
    ret = {}
    process = Process(target=childProcess, args=(data,queue,manager))
    process.start()
    ret["success"] = True
    return jsonify(ret)

def childProcess(data, queue, manager):
    friends = data["friends"]
    session = Session()

    response = VoiceResponse()
    response.say("WAKE UP! GET UP! HELP YOUR FRIEND GET UP!")
    count = 0
    for friend in friends:
        user = session.query(User).filter_by(username=friend).first()
        phoneNum = user.phone
        call = client.calls.create(
                   twiml=response,
                   to=phoneNum,
                   from_="+16507614503")
        message = client.messages.create(
                      body='Reply yes / no to the civic duty of ' +
                           'waking up ' + data['username'],
                      from_='+16507614503',
                      to=phoneNum
                  )
        if phoneNum not in queue:
            lst = manager.list()
            queue[phoneNum] = lst
        queue[phoneNum].append(False)
        print(count)

        count += 1
        time.sleep(waitTime)
        print(queue)
        print("----")
        if queue[phoneNum].pop(0):
            break
    if len(queue[phoneNum]) == 0:
        del queue[phoneNum]

@twilio_bp.route('/testSend/', methods=['GET'])
def test():
    message = client.messages.create(
            body='testing',
            from_='+16507614503',
            to="+19256998558"
            )
    print(message.sid)
    return jsonify({})

@twilio_bp.route('/statusCback/', methods=['POST'])
def callback():
    data = request.json
    print(data)
    return jsonify(["ack"])

@twilio_bp.route('/messageWebhook/', methods=['POST'])
def logResponse():
    body = request.values.get('Body', None)
    phoneNum = request.values.get('From', None)
    resp = MessagingResponse()
    if 'yes' in body.lower() and phoneNum in queue:
        count = 0
        while count < len(queue[phoneNum]) and not queue[phoneNum][count]:
            print("ok")
            print(queue[phoneNum][count])
            queue[phoneNum][count] = True
            count +=1
        resp.message("Thank you!")
        print(queue)
        print("^^^^^^^^^")
    elif 'no' in body.lower():
        resp.message("Aww, we'll try the next friend")
    return str(resp)
