# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models after initializing db to avoid circular import
from app import models

# Import and register seed commands
from app.seed.songSeed import seed_songs
from app.seed.userSeed import seed_users
app.cli.add_command(seed_songs)
app.cli.add_command(seed_users)

# Import and register blueprints (routes)
from app.routes.seedRoutes import song_bp  # Import routes from the correct file
app.register_blueprint(song_bp, url_prefix='/api/songs')
# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

def create_app():
    return app
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)