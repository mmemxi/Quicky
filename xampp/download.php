<?php
// 引数取得
$pdf=$_GET['Target'];
$pdf=mb_convert_encoding($pdf,"SJIS-WIN","UTF8");
// Cookie取得
$congnum=$_COOKIE["CWPerson_congnum"];
$userid=$_COOKIE["CWPerson_UserID"];
$userids=mb_convert_encoding($userid,"SJIS-WIN","UTF8");

// ファイルダウンロード処理
exec("cmd.exe /c start download.bat $congnum $userids $pdf");
// 生成したファイル名を取得
$body=file_get_contents("c:\\xampp\\htdocs\\congworks\\download.txt");
$body=mb_convert_encoding($body,"UTF8","SJIS-WIN");
if ($body == "No System")
	{
	echo "Quickyシステムが起動していません。<br>区域係の兄弟にお問い合わせください。<br><br>";
	print "<a href='index.php'><img src='./img/buttons/back.png'></a><br>";
	exit();
	}
$file=basename($body);
$pdf="./pdf/download.pdf";
// ダウンロードするダイアログを出力
header("Content-Type: application/pdf");
header("Content-Disposition: attachment; filename=$file");
// ファイルを読み込んで出力
readfile($pdf);
exit();
?>
