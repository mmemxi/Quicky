<?php
if (isset($_COOKIE['CWPP_congnum']))	$congnum=$_COOKIE["CWPP_congnum"];
	else $congnum="";
if (isset($_COOKIE['CWPP_num']))		$num=$_COOKIE["CWPP_num"];
	else $num="";
if (isset($_COOKIE['CWToken']))	$CWToken=$_COOKIE["CWToken"];
	else $CWToken="unknown";

$cwpath=dirname(__FILE__,3) . "\\congworks\\";
exec("cscript \"" . $cwpath . "cancelpp.wsf\" $congnum $num //Nologo",$out);
header("Location:newlist.php");
exit();
?>
