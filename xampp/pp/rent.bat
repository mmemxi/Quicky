REM ��O�p�̋����؂��
REM �����P����O�ԍ�
REM �����Q�����ԍ�
REM �����R���J�n��
REM �����S�����[�U�[��
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\rent.wsf %1 %2 %3 %4 //Nologo >%~dp0%\rent.txt
exit
