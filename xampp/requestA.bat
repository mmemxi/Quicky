REM �W���C���^�[�z���̋��ꗗ��Ԃ�
REM �����P����O�ԍ�
REM �����Q�����[�U�[��
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\requestA.wsf %1 %2 //Nologo >%~dp0%\requestA.txt
exit
