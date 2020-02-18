from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

available_enums = {"gender": ["male", "female"],
                   "language": ["lv", "en", "ru"],
                   "channel": ["sms", "email", "call"]}


@app.route('/api/enums')
def hello_world():
    return jsonify(available_enums)


if __name__ == '__main__':
    app.run()
