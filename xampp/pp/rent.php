<?php
if (isset($_COOKIE['CWPP_congnum']))	$congnum=$_COOKIE["CWPP_congnum"];
	else $congnum="";
if (isset($_COOKIE['CWPP_num']))		$num=$_COOKIE["CWPP_num"];
	else $num="";
if (isset($_COOKIE['CWPP_start']))		$startday=$_COOKIE["CWPP_start"];
	else $startday="";
if (isset($_COOKIE['CWPP_mapuser']))	$mapuser=$_COOKIE["CWPP_mapuser"];
	else $mapuser="";
if (isset($_COOKIE['CWToken']))	$CWToken=$_COOKIE["CWToken"];
	else $CWToken="unknown";
$mapuser=mb_convert_encoding($mapuser,"SJIS-WIN","UTF8");

//	引数＝区域番号、開始日、使用者名
$cwpath=file_get_contents('../quicky.txt', true) . "\\congworks\\";
exec("cscript " . $cwpath . "rent.wsf $congnum $num $startday $mapuser //Nologo",$out);
$body=mb_convert_encoding($out[0],"UTF8","SJIS-WIN");
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
