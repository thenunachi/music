from flask import Blueprint, request, jsonify
from models import db, User

# Define a Blueprint for user-related routes
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/add_user', methods=['POST'])
def add_user():
    username = request.json.get('username')
    if username:
        new_user = User(username=username)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User added!'}), 201
    return jsonify({'message': 'Username is required!'}), 400

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])
