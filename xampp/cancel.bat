REM �w�肵���n�}�̎g�p���L�����Z������
REM �����P����OID
REM �����Q�����[�U�[��
REM �����R��PDF�t�@�C����
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\cancel.wsf %1 %2 %3 //Nologo >%~dp0%cancel.txt
exit
