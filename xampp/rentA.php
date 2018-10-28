<?php
$UID=$_COOKIE["CWPerson_UserID"];
$UIDS=mb_convert_encoding($UID,"SJIS-WIN","UTF8");
$congnum=$_COOKIE["CWPerson_congnum"];
$congname=$_COOKIE["CWPerson_congname"];
$num=$_COOKIE["CWPerson_num"];
$seq=$_COOKIE["CWPerson_seq"];
$name=$_COOKIE["CWPerson_name"];
$names=mb_convert_encoding($name,"SJIS-WIN","UTF8");
$target=$congnum . ":" . $UIDS . ":" . $num . ":" . $seq . ":" . $names;
//	会衆番号、ユーザー名、区域番号、地図番号、物件名
exec("cmd.exe /c start rentA.bat $target");
$body=file_get_contents("c:\\xampp\\htdocs\\congworks\\rentA.txt");
$body=mb_convert_encoding($body,"UTF8","SJIS-WIN");
if ($body == "No System")
	{
	echo "Quickyシステムが起動していません。<br>区域係の兄弟にお問い合わせください。<br><br>";
	print "<a href='javascript:location.replace(\"index.php\")'><img src='./img/buttons/back.png'></a><br>";
	exit();
	}
if ($body == "ng")
	{
	header("Location:faultA.php");
	exit();
	}
if ($body == "ok")
	{
	header("Location:mylist.php");
	exit();
	}
?>
