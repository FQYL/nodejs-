var express = require('express');
var router = express.Router();

var Article=require('../model/article');

/* GET home page. */


router.get('/', function(req, res, next) {

	// 首先判断后台是否有存储的信息
	if(req.session.leleInfo){
		// 在渲染页面之前，先根据用户名将内容显示出来
		Article.find({
			author:req.cookies['lele']
		}).then(result=>{
			res.render('index', {title: '个人页面' ,username:req.cookies['lele'],list:result});
		})
		

	}else{
		res.redirect('/login');
	}
});


// 点击注销当前用户
router.get('/layout', function(req, res, next) {
	req.session.destroy(()=>{
		//注销之后重定向到登录页面
		res.redirect('/login');
	})
});

module.exports = router;



