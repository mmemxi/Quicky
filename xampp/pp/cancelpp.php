<?php
if (isset($_COOKIE['CWPP_congnum']))	$congnum=$_COOKIE["CWPP_congnum"];
	else $congnum="";
if (isset($_COOKIE['CWPP_num']))		$num=$_COOKIE["CWPP_num"];
	else $num="";
exec("cmd.exe /c start cancelpp.bat $congnum $num");
header("Location:newlist.php");
exit();
?>
