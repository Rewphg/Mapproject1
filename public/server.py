from flask import Flask, render_template, request, url_for, redirect, session, jsonify, send_file
from flask.helpers import flash
from werkzeug.datastructures import native_itermethods
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import Project as CH
import logging
import os
from os import name, path
import json

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Coordinate.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Username.db'
app.config['SERVER_NAME'] = 'localhost:5000'
app.config['SECRET_KEY'] = 'Hello'
db = SQLAlchemy(app)

class Username(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    Password = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return '<Name %r>' % self.id

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/user/", methods=["GET", "POST"])
def userpage():
    if request.method=="GET":
        RoomId = request.form[""]

    return render_template("/user.html")

@app.route("/signup/", methods=["GET","POST"])
def singuppage():
    if request.method == "POST":
        username = request.form['name']
        password = request.form['password']
        if Username.query.filter_by(name=username).first() is None:
            print(username, password)
            new_username = Username(name = username, Password = password)
            try:
                db.session.add(new_username)
                db.session.commit()
                print(new_username.name)
                return redirect('/login')
            except:
                return "there is not filled"
        else:
            return "Username is already taken"
    else:
        User = Username.query.order_by(Username.date_created)
        return render_template("/signup.html")

@app.route("/custom/")
def editorpage():
    return render_template("custom.html")

# @app.route('/create/open/<ID>')
# def OpenProject(ID):
#     app.logger.info("Redirect to ", ID)
#     return "Project: "+ID

# @app.route('/create/rename/<ID>')

@app.route("/org/<name>/project", methods=["GET", "POST"])
def ProjectPage(name):
    if request.method == "GET":
        if "user" in session:
            usr = session["user"]
            PID, Pname = CH.AudenticateUser(usr)
            Number = len(PID)
            app.logger.info(PID)
            return render_template("/home.html", user=usr, ID=PID, Name=Pname, Length = Number)
    else:
        ProjectName = request.form["ProjectNameInput"]
        CH.GenProject(session["user"], ProjectName)
        app.logger.info("CreateProject")
        return redirect("/org/{}/project".format(session["user"]))

@app.route("/org/delete/project/<PID>", methods=["GET", "POST"])
def DeleteProject(PID):
    if request.method == "GET":
        CH.DeleteProject(PID)
        CH.DeleteDIR(PID)
        return redirect("/org/{}/project".format(session["user"]))

@app.route("/org/project/<PID>/rename/<New>", methods=["GET","POST"])
def RenameProject(PID,New):
    CH.ChangeName(New,PID)
    app.logger.info("Rename")
    return redirect("/org/{}/project".format(session["user"]))

@app.route("/org/<name>/project/<PID>", methods=["GET","POST"])
def ProjID(name,PID):
    if request.method == "GET":
        # if path.exists(os.path.join("ProjectContainer\{}\Data\mapdata.json".format(PID))):
        #     with open(os.path.join("ProjectContainer\{}\Data\mapdata.json".format(PID))) as jsonfile:
        #         mapdata = json.load(jsonfile)
        # else:
        #     mapdata = []
        return render_template("/TestMap.html", username=name, pid=PID)
    else:
        return redirect("/org")

@app.route("/org", methods=["GET", "POST"])
def loginpage():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['pass']
        Data = Username.query.order_by(Username.date_created)
        for D in Data:
            if D.name == username and D.Password == password:
                session["user"] = D.name
                return redirect("/org/{}/project".format(session["user"]))
        return redirect("/login")
    else:
        User = Username.query.order_by(Username.date_created)
        return render_template("/org.html", User=User)

@app.route("/org/<name>/project/<PID>/save", methods=["GET", "POST"])
def  MapEditerPage(name, PID): 
    if request.method == "POST":
        #save = request.form['submit']
        save = request.get_json()
        print(save)
        filepath = os.path.join("ProjectContainer",PID,"Data","mapdata.json")
        with open(filepath, 'w') as f:
            json.dump(save, f)
            return 'created', 201

@app.route("/org/<name>/project/<PID>/json", methods=["GET","POST"])
def getJson(name,PID):
    if request.method == "GET":
        filepath = os.path.join("ProjectContainer",PID,"Data","mapdata.json")
        if path.exists(filepath) == True:
            with open(filepath, "r") as jsonfile:
                mapdata = (json.load(jsonfile))
                
        else:
            mapdata = {"object":[]}
        return jsonify(mapdata)

@app.route("/org/<Name>/static/Icons/<Image>", methods=["GET"])
def getImage(Image, Name):
    return send_file(os.path.join("static","Icons", Image), mimetype='image/gif')

@app.route("/test_template.html")
def show():
    return render_template("test_template.html")

@app.route("/mapdata.json")
def getSampleData():
    return render_template("mapdata.json")

if __name__ == "__main__":
    app.run(debug=True)