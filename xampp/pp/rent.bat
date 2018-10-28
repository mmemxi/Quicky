REM 会衆用の区域を借りる
REM 引数１＝会衆番号
REM 引数２＝区域番号
REM 引数３＝開始日
REM 引数４＝ユーザー名
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\rent.wsf %1 %2 %3 %4 //Nologo >%~dp0%\rent.txt
exit
