/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 11:03:55
 * @version $Id$
 */



var express = require('express');
var router = express.Router();
// 引入我们自己定义的模块
var User=require('../model/user');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '注册页面' ,isShow:false});
});


// 接收表单提交过来的内容，放到数据库中
router.post('/', function(req, res, next) {

  // console.log(req.body);

  	User.find({//通过邮箱查找看是否有这个用户
  		email:req.body.email
  	}).then(result=>{
  		if(result.length==0){//显示为空表示数据库中没有
  			//将结果返回出去，利用Promise的写法
  			return User.create({
  				name:req.body.username,
				  email:req.body.email,
				  password:req.body.password,
          introduce:req.body.introduce,
          job:req.body.job,
          win:req.body.win
  			})
  		}else{
  			//如果有相同的用户，从新渲染页面,同时显示提示信息
  			res.render('register', { title: '注册页面' ,isShow:true});
  		}
  	}).then(result=>{
  		// 注册成功进入登录页面
  		res.redirect('/login');
  	})



});



module.exports = router;











