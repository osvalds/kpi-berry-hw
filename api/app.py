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
    return jsonify(available_enums)


def filter_conditions(conditions):
    filtered_conditions = filter(
        lambda c: c["property"] is not None and c["equality"] is not None and c["propertyValue"] is not None,
        conditions)
    return list(filtered_conditions)


def marketing_consent_lambda(condition):
    if condition["equality"] == 1:
        if condition["propertyValue"] == 1:
            return lambda c: c["marketing_consent"] is True
        elif condition["propertyValue"] == 0:
            return lambda c: c["marketing_consent"] is False
        else:
            return lambda c: c["marketing_consent"] is None
    else:
        if condition["propertyValue"] == 1:
            return lambda c: c["marketing_consent"] is not True
        elif condition["propertyValue"] == 0:
            return lambda c: c["marketing_consent"] is not False
        else:
            return lambda c: c["marketing_consent"] is not None


def age_lambda(condition):
    if condition["equality"] == 1:
        return lambda c: c["age"] is not None and condition["propertyValue"][0] <= c["age"] <= \
                         condition["propertyValue"][1]
    else:
        return lambda c: c["age"] is not None and not condition["propertyValue"][0] <= c["age"] <= \
                                                      condition["propertyValue"][1]


def enum_lambda(condition):
    if condition["equality"] == 1:
        if condition["propertyValue"] == "none":
            return lambda c: c[condition["property"]] is None
        else:
            return lambda c: c[condition["property"]] == condition["propertyValue"]
    else:
        if condition["propertyValue"] == "none":
            return lambda c: c[condition["property"]] is not None
        else:
            return lambda c: c[condition["property"]] != condition["propertyValue"]


def converted_condition(condition):
    print("______")
    print(condition["property"])
    print(condition["property"] == "marketing_consent")

    if condition["property"] == "marketing_consent":
        return marketing_consent_lambda(condition)
    elif condition["property"] == "age":
        return age_lambda(condition)
    else:
        return enum_lambda(condition)


@app.route('/api/q', methods=['POST'])
def customers():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static", "mock_data.json")
    all_customers = json.load(open(json_url))

    print(type(all_customers))
    print(all_customers[0])

    request_data = json.loads(request.data)

    logical_operator = request_data["logicalOperator"]

    conditions = request_data["conditions"]

    validated_conditions = filter_conditions(conditions)

    print("filtered conditions")
    print(validated_conditions)

    filtered_customers = []

    for condition in validated_conditions:
        filtered_stuff = list(filter(converted_condition(condition), all_customers))
        dset = set()
        for f in filtered_stuff:
            dset.add(json.dumps(f, sort_keys=True))
        filtered_customers.append(dset);

    print(filtered_customers)
    print(conditions)

    if not validated_conditions:
        return jsonify(all_customers)
    # elif len(validated_conditions) == 1:
    #     return jsonify(filtered_customers[0])
    else:
        if logical_operator == "or":
            results = set().union(*filtered_customers)
            final_results = []
            for r in results:
                final_results.append(json.loads(r))
            return jsonify(final_results)

        else:
            print("LOGICAL AND")

            return jsonify([])


if __name__ == '__main__':
    app.run(debug=True, port=5000)
