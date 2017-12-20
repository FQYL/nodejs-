/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 16:18:53
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var Article=require('../model/article');
var Comment=require('../model/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(req.query) //获得路径
	

	
	Promise.all([Article.find({_id:req.query.id}),Comment.find({id:req.query.id})]).then(result=>{
		res.render('detail', { title: '详情页面',info:result[0],list:result[1]});
	})


});


module.exports = router;






