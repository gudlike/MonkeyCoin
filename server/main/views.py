#coding=utf-8
from flask import request, jsonify, redirect
from flask_login import login_required, current_user
from . import main
from .. import db
from ..models.user import Permission
from ..models.blog import Post


@main.route('/submit-article', methods=['POST'])
@login_required
def submit_article():
    result = {}
    if current_user.can(Permission.WRITE):
        try:
            data = request.get_json(force=True, silent=False, cache=False)
            post = Post(body=data['body'],
                        author=current_user._get_current_object())
            db.session.add(post)
            db.session.commit()
            result['status'] = 'success'
        except:
            result['status'] = 'error'
            result['info'] = '提交文章失败'
    else:
        result['status'] = 'error'
        result['info'] = '用户没有写的权限'
    return jsonify(result)


@main.route('/articles', methods=['GET'])
@login_required
def get_articles():
    result = {}
    try:
        posts = Post.query.order_by(Post.timestamp.desc()).all()
        post_vec = []
        for post in posts:
            post_item = {}
            post_item['username'] = post.author.username
            post_item['body'] = post.body
            post_item['date'] = post.timestamp
            post_vec.append(post_item)
        result['status'] = 'success'
        result['content'] = post_vec
    except:
        result['status'] = 'error'
        result['info'] = '获取文章失败'
    return jsonify(result)

@main.route('/', methods=['GET'])
def main_page():
    # redirect to the frontend html.
    return redirect('/static/index.html')
