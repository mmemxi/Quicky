REM 長期留守宅の区域を借りる
REM 引数１＝会衆番号:ユーザー名:区域番号:地図番号:区域名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\rentB.wsf %1 //Nologo >%~dp0%\rentB.txt
exit
