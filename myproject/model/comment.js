/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-31 19:24:30
 * @version $Id$
 */

var mongoose=require("mongoose");

//调用mongoose模块创建一个模型
var  Schema=  mongoose.Schema;

// 规范用户提交的信息
var obj = {
	username:String,
	comment:String,
	id:String,
	// data:{type:Data,default:Date.now}
}

var model = mongoose.model("comment",new Schema(obj));
//model 这个对象，映射的是users  这张表

module.exports = model;//暴露这个对象



