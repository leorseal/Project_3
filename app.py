from flask import Flask
import sqlite3

app = Flask(__name__)

# Configuration for SQLite database
DATABASE = 'C:/Users/leors/Project_3/healthcare_data.db'

# Function to create a connection to the SQLite database
def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.route('/')
def hello_leor():
    return "Hello Leor"

if __name__ == '__main__':
    app.run()

# Create an SQLite database and table to store your data
conn = sqlite3.connect('C:/Users/leors/Project_3/healthcare_data.db')
cursor = conn.cursor()

# Create a table to store your data (modify the structure to match your CSV columns)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS healthcare_data (
        id INTEGER PRIMARY KEY,
        Pregnancies INTEGER,
        Glucose INTEGER,
        BloodPressure INTEGER,
        SkinThickness INTEGER,
        Insulin INTEGER,
        BMI REAL,
        DiabetesPedigreeFunction REAL,
        Age INTEGER,
        Outcome INTEGER
    )
''')

conn.commit()
conn.close()


