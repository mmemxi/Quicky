REM �w��N���̃��b�N���쐬����
REM �����P���N���i���l�U���j
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3new.wsf %1 //Nologo
exit
