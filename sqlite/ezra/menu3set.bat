REM ���b�N�̕i�ځ����ʂ�ύX����
REM �����P���N���i���l�U���j
REM �����Q�����b�N�ʒu
REM �����R���R�[�h
REM �����S������
cd /d %~dp0
SET /P edir=<ezra.txt
cd %edir%
cscript .\congworks\menu3set.wsf %1 %2 %3 %4 //Nologo
exit
