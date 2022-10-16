from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc
from database import Session
from model import User
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse, Say
import json, os, time, multiprocessing

twilio_bp = Blueprint('twilio', __name__)
try:
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
except:
    account_sid = 0
    auth_token = 0


client = Client(account_sid, auth_token)

queue = {} # phonenum : bool[]
waitTime = 5

# post body: {"username": USERNAME, "friends" : ["username1", ...]}
@twilio_bp.route('/activateAlarm/', methods=['POST'])
def explode():
    data = request.json
    ret = {}
    process = multiprocessing.Process(target=childProcess, args=(data,))
    process.start()
    ret["success"] = True
    return jsonify(ret)

def childProcess(data):
    friends = data["friends"]
    session = Session()

    response = VoiceResponse()
    response.say("YOU ARE A VEGETABLE. GET UP NOW. NOW. NOW. NOW. NOW.")
    count = 0
    for friend in friends:
        user = session.query(User).filter_by(username=friend).first()
        phoneNum = user.phone
        call = client.calls.create(
                   twiml=response,
                   to=phoneNum,
                   from_="+16507614503")
        message = client.messages.create(
                      body='Reply yes/no to the civic duty of ' +
                           'waking up ' + data['username'],
                      from_='+16507614503',
                      to=phoneNum
                  )
        if phoneNum not in queue:
            queue[phoneNum] = [False]
        else:
            queue[phoneNum].append(False)
        print(count)
        count += 1
        time.sleep(waitTime)
        
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
    print(queue)
    if 'yes' in body.lower() and phoneNum in queue:
        queue[phoneNum][0] = True
        resp = MessagingResponse()
        resp.message("Thank you!")
        return str(resp)
    return str(MessagingResponse())
