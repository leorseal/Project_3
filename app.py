from flask import Flask, jsonify
import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
from flask import render_template


# Database Setup
engine = create_engine("sqlite:///C:/Users/leors/Project_3/resources/diabetes_data.db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Diabetes = Base.classes.diabetes_table

# Flask Setup
app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)

