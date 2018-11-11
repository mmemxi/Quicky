REM ラック情報を取得する
REM 引数１＝年月（数値６桁）
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3.wsf %1 //Nologo >%~dp0%\menu3.txt
exit
