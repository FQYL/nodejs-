var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入session文件
var session = require("express-session");


// 引入database模块，运行其中的代码，连接数据库
require('./database');


var index = require('./routes/index');
var users = require('./routes/users');
// 引入自定义的模块
var register = require('./routes/register');
var login = require('./routes/login');
var article = require('./routes/article');
var detail = require('./routes/detail');
var comment = require('./routes/comment');
var myself = require('./routes/myself');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//------------注册express-session,这个模块会在后台直接创建一个
//session空间，存储用户信息---------------------
app.use(session({
    name: "kerwinNodeSessID",//用来为session起名字
    secret:"dwadjklkwj323443209i",//对我们存放的东西进行加密
    cookie: {maxAge: 1000*3600 }, //1小时
    resave: true,
    saveUninitialized: true
}));  
//---------------------------------


app.use('/', index);
app.use('/users', users);

// 使用自定义的模块
app.use('/register', register);
app.use('/login', login);
app.use('/article', article);
app.use('/detail', detail);
app.use('/comment', comment);
app.use('/myself', myself);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
