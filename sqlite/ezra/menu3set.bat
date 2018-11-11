REM ラックの品目＆数量を変更する
REM 引数１＝年月（数値６桁）
REM 引数２＝ラック位置
REM 引数３＝コード
REM 引数４＝数量
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3set.wsf %1 %2 %3 %4 //Nologo
exit
