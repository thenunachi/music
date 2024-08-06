from app import app, db
from models import Song

def seed_songs():
    # Define your seed data
    songs = [
        {
            'title': 'Song 1',
            'artist': 'Artist Name',
            'album': 'Album Name',
            'file_path': 'songs/artist_name/album_name/song1.mp3'
        },
        {
            'title': 'Song 2',
            'artist': 'Artist Name',
            'album': 'Album Name',
            'file_path': 'songs/artist_name/album_name/song2.mp3'
        },
        # Add more songs as needed
    ]

    # Insert seed data into the database
    for song_data in songs:
        song = Song(
            title=song_data['title'],
            artist=song_data['artist'],
            album=song_data['album'],
            file_path=song_data['file_path']
        )
        db.session.add(song)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        # db.create_all()  # Ensure the database and tables are created
        # seed_songs()
        print("Database seeded!")
