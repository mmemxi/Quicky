﻿<?php
// 引数取得
$pdf=$_GET['Target'];
$pdf=mb_convert_encoding($pdf,"SJIS-WIN","UTF8");
// Cookie取得
$congnum=$_COOKIE["CWPerson_congnum"];
$userid=$_COOKIE["CWPerson_UserID"];
$userids=mb_convert_encoding($userid,"SJIS-WIN","UTF8");

exec("cmd.exe /c start cancel.bat $congnum $userids $pdf");
$body=file_get_contents("c:\\xampp\\htdocs\\congworks\\cancel.txt");
if ($body == "No System")
	{
	echo "Quickyシステムが起動していません。<br>区域係の兄弟にお問い合わせください。<br><br>";
	print "<a href='index.php'><img src='./img/buttons/back.png'></a><br>";
	exit();
	}
else{
	header( "Location: mylist.php");
	exit();
	}
?>
