REM �N�x���Ƃ̕i�ڃ��X�g��\������
REM �����P���N�x�i���l�S���j
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu1.wsf %1 //Nologo >%~dp0%\menu1.txt
exit
