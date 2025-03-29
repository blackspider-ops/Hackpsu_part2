import os
from app import create_app, db # Import db if you need to access it here, e.g., for migrations

# Determine config type from environment or default to development
config_name = os.getenv('FLASK_ENV', 'development')

app = create_app(config_name)

# Example of how you might add shell context or custom commands
@app.shell_context_processor
def make_shell_context():
    # Makes db and models available in `flask shell` without importing
    from app.models import User, Ride, Booking # Import models here to avoid circular imports at top level
    return {'db': db, 'User': User, 'Ride': Ride, 'Booking': Booking}

if __name__ == '__main__':
    # Note: `flask run` command is preferred for development
    # This block allows running with `python run.py` but might lack some features of `flask run`
    app.run()
