from flask import Flask
from flask_cors import CORS
from models import db, init_db
from routes.user_routes import user_bp
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://com_yoa1_user:NvBSKU2E85tOTc2w26qMnYhGdBLR1G5k@dpg-cqcj2heehbks738hb8eg-a/com_yoa1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress the warning

# init_db(app)
CORS(app)

# Register the user blueprint
app.register_blueprint(user_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)