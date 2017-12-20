/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-02 10:36:53
 * @version $Id$
 */

var mongoose=require("mongoose");

//调用mongoose模块创建一个模型
var  Schema=  mongoose.Schema;

// 规范用户提交的信息
var obj = {
	discuss:String,
	id:String
}

var model = mongoose.model("discuss",new Schema(obj));
//model 这个对象，映射的是users  这张表

module.exports = model;//暴露这个对象
