import os
from server import create_app, db
from server.models.user import User, Role, Permission
from server.models.blog import Post
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

app = create_app(os.getenv('FLASKY_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(db=db, User=User, Role=Role, Permission=Permission, Post=Post)
manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


@manager.command
def initRole():
    Role.insert_roles()

if __name__ == '__main__':
    manager.run()