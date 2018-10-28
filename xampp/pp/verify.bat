REM 会衆用新規区域の開始前確認
REM 引数１＝会衆番号
REM 引数２＝区域番号
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\verify.wsf %1 %2 //Nologo >%~dp0%\verify.txt
exit
