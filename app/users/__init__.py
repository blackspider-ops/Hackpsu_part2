from flask import Blueprint

users = Blueprint('users', __name__)

from . import routes # noqa: F401 E402