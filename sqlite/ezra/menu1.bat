REM 年度ごとの品目リストを表示する
REM 引数１＝年度（数値４桁）
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu1.wsf %1 //Nologo >%~dp0%\menu1.txt
exit
