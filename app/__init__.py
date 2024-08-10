from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager


db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app(config_class='app.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from app import routes
    app.register_blueprint(routes.bp)

    return app


@login_manager.user_loader
def load_user(user_id):
    from app.models import User
    from app import db
   
    db.session.get(User, user_id)