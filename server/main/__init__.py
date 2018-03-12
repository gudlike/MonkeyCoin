from flask import Blueprint

main = Blueprint('main', __name__)

from . import views
from ..models.user import Permission

@main.app_context_processor
def inject_perssions():
    return dict(Permission=Permission)