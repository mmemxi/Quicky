REM 集中インターホンの区域を借りる
REM 引数１＝会衆番号:ユーザー名:区域番号:地図番号:物件名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\rentA.wsf %1 //Nologo >%~dp0%\rentA.txt
exit
