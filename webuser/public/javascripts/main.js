/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-01 15:27:13
 * @version $Id$
 */

// 用面向对象的方式来写js文件通过ajax进行数据请求
function Main(){
	// 首先调用init方法，在页面中显示两条数据
	this.init();
}


// 首先第一步给Main这个构造函数拓展属性和方法
$.extend(Main.prototype,{
	init:function(){
		$.ajax({
			url:"./users/list",
			data:{limit:5,offset:0},
			success:(result)=>{//箭头函数能够解决this的指向问题
				// 调用下面两个函数，将内容渲染到浏览器中，同时实现分页效果
				this.renderList(result.list);
			
				this.renderPaginate(result.total);
			}
		})
	},

	renderList:function(list){
		// 获得数据库中的信息之后，循环创建，并添加到页面中
		for(var i= 0;i<list.length;i++){
			// 创建li标签并添加内容，// 该图片路径需要到localhost：3000处去找
			var $li=$("<li style='margin-top:20px;'>").html(`
					<div class="media">
					  <div class="media-left media-middle">
					    <a href="#">
					      <img class="media-object" src="http://localhost:3000${list[i].pathname}" alt="...">
					    </a>
					  </div>
					  <div class="media-body">
					    <h4 class="media-heading">${list[i].title}</h4>
					    	${list[i].content}			
					  </div>
					</div>
					<input type='hidden' value='${list[i]._id}' />
				`);
			// 给li加点击事件，点击之后进入详情页面
			$li.click(function(){
				location.href='./detail.html?id='+$(this).children("input").val();
			})

			$(".list").append($li);
		}
	},

	renderPaginate:function(total){
		// console.log(total);//在此处打印的是总数，根据总数来确定需要需要创建
		// 多少个分页
		var _this=this
		for(var i=0;i<total;i+=5){//每一次跳两下
			var $li=$("<li style='cursor:pointer;'>").html(`<a>${i/5+1}</a>`)
			// 给每一个li加点击事件，点击之后显示自己的下标
			$li.click(function(){
				_this.renderListNext($(this).index())
			});
			$('.pagination').append($li);
		}
	},

	renderListNext:function(index){
		// 再一次进行ajax请求，在点击下面的分页时修改页面中内容
		//在加载之前先清空ul中的内容 
		$(".list").empty();
		$.ajax({
			url:"./users/list",
			data:{limit:5,offset:index*5},
			success:(result)=>{//箭头函数能够解决this的指向问题
				// 调用下面两个函数，将内容渲染到浏览器中，同时实现分页效果
				// 分页的东西不需要再次渲染
				this.renderList(result.list);
			}
		})
	}
})



new Main();//给构造函数进行实例化 
