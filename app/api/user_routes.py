from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, List, Task, Note, db

user_routes = Blueprint('users', __name__)

# UPDATE User
@user_routes.route('/', methods=['PATCH'])
@login_required
def update_user():
    if current_user.id == 1:
        return

    userId = current_user.id
    newFirstName = request.json['firstName']
    newLastName = request.json['lastName']
    newEmail = request.json['email']
    newUsername = request.json['username']
    newPassword = request.json['password']

    currentUser = User.query.get(userId)

    if newFirstName:
        currentUser.firstName = newFirstName
    if newLastName:
        currentUser.lastName = newLastName
    if newEmail:
        currentUser.email = newEmail
    if newUsername:
        currentUser.username = newUsername
    if newPassword:
        currentUser.password = newPassword

    currentUser.updatedAt = datetime.now()

    db.session.commit()

    return {'user': currentUser.to_dict()}


# DELETE User
@user_routes.route('/', methods=['DELETE'])
@login_required
def del_user():
    if current_user.id == 1:
        return

    userId = current_user.id
    oldUser = User.query.get(userId)
    db.session.delete(oldUser)
    db.session.commit()

    return {'message': 'success'}
