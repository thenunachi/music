from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    songName = db.Column(db.String(80), unique=True, nullable=False)
    artist = db.Column(db.String(80), unique=True, nullable=False)
    album = db.Column(db.String(80), unique=True, nullable=False)
    releaseDate = db.Column(db.String(80), unique=True, nullable=False)
    genre = db.Column(db.String(80), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=True, nullable=False) 
   
