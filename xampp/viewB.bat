REM 長期留守宅の詳細を見る
REM 引数１＝区域番号:地図番号
REM 引数２＝XAMPPフォルダ名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\viewB.wsf %1 %~dp0 //Nologo >%~dp0%\viewB.txt
exit
