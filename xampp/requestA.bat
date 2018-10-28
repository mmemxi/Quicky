REM 集中インターホンの区域一覧を返す
REM 引数１＝会衆番号
REM 引数２＝ユーザー名
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\requestA.wsf %1 %2 //Nologo >%~dp0%\requestA.txt
exit
