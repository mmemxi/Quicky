REM ���������̏ڍׂ�����
REM �����P�����ԍ�:�n�}�ԍ�
REM �����Q��XAMPP�t�H���_��
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\viewB.wsf %1 %~dp0 //Nologo >%~dp0%\viewB.txt
exit
