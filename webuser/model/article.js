/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 14:59:25
 * @version $Id$
 */

var mongoose=require("mongoose");

//调用mongoose模块创建一个模型
var  Schema=  mongoose.Schema;

// 规范用户提交的信息
var obj = {
	author:String,
	title:String,
	content:String,
	pathname:String
}

var model = mongoose.model("article",new Schema(obj));
//model 这个对象，映射的是users  这张表

module.exports = model;//暴露这个对象


