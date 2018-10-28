REM 指定したPDF地図を印刷する
REM 引数１＝会衆ＩＤ
REM 引数２＝ユーザー名
REM 引数３＝地図PDFファイル名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\print.wsf %1 %2 %3 //Nologo >%~dp0%print.txt
exit
