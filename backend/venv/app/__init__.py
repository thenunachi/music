# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models after initializing db to avoid circular import
from app import models

# Import and register seed commands
from app.seed.songSeed import seed_songs
from app.seed.userSeed import seed_users
app.cli.add_command(seed_songs)
app.cli.add_command(seed_users)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/user")
def user():
    return models.User.query.first().username
