//-----------------------------------------------------------------------------
//	RefreshPublicList(num)  éwíËÇµÇΩãÊàÊÇÃégópèÛãµÇçÏê¨Ç∑ÇÈ
//-----------------------------------------------------------------------------
function RefreshPublicList(num)
	{
	var i,j=0;
	var obj=new Object();
	obj.congnum=congnum;
	obj.num=num;
	obj.name=Cards[num].name;
	obj.kbn=Cards[num].kubun;
	obj.nowusing=Cards[num].NowUsing;
	obj.lastuse=Cards[num].lastuse;
	obj.lastuser=Cards[num].LastUser;
	ReplaceSQlite("Preaching_PublicList",obj);
	}
//-----------------------------------------------------------------------------
function ReadSQlite(sql_table,sql_where,sql_order)
	{
	var cd=WshShell.CurrentDirectory;
	var now=new Date();
	var filetime=now.getMinutes()*100000+now.getSeconds()*1000+now.getMilliseconds();
	var inpfile=GetTempFolder()+"\\SQLin"+filetime+".txt";
	var outfile=GetTempFolder()+"\\SQLout"+filetime+".txt";
	var outfilex=outfile.replace(/\\/g, '\\\\');
	var i=0,s,o,sql,buf;
	var result=new Array();
	var cmd="cmd.exe /c sqlite3.exe congworks.db <"+inpfile;
	sql="select * from "+sql_table;
	if (sql_where!="") sql+=" where "+sql_where;
	if (sql_order!="") sql+=" order by "+sql_order;
	sql+=";"
	buf=".headers on\n.mode tab\n.output "+outfilex+"\n"+sql+"\n";
	var f=fso.CreateTextFile(inpfile,true);
	f.Write(buf);
	f.close();
	WshShell.CurrentDirectory=basepath+"\\sqlite";
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=cd;
	buf=ReadUTF8(outfile);
	if (fso.FileExists(inpfile)){try{fso.DeleteFile(inpfile,true);}catch(e){}};
	if (fso.FileExists(outfile)){try{fso.DeleteFile(outfile,true);}catch(e){}};
	if (buf=="") return result;
	var tbl=buf.split("\n");
	if (tbl.length<=1) return result;
	var line=tbl[0].split("\t");
	var fields=new Array();
	for(i=0;i<line.length;i++)	fields[i]=line[i];
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
function ExecSQlite(sqlArray)
	{
	var cd=WshShell.CurrentDirectory;
	var now=new Date();
	var filetime=now.getMinutes()*100000+now.getSeconds()*1000+now.getMilliseconds();
	var inpfile=GetTempFolder()+"\\SQLin"+filetime+".txt";
	var cmd="cmd.exe /c sqlite3.exe congworks.db <"+inpfile;
	var i=0,s,o,sql,buf="";
	if (sqlArray instanceof Array)
		{
		for(i=0;i<sqlArray.length;i++)
			{
			buf+=sqlArray[i]+"\n";
			}
		}
	else{
		buf+=sqlArray+"\n";
		}
	WriteUTF8(inpfile,buf);
	WshShell.CurrentDirectory=basepath+"\\sqlite";
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=cd;
	if (fso.FileExists(inpfile)){try{fso.DeleteFile(inpfile,true);}catch(e){}};
	}
//-----------------------------------------------------------------------------
function InsertSQlite(sql_table,writeObj)
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
	ExecSQlite(sql);
	}
//-----------------------------------------------------------------------------
function ReplaceSQlite(sql_table,writeObj)
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
	ExecSQlite(sql);
	}
//-----------------------------------------------------------------------------
function UpdateSQlite(sql_table,writeObj,wherestr)
	{
	var i,j,k,s,sql,buf;
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
	ExecSQlite(sql);
	}
//-----------------------------------------------------------------------------
function DeleteSQlite(sql_table,sql_where)
	{
	var i,s,sql;
	sql="DELETE FROM "+sql_table;
	if (sql_where!="") sql+=" WHERE "+sql_where;
	sql+=";"
	ExecSQlite(sql);
	}
//-----------------------------------------------------------------------------
/*
var sql = "select * from Preaching_Campeign;";
var r;
DeleteSQlite("Preaching_Campeign","range_start=20171001");
*/
/*
r=new Array();
for(i=0;i<=5;i++)
	{
	r[i]=new Object();
	r[i].range_start=20180101;
	r[i].range_end=20180131;
	r[i].interval=21;
	}
WriteSQlite("Preaching_Campeign",r,true);
*/
/*
r=ReadSQlite("Preaching_Campeign","range_start>=20171001","");
if (r.length==0) WScript.echo("No record");
else{
for(i=0;i<r.length;i++)
	{
	WScript.echo(r[i].range_start+"-"+r[i].range_end);
	}
}
*/
//------------------------------------------------------------
// íËêîÇÃéÊìæ
//------------------------------------------------------------
var adTypeBinary=1;
var adTypeText=2;
//------------------------------------------------------------
function ReadUTF8(filename)
	{
	var ADODB=new ActiveXObject("ADODB.Stream");
	ADODB.Charset="UTF-8";
	try	{
		ADODB.Open();
		ADODB.LoadFromFile(filename);
		var buf=ADODB.ReadText(-2);
		ADODB.Close();
		}
	catch(e){buf="";}
	return buf;
	}
//------------------------------------------------------------
function WriteUTF8(filename,buffer)
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
function ReadFile(filename)
	{
	var stream,text,f,e;
	if (!fso.FileExists(filename)) return "";
	stream=fso.OpenTextFile(filename,1,false,-2);
	try	{
		text=stream.ReadAll();
		}
	catch(e)
		{
		text="";
		}
	stream.Close();
	return text;
	}
