/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-01 20:15:08
 * @version $Id$
 */
var express = require('express');
var router = express.Router();

var User=require('../model/user');

/* GET home page. */


router.get('/', function(req, res, next) {
	User.find({
		name:req.cookies['lele']
	}).then(result=>{
		if(req.cookies["myself"]=="introduce"){
			res.render('myself', {title: '个人页面' ,username:req.cookies['lele'],message:result[0].introduce,isShowI:true,isShowJ:false,isShowW:false});
		}else if(req.cookies["myself"]=="win"){
			res.render('myself', {title: '个人页面' ,username:req.cookies['lele'],message:result[0].win,isShowW:true,isShowI:false,isShowJ:false});
		}else if(req.cookies["myself"]=="job"){
			res.render('myself', {title: '个人页面' ,username:req.cookies['lele'],message:result[0].job,isShowJ:true,isShowI:false,isShowW:false});
		}
	})
	
	
});




module.exports = router;