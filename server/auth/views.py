#coding=utf-8
from flask import jsonify, request
from flask_login import login_user, logout_user, login_required, current_user
from . import auth
from .. import db
from ..models.user import User

@auth.before_app_request
def before_request():
    if current_user.is_authenticated:
        current_user.ping()

@auth.route('/login', methods=['GET', 'POST'])
def login():
    result = {}
    if request.method == 'POST':
        try:
            data = request.get_json(force=True, silent=False, cache=False)
            user = User.query.filter_by(email=data['mail']).first()
            if user is not None and user.verify_password(data['password']):
                login_user(user, data['remember'])
                result['status'] = 'success'
            else:
                result['status'] = 'error'
                result['info'] = '邮箱或密码错误'
        except:
            result['status'] = 'error'
    else:
        result['status'] = 'error'
    return jsonify(result)

@auth.route('/logout')
@login_required
def logout():
    result = {}
    logout_user()
    result['status'] = 'success'
    return jsonify(result)

@auth.route('/register', methods=['POST'])
def register():
    result = {}
    data = request.get_json(force=True, silent=False, cache=False)
    if User.query.filter_by(email=data['mail']).first() is not None:
        result['status'] = 'failure'
        result['info'] = '该邮箱已被注册。'
        return jsonify(result)
    user = User(email=data['mail'],
                username=data['mail'],
                password=data['password'])
    db.session.add(user)
    result['status'] = 'success'
    return jsonify(result)

@auth.route('/currentUser', methods=['GET'])
@login_required
def fetchCurrentUser():
    result = {}
    try:
        result['email'] = current_user.email
        result['username'] = current_user.username
        result['name'] = current_user.name
        result['location'] = current_user.location
        result['about_me'] = current_user.about_me
        result['memeber_since'] = current_user.member_since
        result['last_seen'] = current_user.last_seen
        result['avatar'] = current_user.avatar_hash
        result['status'] = 'success'
    except:
        result['status'] = 'failure'
    return jsonify(result);

