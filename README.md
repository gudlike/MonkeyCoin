# RegexBee
Implement some web pages using python flask, Reactjs & Antd

## Server
### 准备
```bash
# 安装依赖
$ pip install -r requirements.txt --user

# 初始化数据库
$ rm -rf migrations
$ python manage.py db init

# 数据库变更
$ python manage.py db migrate
$ python manage.py db upgrade

# 环境依赖
安装 splinter的依赖驱动, phantomjs.exe .
驱动地址: 
https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-windows.zip
https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-macosx.zip
https://github.com/ariya/phantomjs/releases/download/2.1.3/phantomjs
```

### 运行
```bash
$ python manage.py runserver
```

## Client

###  准备

```bash
# 安装node.js (推荐使用9.0.0)
$ brew install node

# 安装依赖包<project_root/client/package.json>
$ cd {project_root}/client
$ npm install  --registry=https://registry.npm.taobao.org

```

### 调试运行
```bash
$ cd {project_root}/client
$ npm start
# 适用于前端开发，实时调试前端代码
```

### 编译运行
```bash
$ cd {project_root}/client
$ npm run build
# 适用于前端代码调试完成后，打包到{project_root}/server/static目录下再commit.

```
