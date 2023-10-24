from flask import Flask, render_template, jsonify, request
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

# Database Setup
DATABASE_URI = "sqlite:///C:/Users/leors/Project_3/resources/diabetes_data.db"
engine = create_engine(DATABASE_URI)

# Reflect the existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# Save references to the table
Diabetes = Base.classes.diabetes_table

# Flask Setup
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def welcome():
    session = Session(engine)
    data = session.query(Diabetes).all()

    # Calculate the outcome counts
    outcome_counts = {
        "0": session.query(Diabetes).filter_by(Outcome=0).count(),
        "1": session.query(Diabetes).filter_by(Outcome=1).count()
    }

    session.close()

    diabetes_data = [{
        "Id": d.Id, 
        "Pregnancies": d.Pregnancies, 
        "Glucose": d.Glucose, 
        "BloodPressure": d.BloodPressure, 
        "SkinThickness": d.SkinThickness, 
        "Insulin": d.Insulin, 
        "BMI": d.BMI, 
        "DiabetesPedigreeFunction": d.DiabetesPedigreeFunction, 
        "Age": d.Age, 
        "Outcome": d.Outcome
    } for d in data]

    if request.method == 'POST':
        id = int(request.form.get('id'))
        column = request.form.get('column')

        session = Session(engine)

        individual_value = session.query(getattr(Diabetes, column)).filter(Diabetes.Id == id).scalar()
        mean_positive = session.query(func.avg(getattr(Diabetes, column))).filter(Diabetes.Outcome == 1).scalar()
        mean_negative = session.query(func.avg(getattr(Diabetes, column))).filter(Diabetes.Outcome == 0).scalar()

        session.close()

        return jsonify({
            "individual": individual_value,
            "mean_positive": mean_positive,
            "mean_negative": mean_negative
        })

    return render_template("index.html", data=diabetes_data, outcome_counts=outcome_counts)

if __name__ == '__main__':
    app.run(debug=True)
