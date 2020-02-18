import time
from flask import Flask, jsonify, request, render_template, url_for, json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

available_enums = [{"type": "enum",
                    "name": "gender",
                    "optionName": "Gender",
                    "values": ["male", "female"]},
                   {"type": "enum",
                    "name": "language",
                    "optionName": "Language",
                    "values": ["lv", "en", "ru"]},
                   {"type": "enum",
                    "name": "channel",
                    "optionName": "Channel",
                    "values": ["sms", "email", "call"]}]


@app.route('/api/enums')
def enums():
    time.sleep(1)
    return jsonify(available_enums)


@app.route('/api/q')
def customers():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static", "mock_data.json")
    data = json.load(open(json_url))
    return jsonify(data)


if __name__ == '__main__':
    app.run()
