<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="ja" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="ja" > <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta property="og:locale" content="ja_JP" />
<?php
$nenget=$_GET['nenget'];
$pos=$_GET['pos'];
$code=$_GET['code'];
$suryo=$_GET['suryo'];

exec("cmd.exe /c start menu3set.bat $nenget $pos $code $suryo");
header("Location:none.php");
exit();
?>
</head>
</html>

