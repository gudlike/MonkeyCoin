# -*- coding: utf-8 -*-
import multiprocessing
import gevent.monkey


gevent.monkey.patch_all()

bind = '0.0.0.0:5000'
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'gevent'

proc_name = 'MonkeyCoin'

errorlog = '-'
accesslog = '-'
