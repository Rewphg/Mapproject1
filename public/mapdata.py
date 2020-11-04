from flask import Flask, render_template, request, jsonify
from flask_json import FlaskJSON, JsonError, json_response, as_json
import pandas as pd
from os import path
import csv
from csv import writer
import sys

app = Flask(__name__)
json = Flask(app)

@json.encoder
def custom_encoder(o):
    pass

@app.route("/mapdata.json", method = ["GET", "POST"])
def addData():
    if request.method == "POST":
        x = request.form['']
        y = request.form['']
        img = request.form['template'] 
        qr = request.form['qrcode']
        boothname = request.form['boothname']
        boothdescription = request.form['boothdesc']

        data = {
            'x-coordinate':
            'y-coordinate':
            'img': img
            'QR': qr
            'booth-name': boothname
            'booth-description': boothdescription
        }

        response = app.response_class(
            response = json.dumps(data)
        )
        return response
    return "200"
return render_template("/TestMap.html")

@app.route("/")
def updateData():
    with open('mapdata.json', 'write') as file:
        

@app.route("/", method = ["GET", "POST"])
def retrieveData():
    if request.method = "GET":


if __name__ == '__main__':
    app.run(debug = True)