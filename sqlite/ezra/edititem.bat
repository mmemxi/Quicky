REM 品目の編集を実行する
REM 引数１＝年度（数値４桁）
REM 引数２＝品目番号
REM 引数３＝品目名
REM 引数４＝分類
REM 引数５＝集計先
REM 引数６＝品目番号タイプ
REM 引数７＝集計先タイプ
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\edititem.wsf %1 %2 %3 %4 %5 %6 %7 //Nologo
exit
