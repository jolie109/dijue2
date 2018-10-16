function addFoot(){
	$(".icon_li").hover(
		function(){
			$(this).removeClass("iconOut");
			$(this).addClass("iconIn");
			
		},
		function(){
			$(this).removeClass("iconIn");
			$(this).addClass("iconOut");
		}
	
	);	
}
