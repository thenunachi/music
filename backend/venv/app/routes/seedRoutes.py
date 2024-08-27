from flask import Blueprint, request, jsonify, abort,send_from_directory,send_file
from app import db
from app.models import Song
import os
song_bp = Blueprint('songs', __name__)

@song_bp.route('/all', methods=['GET'])
def get_all_songs():
    """Get all songs."""
    songs = Song.query.all()
    
    output = []
    for song in songs:
        song_data = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'album': song.album,
            'file_path': song.file_path
            # 'release_year': song.release_year
        }
        output.append(song_data)
        # print(output,"output")
    return jsonify({'songs': output})

@song_bp.route('/<int:song_id>', methods=['GET'])
def get_song_file(song_id):
    print(song_id,"song_id from routes")
    song = Song.query.get(song_id)
    print(song,"song from routes")
    print(song.file_path,"song.file_path from routes")
    return send_file(song.file_path, mimetype='audio/mp3')


# songs_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../seed/songs')

# @song_bp.route('/<path:filename>')
# def serve_song(filename):
#     print(filename,"filename from routes")
#     return send_from_directory(songs_directory, filename)




# @song_bp.route('/', methods=['POST'])
# def add_song():
#     """Add a new song."""
#     data = request.get_json()
#     if not data or 'title' not in data or 'artist' not in data:
#         abort(400, description="Invalid input")
    
#     new_song = Song(
#         title=data['title'],
#         artist=data['artist'],
#         album=data.get('album'),
#         # release_year=data.get('release_year')
#     )
#     db.session.add(new_song)
#     db.session.commit()
    
#     return jsonify({'message': 'Song added', 'song': {
#         'id': new_song.id,
#         'title': new_song.title,
#         'artist': new_song.artist,
#         'album': new_song.album,
#         # 'release_year': new_song.release_year
#     }}), 201

# @song_bp.route('/<int:song_id>', methods=['DELETE'])
# def delete_song(song_id):
#     """Delete a song by its ID."""
#     song = Song.query.get_or_404(song_id)
#     db.session.delete(song)
#     db.session.commit()
    
#     return jsonify({'message': 'Song deleted'})


