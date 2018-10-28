REM ‰ïO—p‚Ì‹æˆæ‚Ì‘Ýo‚ðŽæ‚èÁ‚·
REM ˆø”‚P‰ïO”Ô†
REM ˆø”‚Q‹æˆæ”Ô†
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\cancelpp.wsf %1 %2 //Nologo
exit
