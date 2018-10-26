//---------------------------------------------------------------------------
// sqlite.js
// Congworks���SQlite�̃f�[�^�x�[�X�𑀍삷�邽�߂̃v���O�����Q
//---------------------------------------------------------------------------
// ���p����
// �@�O���[�o���ϐ�
//     basepath      ��   sqlite�t�H���_�����݂����p�X�i�����X���b�V�����j
//     fso           ��   �t�@�C���V�X�e���I�u�W�F�N�g�̐錾�K�v
// �A�R�[������
//   (1)SQ_Init("�f�[�^�x�[�X�t�@�C����");
//                   ��   �w�肵���t�@�C������ΏۂƂ���
//                        ��sqlite�t�H���_�ɑ��݂��邱��
//------------------------------------------------------------
// �O���[�o���ϐ�
//------------------------------------------------------------
var SQ_table="";
//------------------------------------------------------------
// �萔�̐ݒ�
//------------------------------------------------------------
var adTypeBinary=1;
var adTypeText=2;
//-----------------------------------------------------------------------------
// Boolean SQ_Init("�f�[�^�x�[�X�t�@�C����");
//    SQlite�f�[�^�x�[�X�̎g�p��錾���A�f�[�^�x�[�X�t�@�C�����w�肷��
//    �߂�l�Ftrue=�錾����   false=�錾���s�i�t�@�C���w�薳��or���݂��Ȃ��j
//-----------------------------------------------------------------------------
function SQ_Init(dbname)
	{
	var dir="";
	if ((dbname=="")||(dbname==null))	return false;
	if (!fso.FileExists(SQ_Folder()+"\\"+dbname))	return false;
	SQ_table=dbname;
	return true;
	}
//-----------------------------------------------------------------------------
// String SQ_Folder()
//     SQlite��t�H���_����Ԃ�
//-----------------------------------------------------------------------------
function SQ_Folder()
	{
	return basepath+"\\sqlite";
	}
//-----------------------------------------------------------------------------
// String SQ_TempFolder()
//     SQlite�p�̈ꎞ�t�H���_����Ԃ��i�Ȃ���ΐ�������j
//-----------------------------------------------------------------------------
function SQ_TempFolder()
	{
	var dir="c:\\temp\\quicky\\sqlite";
	if (!fso.FolderExists(dir)) fso.CreateFolder(dir,true);
	return dir;
	}
//-----------------------------------------------------------------------------
// Array SQ_Read("�e�[�u����","WHERE��","ORDER��");
//      �w�肵���e�[�u�����烌�R�[�h��ǂݎ��A�߂�l�̔z��Ƃ��ĕԂ�
//      �߂�l�F�I�u�W�F�N�g�z��i�z�񒷁����R�[�h���A�v�f���Ƃ̑������t�B�[���h�j
//-----------------------------------------------------------------------------
function SQ_Read(sql_table,sql_where,sql_order)
	{
	var i=0,s,sql,buf;
	var result=new Array();

	//	���������Ă��Ȃ���΃G���[
	if (SQ_table=="") return result;

	//	���o�̓t�@�C�����̏���
	var cd=WshShell.CurrentDirectory;
	var now=new Date();
	var filetime=now.getMinutes()*100000+now.getSeconds()*1000+now.getMilliseconds();
	var inpfile=SQ_TempFolder()+"SQLin"+filetime+".txt";
	var outfile=SQ_TempFolder()+"SQLout"+filetime+".txt";
	var outfilex=outfile.replace(/\\/g, '\\\\');

	//	SQL�R�}���h�t�@�C���̏���
	var cmd="cmd.exe /c sqlite3.exe "+SQ_table+" <"+inpfile;
	sql="select * from "+sql_table;
	if (sql_where!="") sql+=" where "+sql_where;
	if (sql_order!="") sql+=" order by "+sql_order;
	sql+=";"
	buf=".headers on\n.mode tab\n.output "+outfilex+"\n"+sql+"\n";
	SQ_WriteUTF8(inpfile,buf);

	//	SQlite�̎��s
	WshShell.CurrentDirectory=SQ_Folder();
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=cd;

	//	�������ʂ̎擾
	buf=SQ_ReadUTF8(outfile);
	if (fso.FileExists(inpfile)){try{fso.DeleteFile(inpfile,true);}catch(e){}};
	if (fso.FileExists(outfile)){try{fso.DeleteFile(outfile,true);}catch(e){}};

	//	�������ʂ̕���
	if (buf=="") return result;
	var tbl=buf.split("\n");
	if (tbl.length<=1) return result;
	var line=tbl[0].split("\t");		//	�擪�s�̕����i�^�u�j
	var fields=new Array();
	for(i=0;i<line.length;i++)	fields[i]=line[i];		//	�擪�s�̃t�B�[���h�ꗗ�擾

	for(i=1;i<buf.length;i++)
		{
		if (tbl[i]=="") break;
		line=tbl[i].split("\t");
		result[i-1]=new Object();
		for(j=0;j<fields.length;j++)
			{
			s=fields[j];
			result[i-1][s]=line[j];
			}
		}
	return result;
	}
