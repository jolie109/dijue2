function addEvent(){
	//导航栏滑过出现下边框
		$(".menu_li").each(function(){
			$(this).hover(
				function(){
					$(this).find(".menu_a").css({
					borderBottom:"5px solid #be9f83"
				});
				},
				function(){
					$(this).find(".menu_a").css({
					borderBottom:0
				});
				}
			);
			
		});
		
		$(".menu_li").each(function(){
			$(this).hover(
				function(){
					$(this).find(".menu_box").css({
						display:"block",
						zIndex:"200",
						background:"#FFF"
					});
					
				},
				function(){
					$(this).find(".menu_box").css({
						display:"none"
					});
					
				}
				
			);
		});
		$(window).scroll(function(){
				$scrolls= document.documentElement.scrollTop||document.body.scrollTop;
				if($scrolls>226){
				$("#menuFixed").css({
					display:"block"
				});
			}else{
				$("#menuFixed").css({
					display:"none"
				});
			}
		});
		
}
