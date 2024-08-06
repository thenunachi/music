from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)


class Songs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    songName = db.Column(db.String(100), unique=True, nullable=False)
    artist = db.Column(db.String(100))
    album = db.Column(db.String(100))
    releaseDate = db.Column(db.String(80), unique=True, nullable=False)
    genre = db.Column(db.String(80), unique=True, nullable=False)




# Initialize the database
def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()