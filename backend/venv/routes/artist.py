from flask import Flask, jsonify
from models import Artist

app = Flask(__name__)

@app.route('/artists', methods=['GET'])
def get_artists():
    # Example route for fetching artists
    return jsonify({'artists': ['Artist 1', 'Artist 2']})

if __name__ == '__main__':
    app.run(debug=True)
