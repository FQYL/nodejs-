/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 19:11:36
 * @version $Id$
 */

var express = require('express');
var router = express.Router();

var Article=require('../model/article');

// 引入数据库中comment表格
var Comment=require('../model/comment');


router.get('/', function(req, res, next) {
	
	res.render('comment', {title: '机密页面',id:req.query.id});
});

router.post('/', function(req, res, next) {
	// 将提交的内容放到数据库中
	Comment.create({
		username:req.body.username,
		comment:req.body.comment,
		id:req.body.id,
	}).then(result=>{
		res.redirect('/');
	})
});



module.exports = router;




