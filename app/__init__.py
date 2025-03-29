from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from flask_bootstrap import Bootstrap5 # Or manage Bootstrap manually
from config import config_by_name, get_config

# Initialize extensions without app context initially
db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'auth.login' # Route function name for login page
login_manager.login_message_category = 'info' # Flash message category
csrf = CSRFProtect()
bootstrap = Bootstrap5() # Or manage Bootstrap manually

def create_app(config_name='default'):
    """Application factory function."""
    app = Flask(__name__, instance_relative_config=True) # Enables loading config from instance folder

    # Load configuration
    config_obj = get_config()
    app.config.from_object(config_obj)

    # Initialize extensions with the app instance
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    bootstrap.init_app(app) # Or manage Bootstrap manually

    # Import models here to ensure they are known to SQLAlchemy
    # Although usually accessed via db.session, sometimes needed for setup
    from . import models

    # Register blueprints
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .rides import rides as rides_blueprint
    app.register_blueprint(rides_blueprint) # No prefix, handles root routes like /find, /offer

    from .users import users as users_blueprint
    app.register_blueprint(users_blueprint) # No prefix, handles /dashboard, /profile

    # A simple route for the homepage (can be moved to a 'main' blueprint if needed)
    @app.route('/')
    def index():
        from flask import render_template # Import here to avoid circular import
        return render_template('index.html')

    # User loader callback for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return models.User.query.get(int(user_id))

    return app