from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    password = db.Column(db.String(120), nullable=False)
    def __repr__(self):
        return f'<User {self.username}>'

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    artist = db.Column(db.String(100))
    album = db.Column(db.String(100))
    file_path = db.Column(db.String(200))

    def __repr__(self):
        return f'<Song {self.title}>'
