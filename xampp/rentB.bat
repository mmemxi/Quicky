REM ���������̋����؂��
REM �����P����O�ԍ�:���[�U�[��:���ԍ�:�n�}�ԍ�:��於
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\rentB.wsf %1 //Nologo >%~dp0%\rentB.txt
exit
