/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 11:08:32
 * @version $Id$
 */


var express = require('express');
var router = express.Router();

// 引入我们自己定义的模块
var User=require('../model/user');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面' ,isShow:false});
});


// 接收登录时的信息，
router.post('/', function(req, res, next) {
	// console.log(req.body);
	
	// 查看数据库中是否有这条信息
	User.find({
		email:req.body.email,
		password:req.body.password
	}).then(result=>{
		// console.log(result);//找到打印出对应的信息列表是一个数组
		if(!result.length==0){//如果有这条信息，则自动跳转到主页面
			// 在浏览器中设置cookie
			res.cookie('lele',result[0].name);
			//在后台设置session
			req.session.leleInfo=result[0]

			res.redirect('/');
		}else{
			res.render('login', { title: '登录页面' ,isShow:true});
		}

	})


  // res.render('login', { title: '登录页面' ,isShow:false});
});





module.exports = router;



