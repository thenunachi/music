from flask import Blueprint, request, jsonify
from models import db, User,Songs


song_bp = Blueprint('song_bp', __name__)

@song_bp.route('/add_song', methods=['POST'])
def add_song():
    songName = request.json.get('songName')
    artist = request.json.get('artist')
    album = request.json.get('album')
    releaseDate = request.json.get('releaseDate')
    genre = request.json.get('genre')
    url = request.json.get('url')
    if songName and artist and album and releaseDate and genre and url:
        new_song = Songs(songName=songName, artist=artist, album=album, releaseDate=releaseDate, genre=genre, url=url)
        db.session.add(new_song)
        db.session.commit()
        return jsonify({'message': 'Song added!'}), 201
    return jsonify({'message': 'All fields are required!'}), 400

@song_bp.route('/songs', methods=['GET'])
def get_songs():
    songs = Songs.query.all()
    return jsonify([{'id': song.id, 'songName': song.songName, 'artist': song.artist, 'album': song.album, 'releaseDate': song.releaseDate, 'genre': song.genre, 'url': song.url} for song in songs])

