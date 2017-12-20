/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-01 17:06:36
 * @version $Id$
 */

// 首先获得首页发送过来的id值
var str=location.search
var id=str.split("=")[1]


$.ajax({
	url:'./detail',
	data:{'id':id},
	success:function(res){
		//动态创建评论 
		for(var j=0;j<res[0].length;j++){
			$p=$("<p style='font-size:14px;'>").html("评论内容："+res[0][j].discuss);
			$(".discuss").prepend($p);
		}
		
		// 动态创建信息
		$(".title").html(res[1][0].title)
		$(".author").html("作者："+res[1][0].author)
		$(".content").html(res[1][0].content)
		$("#hidden").val(res[1][0]._id);
	}
})





