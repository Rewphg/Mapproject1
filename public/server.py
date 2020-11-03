from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from flask.helpers import flash
from werkzeug.datastructures import native_itermethods
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import Project as CH
import logging
import os
from os import path
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
                return redirect('/login.html')
            except:
                return "there is not filled"
        else:
            return "Username is already taken"
    else:
        User = Username.query.order_by(Username.date_created)
        return render_template("/signup")

@app.route("/login", methods=["GET", "POST"])
def loginpage():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['pass']
        Data = Username.query.order_by(Username.date_created)
        for D in Data:
            if D.name == username and D.Password == password:
                session["user"] = D.name
                return redirect("/org/{}/project".format(D.name))
        return redirect('/org')
    else:
        # User = Username.query.order_by(Username.date_created)
        return render_template("/login.html")

# @app.route("/custom/")
# def editorpage():
#     return render_template("custom.html")

@app.route('/create/delete/<ID>')
def Delete_Project(ID):
    CH.DeleteProject(ID)
    CH.DeleteDIR(ID)
    return redirect("/create")

# @app.route('/create/open/<ID>')
# def OpenProject(ID):
#     app.logger.info("Redirect to ", ID)
#     return "Project: "+ID

# @app.route('/create/rename/<ID>')

@app.route("/org/<name>/project", methods=["GET", "POST"])
def ProjectPage(name=None):
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
        save = request.get_json()
        print(save)
        with open(os.path.join("ProjectContainer\{}\Data\mapdata.json".format(PID)), 'w') as f:
            json.dump(save, f)
            return 'created', 201

@app.route("/org/<name>/project/<PID>/json", methods=["GET","POST"])
def getJson(name,PID):
    if request.method == "GET":
        if path.exists(os.path.join("ProjectContainer\{}\Data\mapdata.json".format(PID))):
            with open(os.path.join("ProjectContainer\{}\Data\mapdata.json".format(PID))) as jsonfile:
                mapdata = (json.load(jsonfile))
                
        else:
            mapdata = {"object":[]}
        return jsonify(mapdata)

# @app.route("/TestMap", methods=["GET", "POST"])
# def  MapEditerPage(): 
#     if request.method == "POST":
        #save = request.form['submit']
    #     save = request.get_json()
    #     print(save)
    #     with open('mapdata.json', 'w') as f:
    #         json.dump(save, f)
    #         return 'created', 200
    # if "user" in session:
    #     return render_template("/TestMap")
    # else:
    #     return redirect("/login.html")   

@app.route("/test_template.html")
def show():
    return render_template("test_template.html")

@app.route("/mapdata.json")
def getSampleData():
    return render_template("mapdata.json")


if __name__ == "__main__":
    app.run(debug=True)