REM �w�肵��PDF�n�}���������
REM �����P����O�h�c
REM �����Q�����[�U�[��
REM �����R���n�}PDF�t�@�C����
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\print.wsf %1 %2 %3 //Nologo >%~dp0%print.txt
exit
