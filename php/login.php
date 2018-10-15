<?php
	header("Content-type:text/html;charset=utf-8");
// 1、接受数据
	$username =$_POST['username'];
	$userpass =$_POST['userpass'];
	
	//2、处理数据
			//建立连接（搭桥）
			$con = mysql_connet("localhost","root","root");
			//选择数据库（目的）
			mysql_select_db("login",$con);
			//执行SQL数据
			
			$sqlstr = "insert into vip （username userpass） values ('$username','$userpass')";
			mysql_query($sqlstr,$con);
			
			//关闭数据库
			mysql_close($con);
		//3、响应
		if($result){
			echo "注册成功"
		}else{
			echo "注册失败"
		}
			
?>
1