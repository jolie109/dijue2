
//镜子函数
function mirrorFunc(){
	
//		mirrorFunc(event);
		let evt = event || window.event;
		//处理数据
		let left1 = evt.pageX-$("#picture").offset().left-50;
		let top1 = evt.pageY-$("#picture").offset().top-50;
		//处理边界
		if(left1<=0){
			left1 = 0;
		}else if(left1>=485){
			left1 = 485;
		}
		if(top1<=0){
			top1 = 0;
		}else if(top1>=485){
			top1 = 485;
		}
	
		//改变外观
		$("#Bigmorror").css({
			left:left1 +"px",
			top:top1 +"px"
		});
		
		//鼠标移动镜子时  右面放大效果
		$("#showBox").css({
			backgrundImage:"$('#picture').src",
			backgroundPosition:(-1*2*left1)+"px "+(-1*2*top1)+"px"
		});
}

//显示隐藏函数

