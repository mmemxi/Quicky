REM ���������̋��ꗗ��Ԃ�
REM �����P����O�ԍ�
REM �����Q�����[�U�[��
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\requestB.wsf %1 %2 //Nologo >%~dp0%\requestB.txt
exit
