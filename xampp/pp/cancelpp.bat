REM ��O�p�̋��̑ݏo��������
REM �����P����O�ԍ�
REM �����Q�����ԍ�
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\cancelpp.wsf %1 %2 //Nologo
exit
