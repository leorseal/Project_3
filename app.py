from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

# Database Setup
engine = create_engine("sqlite:///C:/Users/leors/Project_3/Resources/Diabetes.db")

# Reflect the database tables
Base = automap_base()
Base.prepare(engine, reflect=True)

app = Flask(__name__)

@app.route('/')
def dashboard():
    # Create a session to interact with the database
    session = Session(engine)
    
    # Close the session
    session.close()
    
    # Return a blank webpage (you can add HTML or a template here)
    return "This is a blank webpage with an SQLAlchemy database connection."

@app.route('/connection_status')
def connection_status():
    try:
        # Attempt to connect to the database
        engine.connect()
        return "Database connected successfully"
    except:
        return "Database connection failed"

if __name__ == '__main__':
    app.run(debug=True)

