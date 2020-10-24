from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

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
def realeditor():
    return render_template("TestMap.html")

if __name__ == "__main__":
    app.run(debug=True)