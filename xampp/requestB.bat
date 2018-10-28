REM ’·Šú—¯Žç‘î‚Ì‹æˆæˆê——‚ð•Ô‚·
REM ˆø”‚P‰ïO”Ô†
REM ˆø”‚Qƒ†[ƒU[–¼
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\requestB.wsf %1 %2 //Nologo >%~dp0%\requestB.txt
exit
