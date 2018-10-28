REM 集中インターホンの詳細を見る
REM 引数１＝会衆ID:ユーザー名:区域番号:地図番号:物件名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\viewA.wsf %1 %~dp0 //Nologo >%~dp0%\viewA.txt
exit
