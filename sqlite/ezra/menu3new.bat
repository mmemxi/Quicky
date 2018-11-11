REM 指定年月のラックを作成する
REM 引数１＝年月（数値６桁）
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3new.wsf %1 //Nologo
exit
