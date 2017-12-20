var express = require('express');
var router = express.Router();
var Article=require('../model/article');



/* GET users listing. */
router.get('/list', function(req, res, next) {

  // 从路径中获得每页显示的条数，和从那一页也开始
	var offset=req.query.offset;
	var limit=req.query.limit;
	
		
	// 在找到相应的两条数据之后，同时要返回数据库中的总条数，就要用到另一个Article的
	// 方法，这是就属于异步操作了，所以需要用promise来解决异步的操作

	Promise.all([Article.count(),Article.find({},{},{limit:limit,skip:offset})]).then(result=>{
			
		// 将返回的结果转换成一个对象
		res.send({
			total:result[0],
			list: result[1]
		});
	})

	
});





module.exports = router;
