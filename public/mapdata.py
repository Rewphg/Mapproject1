from flask import Flask, render_template, request, jsonify
from flask_json import FlaskJSON, JsonError, json_response, as_json
import pandas as pd
from os import path
import os
import csv
from csv import writer
import sys
import json

app = Flask(__name__)

@app.route('/test_template.html', methods=['GET', 'POST'])
def upload_file():
    file_path = os.path.join("public\static\Data\mapdata.json")
    with open(file_path) as f:
        data = json.loads(f.read("mapdata.json"))
        print(data[0])
        return render_template("test_template.html", data = data)