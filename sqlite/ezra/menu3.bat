REM ���b�N�����擾����
REM �����P���N���i���l�U���j
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3.wsf %1 //Nologo >%~dp0%\menu3.txt
exit
