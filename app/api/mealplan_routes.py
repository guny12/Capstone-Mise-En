from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Mealplan
from app.forms.mealplan_form import CreateMealplanForm
from . import validation_errors_to_error_messages

faker = Faker()
mealplan_routes = Blueprint("mealplan", __name__)
