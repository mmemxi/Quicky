REM ��O�p�V�K���̊J�n�O�m�F
REM �����P����O�ԍ�
REM �����Q�����ԍ�
cd /d %~dp0
SET /P qdir=<../quicky.txt
cd %qdir%
cscript .\congworks\verify.wsf %1 %2 //Nologo >%~dp0%\verify.txt
exit
