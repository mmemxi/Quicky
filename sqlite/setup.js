//-----------------------------------------------------------------------------
function SQliteSetup()
	{
//	CreateReportLogs();
//	CreateUsers();
//	CreateConfig();
//	LogSetUp();
	}
//-----------------------------------------------------------------------------
function SQGetDate(str)
	{
	var tbl=str.split("/");
	var yyyy=parseInt(tbl[0],10);
	var mm=parseInt(tbl[1],10);
	var dd=parseInt(tbl[2],10);
	var result=yyyy*10000+mm*100+dd;
	return result;
	}
//-----------------------------------------------------------------------------
// CreateReportLogs()
//-----------------------------------------------------------------------------
function CreateReportLogs()
	{
	var i,j;
	var p1,p2,p3;
	var obj=new Array();

	SQ_Exec("drop table ReportLogs;");
	SQ_Exec("create table ReportLogs (congnum integer,execdate integer,range_start integer,range_end integer);");

	var text=ReadFile(ReportLog());
	var lines = text.split(/\r\n/);
	j=0;
	for(i=0;i<lines.length;i++)
		{
		p1=lines[i].indexOf("(",0);
		if (p1==-1) break;
		p2=lines[i].indexOf("`",p1);
		p3=lines[i].indexOf(")",p2);
		obj[j]=new Object();
		obj[j].congnum="34173";
		obj[j].execdate=SQGetDate(lines[i].substring(0,p1));
		obj[j].range_start=SQGetDate(lines[i].substring(p1+1,p2));
		obj[j].range_end=SQGetDate(lines[i].substring(p2+1,p3));
		j++;
		}
	SQ_Insert("ReportLogs",obj);
	}

//-----------------------------------------------------------------------------
// CreateConfig
//-----------------------------------------------------------------------------
function CreateConfig()
	{
	var cfg=new Object();
	ExecSQlite("DELETE FROM CWConfig;");
	cfg.congnum=34173;
	cfg.AutoEndDefault=60;
	cfg.AutoEndApart=60;
	cfg.BlankMin=28;
	cfg.ChiefClient=-2009870003;
	cfg.RemoteHost="ftp.congworks.890m.com";
	cfg.RemoteUser="u616822746";
	cfg.RemotePassword="jw34173";
	cfg.RemoteDirectory="/public_html";
	InsertSQlite("CWConfig",cfg);
	}
//-----------------------------------------------------------------------------
//	CreateUsers
//-----------------------------------------------------------------------------
function CreateUsers()
	{
	ExecSQlite("DELETE FROM CWUsers;");
	var f=ReadFile(SysFolder()+"users.txt");
	var tbl1=f.split("\r\n");
	f=ReadFile(SysFolder()+"users2.txt");
	var tbl2=f.split("\r\n");
	var out1=new Array();
	var out2=new Array();
	for(i=0;i<tbl1.length;i++)
		{
		s=tbl1[i];
		if (s=="") continue;
		if (!(s in out1))
			{
			out1[s]=new Object();
			out1[s].congnum=congnum;
			out1[s].userid=s;
			out1[s].authority="publicservice";
			}
		else{
			if (out1[s].authority.indexOf("publicservice",0)==-1)
				{
				if (out1[s].authority!="") out1[s].authority+=";";
				ou1t[s].authority+="publicservice";
				}
			}
		}
	for(i=0;i<tbl2.length;i++)
		{
		s=tbl2[i];
		if (s=="") continue;
		if (!(s in out1))
			{
			out1[s]=new Object();
			out1[s].congnum=congnum;
			out1[s].userid=s;
			out1[s].authority="personalservice";
			}
		else{
			if (out1[s].authority.indexOf("personalservice",0)==-1)
				{
				if (out1[s].authority!="") out1[s].authority+=";";
				out1[s].authority+="personalservice";
				}
			}
		}
	for(s in out1)
		{
		out2.push(out1[s]);
		}
	InsertSQlite("CWUsers",out2);
	}
//-----------------------------------------------------------------------------
// LogSetUp()
//-----------------------------------------------------------------------------
function LogSetUp()
	{
	var i,j,k=0;
	var obj=new Array();
	var log;
	alert("LogSetup:Start");
	ExecSQlite("DELETE FROM Preaching_PublicLog;");
	for(i in Cards)
		{
		log=LoadLog(i);
		if (log.History.length==0) continue;
		for(j=0;j<log.History.length;j++)
			{
			obj[k]=new Object();
			obj[k].congnum=congnum;
			obj[k].num=i;
			obj[k].user=log.History[j].User;
			obj[k].start=log.History[j].Rent;
			obj[k].end=log.History[j].End;
			obj[k].endlmt=log.History[j].Limit;
			k++;
			}
		}
	InsertSQlite("Preaching_PublicLog",obj);
	alert("LogSetup:End");
	}
