<?php
if (isset($_COOKIE['CWPP_congnum']))	$congnum=$_COOKIE["CWPP_congnum"];
	else $congnum="";
if (isset($_COOKIE['CWPP_num']))		$num=$_COOKIE["CWPP_num"];
	else $num="";
if (isset($_COOKIE['CWPP_start']))		$startday=$_COOKIE["CWPP_start"];
	else $startday="";
if (isset($_COOKIE['CWPP_mapuser']))	$mapuser=$_COOKIE["CWPP_mapuser"];
	else $mapuser="";
$mapuser=mb_convert_encoding($mapuser,"SJIS-WIN","UTF8");

//	引数＝区域番号、開始日、使用者名
exec("cmd.exe /c start rent.bat $congnum $num $startday $mapuser");
$body=file_get_contents("rent.txt");
$body=mb_convert_encoding($body,"UTF8","SJIS-WIN");
if ($body == "ok")
	{
	header("Location:newlist.php");
	exit();
	}
else{
	header("Location:fault.php");
	exit();
	}
?>
