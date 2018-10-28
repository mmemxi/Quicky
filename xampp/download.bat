REM 指定したPDF地図を生成し、ファイル名を返す
REM 引数１＝会衆ID
REM 引数２＝ユーザー名
REM 引数３＝PDFファイル名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\download.wsf %1 %2 %3 %~dp0 //Nologo >%~dp0%download.txt
exit
