# app/seed/songSeed.py

import click
from flask.cli import with_appcontext
from app.models import Song, db

@click.command("seed-songs")
@with_appcontext
def seed_songs():
    """Seed the database with initial song data."""
    songs = [
        {
            'title': 'AwayInAManager',
            'artist': 'Artist Name',
            'album': 'Album Name',
            'file_path': "songsList/AwayInAManager.mp3"
        },
        {
            'title': 'தென் கிழக்கு',
            'artist': 'மலர் மீகா',
            'album': 'வாழை',
            'file_path': 'songsList/ThenKizhakku.mp3'
        },
        {
            'title': 'ஆனா ஊனா',
            'artist': 'மலர் மீகா',
            'album': 'ஆனா ஊனா',
            'file_path': 'songsList/AanaOona.mp3'
        },
        {
            'title': 'தங்கலான்',
            'artist': 'அனிருத்',
            'album': 'தங்கலான்',
            'file_path': 'songsList/Thangalaan.mp3'
        }
    ]

    for song_data in songs:
        song = Song(
            title=song_data['title'],
            artist=song_data['artist'],
            album=song_data['album'],
            file_path=song_data['file_path']
        )
        db.session.add(song)

    db.session.commit()
    print("Database seeded!")
