
window.onload=function(){
		var arr = ["1","2","3","4","a","b","c","d","A","B","C","D"];
	
		var str="";
		for(var i=0;i<4;i++){
		//随机取下标
		var index = parseInt(Math.random()*arr.length);
		//拼接
		str+=arr[index];
	}	
		$("#showyzm").innerHTML=str;
}		
		
		$("#yzmSpan").onclick=function(){
			var arr = ["1","2","3","4","a","b","c","d","A","B","C","D"];
	
			var str="";
			for(var i=0;i<4;i++){
		//随机取下标
			var index = parseInt(Math.random()*arr.length);
		//拼接
			str+=arr[index];
	}	
			$("#showyzm").innerHTML=str;	
				
	}	
		$("#showyzm").onclick=function(){
			var arr = ["1","2","3","4","a","b","c","d","A","B","C","D"];
	
			var str="";
			for(var i=0;i<4;i++){
		//随机取下标
			var index = parseInt(Math.random()*arr.length);
		//拼接
			str+=arr[index];
	}	
			$("#showyzm").innerHTML=str;	
				
	}