//-----------------------------------------------------------------------------
// Void SQ_Exec("SQL������");
//      �w�肵��SQL�����܂Ƃ߂Ď��s����B
//      �n�����̂��z��Ȃ�A�����s�A�n�����̂�������Ȃ�P�Ǝ��s
//-----------------------------------------------------------------------------
function SQ_Exec(sqlArray)
	{
	var i=0,s,o,sql,buf="";

	//	���������Ă��Ȃ���΃G���[
	if (SQ_table=="") return result;

	//	���o�̓t�@�C�����̏���
	var cd=WshShell.CurrentDirectory;
	var now=new Date();
	var filetime=now.getMinutes()*100000+now.getSeconds()*1000+now.getMilliseconds();
	var inpfile=SQ_TempFolder()+"SQLin"+filetime+".txt";

	//	SQL�R�}���h�t�@�C���̏���
	var cmd="cmd.exe /c sqlite3.exe "+SQ_table+" <"+inpfile;
	if (sqlArray instanceof Array)		//	�z���n�����ꍇ
		{
		for(i=0;i<sqlArray.length;i++)
			{
			buf+=sqlArray[i]+"\n";
			}
		}
	else{								//	�P�ƕ�����̏ꍇ
		buf+=sqlArray+"\n";
		}
	SQ_WriteUTF8(inpfile,buf);

	//	SQlite�̎��s
	WshShell.CurrentDirectory=SQ_Folder();
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=cd;
	if (fso.FileExists(inpfile)){try{fso.DeleteFile(inpfile,true);}catch(e){}};
	}
//-----------------------------------------------------------------------------
function SQ_Insert(sql_table,writeObj)
	{
	var i,j,k,s,sql,buf;
	var v1,v2;
	if (writeObj instanceof Array)
		{
		sql=new Array();
		sql.push("BEGIN TRANSACTION;");
		for(i=0;i<writeObj.length;i++)
			{
			v1="";v2="";
			s="INSERT INTO "+sql_table;
			k=0;
			for(j in writeObj[i])
				{
				if (k!=0) {v1+=",";v2+=",";}
				v1+=j;
				v2+="\""+writeObj[i][j]+"\"";
				k++;
				}
			buf=s+"("+v1+") VALUES("+v2+");";
			sql.push(buf);
			}
		sql.push("COMMIT;");
		}
	else{
		sql="";
		v1="";v2="";
		s="INSERT INTO "+sql_table;
		k=0;
		for(j in writeObj)
			{
			if (k!=0) {v1+=",";v2+=",";}
			v1+=j;
			v2+="\""+writeObj[j]+"\"";
			k++;
			}
		sql=s+"("+v1+") VALUES("+v2+");";
		}
	SQ_Exec(sql);
	}
//-----------------------------------------------------------------------------
function SQ_Replace(sql_table,writeObj)
	{
	var i,j,k,s,sql,buf;
	var v1,v2;
	if (writeObj instanceof Array)
		{
		sql=new Array();
		sql.push("BEGIN TRANSACTION;");
		for(i=0;i<writeObj.length;i++)
			{
			v1="";v2="";
			s="REPLACE INTO "+sql_table;
			k=0;
			for(j in writeObj[i])
				{
				if (k!=0) {v1+=",";v2+=",";}
				v1+=j;
				v2+="\""+writeObj[i][j]+"\"";
				k++;
				}
			buf=s+"("+v1+") VALUES("+v2+");";
			sql.push(buf);
			}
		sql.push("COMMIT;");
		}
	else{
		sql="";
		v1="";v2="";
		s="REPLACE INTO "+sql_table;
		k=0;
		for(j in writeObj)
			{
			if (k!=0) {v1+=",";v2+=",";}
			v1+=j;
			v2+="\""+writeObj[j]+"\"";
			k++;
			}
		sql=s+"("+v1+") VALUES("+v2+");";
		}
	SQ_Exec(sql);
	}
//-----------------------------------------------------------------------------
function SQ_Update(sql_table,writeObj,wherestr)
	{
	var i,j,k,s,sql;
	var v1,v2;
	if (writeObj instanceof Array)
		{
		sql=new Array();
		sql.push("BEGIN TRANSACTION;");
		for(i=0;i<writeObj.length;i++)
			{
			s="UPDATE "+sql_table+"SET ";
			k=0;
			for(j in writeObj[i])
				{
				if (k!=0) s+=",";
				s+=j+"=\""+writeObj[i][j]+"\"";
				k++;
				}
			if (wherestr!="") s+=" WHERE "+wherestr;
			sql.push(s);
			}
		sql.push("COMMIT;");
		}
	else{
		sql="";
		s="UPDATE "+sql_table+"SET ";
		k=0;
		for(j in writeObj)
			{
			if (k!=0) s+=",";
			s+=j+"=\""+writeObj[j]+"\"";
			k++;
			}
		if (wherestr!="") s+=" WHERE "+wherestr;
		sql=s;
		}
	SQ_Exec(sql);
	}
//-----------------------------------------------------------------------------
function SQ_Delete(sql_table,sql_where)
	{
	var sql="DELETE FROM "+sql_table;
	if (sql_where!="") sql+=" WHERE "+sql_where;
	sql+=";"
	SQ_Exec(sql);
	}
//------------------------------------------------------------
function SQ_ReadUTF8(filename)
	{
	var buf;
	var ADODB=new ActiveXObject("ADODB.Stream");
	ADODB.Charset="UTF-8";
	try	{
		ADODB.Open();
		ADODB.LoadFromFile(filename);
		buf=ADODB.ReadText(-2);
		ADODB.Close();
		}
	catch(e){buf="";}
	return buf;
	}
//------------------------------------------------------------
function SQ_WriteUTF8(filename,buffer)
	{
	var ADODB=new ActiveXObject("ADODB.Stream");
	ADODB.Type=adTypeText;
	ADODB.Charset='UTF-8';
	ADODB.Open();
	ADODB.WriteText(buffer,0);
	ADODB.Position=0;
	ADODB.Type=adTypeBinary;
	ADODB.Position=3;
	var bin=ADODB.Read();
	ADODB.close();
	ADODB.Type=adTypeBinary;
	try	{
		ADODB.Open();
		ADODB.Write(bin);
		ADODB.SaveToFile(filename);
		ADODB.Close();
		}
	catch(e){return false;}
	return true;
	}
