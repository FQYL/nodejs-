/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-01 17:42:58
 * @version $Id$
 */
var express = require('express');
var router = express.Router();
var Article=require('../model/article');
var Discuss=require('../model/discuss')

/* GET home page. */
// 接收匿名评论


router.post('/', function(req, res, next) {
	Discuss.create({
		id:req.body.id,
		discuss:req.body.discuss
	})  
});


router.get('/', function(req, res, next) {
	console.log(req.query.id);
	Promise.all([Discuss.find({id:req.query.id}),Article.find({_id:req.query.id})]).then(result=>{
		res.send(result);
	})
});


module.exports = router;









