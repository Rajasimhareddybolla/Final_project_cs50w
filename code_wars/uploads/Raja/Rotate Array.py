from flask import Flask,render_template,request,jsonify
from cs50 import SQL
db=SQL("sqlite:///movies.db")
app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html")
# flasktemp/newbes/ $ export FLASK_APP=app.py
# flasktemp/newbes/ $ export FLASK_DEBUG=1
# flasktemp/newbes/ $ fl
# slkslask run
@app.route("/serch")
def res():
    word = request.args.get("nam")
    shows = db.execute("select names from movie where names like ?","%"+ word +"%")
    return jsonify(shows)
