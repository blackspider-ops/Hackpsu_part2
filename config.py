import os
from dotenv import load_dotenv

# Determine the absolute path for the instance folder
basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, 'instance')

# Ensure the instance folder exists
os.makedirs(instance_path, exist_ok=True)

# Load environment variables from .env file located in the project root
dotenv_path = os.path.join(basedir, '.env')
load_dotenv(dotenv_path)

class Config:
    """Base configuration settings."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess-this-in-a-hackathon'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Default to SQLite in the instance folder if DATABASE_URI is not set
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or \
        'sqlite:///' + os.path.join(instance_path, 'carpool.db')

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_ECHO = False # Set to True to see SQL queries

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    # Add production-specific settings here (e.g., different database)

# Simple way to get the correct config based on FLASK_ENV or default
config_by_name = dict(
    development=DevelopmentConfig,
    production=ProductionConfig,
    default=DevelopmentConfig
)

def get_config():
    env = os.getenv('FLASK_ENV', 'default')
    return config_by_name.get(env, DevelopmentConfig)
