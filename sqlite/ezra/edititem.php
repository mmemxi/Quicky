<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="ja" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="ja" > <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta property="og:locale" content="ja_JP" />
<?php
$nendo=$_GET['nendo'];
$code=$_GET['code'];
$name=$_GET['name'];
$kubun=$_GET['kubun'];
$alter=$_GET['alter'];
$codetype=$_GET['codetype'];
$sumtype=$_GET['sumtype'];

$names=mb_convert_encoding($name,"SJIS-WIN","UTF8");
$kubuns=mb_convert_encoding($kubun,"SJIS-WIN","UTF8");
$alters=mb_convert_encoding($alter,"SJIS-WIN","UTF8");

exec("cmd.exe /c start edititem.bat $nendo $code \"$names\" \"$kubuns\" \"$alters\" $codetype $sumtype");
?>
</head>
</html>

