REM �W���C���^�[�z���̏ڍׂ�����
REM �����P����OID:���[�U�[��:���ԍ�:�n�}�ԍ�:������
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\viewA.wsf %1 %~dp0 //Nologo >%~dp0%\viewA.txt
exit
