REM �w�肵��PDF�n�}�𐶐����A�t�@�C������Ԃ�
REM �����P����OID
REM �����Q�����[�U�[��
REM �����R��PDF�t�@�C����
cd /d %~dp0
SET /P qdir=<quicky.txt
cd %qdir%
cscript .\congworks\download.wsf %1 %2 %3 %~dp0 //Nologo >%~dp0%download.txt
exit
