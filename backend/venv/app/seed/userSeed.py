import click
from flask.cli import with_appcontext
from app.models import User, db


@click.command("seed-users")
@with_appcontext
def seed_users():
    """Seed the database with initial user data."""
    users = [
        {
            'username': 'admin',
            'password': 'admin'
        }
    ]
        

    for user_data in users:
        user = User(
            username=user_data['username'],
            password=user_data['password']
        )
        db.session.add(user)

    db.session.commit()
    print("Database seeded!")
        
