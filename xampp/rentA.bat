REM �W���C���^�[�z���̋����؂��
REM �����P����O�ԍ�:���[�U�[��:���ԍ�:�n�}�ԍ�:������
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\rentA.wsf %1 //Nologo >%~dp0%\rentA.txt
exit
