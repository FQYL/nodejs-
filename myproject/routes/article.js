/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 14:48:11
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var Article=require('../model/article');


// 要想接收文件，首先需要引入一个模块
var multer  = require('multer')

// 调用这段代码，用来确定文件的路径，同时确定文件的名称
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('article', { title: '发表页面',isShow:true });
});


router.post('/', upload.single('lelephone'), function(req, res, next) {
	Article.create({
		author:req.cookies['lele'],
		title:req.body.title,
		content:req.body.content,
		pathname:req.file?`/images/${req.file.filename}`:null//将路径放到数据库中
	}).then(result=>{
		// 提交成功之后，跳转到机密页面
		res.redirect('/');
	})
});



// 点击删除相应的文章
router.get('/delete', function(req, res, next) {
	Article.findByIdAndRemove(req.query.id).then(result=>{
		//如果找到了直接删除，执行then函数，重定向到主页面
		res.redirect('/');
	})
});



// 点击修改的时候，首先将页面渲染到页面中，同时将信息传到页面中
router.get('/fixed', function(req, res, next) {
	Article.find({
		_id:req.query.id
	}).then(result=>{
		res.render('article', {title:'修改页面',isShow:false,info:result[0]});
	})
});



// 根据传过来的id到数据库中进行查找
router.post('/fixed', upload.single('lelephone'), function(req, res, next) {
	Article.findByIdAndUpdate(req.body.id,{$set:{title:req.body.title,content:req.body.content,pathname:req.file?"/images/"+req.file.filename+"":null}}).then(result=>{

			res.redirect("/");
	})
});



module.exports = router;


