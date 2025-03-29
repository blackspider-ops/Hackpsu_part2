from flask import Blueprint

auth = Blueprint('auth', __name__)

# Import routes and possibly forms here to register them with the blueprint
from . import routes # noqa: F401 E402