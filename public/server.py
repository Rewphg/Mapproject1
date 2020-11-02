# public/server.py
from flask import Flask, render_template, request, url_for, redirect, session
from flask.helpers import flash
from werkzeug.datastructures import native_itermethods
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import Project as CH
import logging
import os
import json

app = Flask(__name__)
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

class Coordinate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Integer(), nullable=False)
    y = db.Column(db.Integer(), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return '<x %r>', '<y %r>' % self.id

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

@app.route("/user.html", methods=["GET", "POST"])
def userpage():
    return render_template("/user.html")

@app.route("/signup.html", methods=["GET","POST"])
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
                return redirect('/org.html')
            except:
                return "there is not filled"
        else:
            return "Username taken"
    else:
        User = Username.query.order_by(Username.date_created)
        return render_template("/signup.html")

@app.route("/custom.html")
def editorpage():
    return render_template("custom.html")

@app.route("/create.html", methods=["GET", "POST", "DELETE"])
def ProjectPage():
    if request.method == "DELETE":
        DPID = request.form['PID']
    if request.method == "POST":
        ProjectName = request.form["ProjectNameInput"]
        CH.GenProject(session["user"], ProjectName)
        app.logger.info("CreateProject")
        return redirect(url_for("ProjectPage"))
    if "user" in session:
        usr = session["user"]
        PID, Pname = CH.AudenticateUser(usr)
        Number = len(PID)
        app.logger.info(PID)
        return render_template("/create.html",user=usr, ID=PID, Name=Pname, Lenght = Number)
    else:
        return redirect("/org.html")

@app.route("/org.html", methods=["GET", "POST"])
def loginpage():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['pass']
        Data = Username.query.order_by(Username.date_created)
        for D in Data:
            if D.name == username and D.Password == password:
                session["user"] = D.name
                return redirect(url_for("ProjectPage"))
        return redirect('/org.html')
    else:
        User = Username.query.order_by(Username.date_created)
        return render_template("/org.html", User=User)

@app.route("/TestMap")
def  MapEditerPage(): 
    if "user" in session:
        return render_template("/TestMap.html")
    else:
        return redirect("/org.html")

@app.route("/test_template.html")
def show():
    
    return render_template("test_template.html")

if __name__ == "__main__":
    app.run(debug=True)