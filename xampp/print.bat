REM wèµ½PDFn}ðóü·é
REM øPïOhc
REM øQ[U[¼
REM øRn}PDFt@C¼
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\print.wsf %1 %2 %3 //Nologo >%~dp0%print.txt
exit
