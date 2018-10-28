REM 指定した地図の使用をキャンセルする
REM 引数１＝会衆ID
REM 引数２＝ユーザー名
REM 引数３＝PDFファイル名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\cancel.wsf %1 %2 %3 //Nologo >%~dp0%cancel.txt
exit
