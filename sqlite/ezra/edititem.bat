REM �i�ڂ̕ҏW�����s����
REM �����P���N�x�i���l�S���j
REM �����Q���i�ڔԍ�
REM �����R���i�ږ�
REM �����S������
REM �����T���W�v��
REM �����U���i�ڔԍ��^�C�v
REM �����V���W�v��^�C�v
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\edititem.wsf %1 %2 %3 %4 %5 %6 %7 //Nologo
exit
