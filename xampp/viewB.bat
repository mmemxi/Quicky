REM ·ú¯çîÌÚ×ð©é
REM øPææÔ:n}Ô
REM øQXAMPPtH_¼
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\viewB.wsf %1 %~dp0 //Nologo >%~dp0%\viewB.txt
exit
