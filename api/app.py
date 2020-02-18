from flask import Flask, jsonify, request, render_template, url_for, json
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

available_enums = {"gender": ["male", "female"],
                   "language": ["lv", "en", "ru"],
                   "channel": ["sms", "email", "call"]}


@app.route('/api/enums')
def enums():
    return jsonify(available_enums)

@app.route('/api/q')
def customers():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static", "mock_data.json")
    data = json.load(open(json_url))
    return jsonify(data)

if __name__ == '__main__':
    app.run()
