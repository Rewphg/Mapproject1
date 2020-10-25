# public/server.py
from flask import Flask, render_template, request, url_for, redirect
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL() 

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '12345678'
app.config['MYSQL_DATABASE_DB'] = 'eventme_db'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

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
        print(username, password)
        return redirect(url_for("TestMap.html",))
    return render_template("user.html")

@app.route("/org.html")
def loginpage():
    return render_template("org.html")

@app.route("/custom.html")
def editorpage():
    return render_template("custom.html")

@app.route("/signup.html")
def signuppage():
    return render_template("signup.html")

@app.route("/TestMap.html")
def  MapEditerPage(): 
    return render_template("TestMap.html")

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