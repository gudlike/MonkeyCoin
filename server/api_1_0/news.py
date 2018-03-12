# -*- coding: utf-8 -*-

import flask
from flask import jsonify
from . import api

from ..spiders.github_trend import GitHubTrend
from ..spiders.toutiao import Toutiao
from ..spiders.hacker_news import HackerNews
from ..spiders.segmentfault import SegmentFault
from ..spiders.jobbole import Jobbole

@api.route('/github/repo_list', methods=['GET'])
def get_github_trend():
    gh_trend = GitHubTrend()
    gh_trend_list = gh_trend.get_trend_list()

    return jsonify(
        message='OK',
        data=gh_trend_list
    )


@api.route('/toutiao/posts', methods=['GET'])
def get_toutiao_posts():
    toutiao = Toutiao()
    post_list = toutiao.get_posts()

    return jsonify(
        message='OK',
        data=post_list
    )


@api.route('/hacker/news', methods=['GET'])
def get_hacker_news():
    hacker = HackerNews()
    news_list = hacker.get_news()

    return jsonify(
        message='OK',
        data=news_list
    )


@api.route('/segmentfault/blogs', methods=['GET'])
def get_segmentfault_blogs():
    sf = SegmentFault()
    blogs = sf.get_blogs()

    return jsonify(
        message='OK',
        data=blogs
    )


@api.route('/jobbole/news', methods=['GET'])
def get_jobbole_news():
    jobbole = Jobbole()
    blogs = jobbole.get_news()

    return jsonify(
        message='OK',
        data=blogs
    )
