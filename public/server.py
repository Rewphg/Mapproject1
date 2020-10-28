# public/server.py
from flask import Flask, render_template, request, url_for, redirect, session
from flask.helpers import flash
from werkzeug.datastructures import native_itermethods
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import Project as CH
import logging

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
    if request.method == "POST":
        username = request.form['username']
        password = request.form['pass']
        print(username,password)
        return render_template("/user.html")

@app.route("/signup.html", methods=["GET","POST"])
def singuppage():
    if request.method == "POST":
        username = request.form['name']
        password = request.form['password']
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
        User = Username.query.order_by(Username.date_created)
        return render_template("/signup.html")

@app.route("/custom.html")
def editorpage():
    return render_template("custom.html")

@app.route("/create.html")
def ProjectPage():
    if "user" in session:
        usr = session["user"]
        PID = CH.AudenticateUser(usr)
        app.logger.info(PID)
        return render_template("/create.html",user=usr, ID=PID)
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
    return render_template("/TestMap.html")

# @app.route("/TestMap.html")
# def realeditor():
#     global mysql
#     #db = mysql.connect("localhost","myusername","mypassword","mydbname" )
#     db = mysql.connect()
#     cursor = db.cursor()
#     query_string = "select * from maps;"
#     cursor.execute(query_string)
#     data = cursor.fetchall()
#     db.close()
#     return render_template("TestMap.html",data=data)

if __name__ == "__main__":
    app.run(debug=True)