//------------------------------------------------------------------------------------
//	�񍐏��쐬���j���[
//------------------------------------------------------------------------------------
var ReportBody=new Array();
var ReportHTML="";
var ReportPage=0;
var ReportMax=0;
var ReportRayout=new Array();
//------------------------------------------------------------------------------------
function MENU2()
	{
	HideLayer("BG");
	var today=new Date();
	var ty,tm,td,tymd;
	var s;
	var r=new Object();
	ClearKey();
	ClearLayer("Stage");
	Keys[11]="MainMenu()";

	WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
	WriteLayer("Stage","<span class=size3>���C�����j���[���񍐏��쐬</span><br>"+hr());
	
	s="<form onsubmit='MENU2Exec();return false;'>�񍐏����쐬������t�͈͂��w�肵�Ă��������F<br>";
	s+=Field(0,12,false,2)+"�`"+Field(1,12,false,2);
	s+="<input type=button value='�񍐏��̍쐬' onClick='MENU2Exec()'>";
	s+="<br>"+hr();
	WriteLayer("Stage",s);
	s="<input type=button value='��抄�蓖�Ă̋L�^�p��(S-13)���������' onClick='PrintS13()' style='width:300px'><br>";
	s+="<input type=button value='���C�����j���[�֖߂�' onClick='MainMenu()' style='width:300px'></form>";
	WriteLayer("Stage",s);

	ty=today.getFullYear();
	tm=today.getMonth()+1;
	td=today.getDate();
	tymd=parseInt(ty,10)*10000+parseInt(tm,10)*100+parseInt(td,10);
	r=ReportLogs();
	WriteLayer("Stage",r.HTML);
	document.forms[0].elements[0].value=r.Last;
	document.forms[0].elements[1].value=SplitDate(tymd+"");
	Focus(0);
	}
function PrintS13()
	{
	ClearKey();
	ClearLayer("Stage");
	var s="��抄�蓖�Ă̋L�^�p��(S-13)��������Ă��܂��c";
	WriteLayer("Stage",s);
	setTimeout("PrintS13_Exec()",10);
	}
//------------------------------------------------------------------------------------
//	�񍐏��̍쐬�����{��
//------------------------------------------------------------------------------------
function MENU2Exec()
	{
	var today=new Date();
	var d1=document.forms[0].elements[0].value;
	var d2=document.forms[0].elements[1].value;
	var c1,c2;
	var s;
	var tymd;
	tymd=today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();

	//	���͓��e�̃`�F�b�N
	c1=CheckDate("�J�n��",d1);
	if (c1==true) return;
	c2=CheckDate("�I����",d2);
	if (c2==true) return;
	if (c1>c2)
		{
		alert("�J�n�����I��������ɂȂ��Ă��܂��B");
		return;
		}
	var stream = fso.OpenTextFile(ReportLog(),8,true,-2);
	stream.WriteLine(tymd+"("+SplitDate(c1)+"�`"+SplitDate(c2)+")");
	stream.close();

	LoadAllCards();
	var y=0;
	var x=0;
	var yy=0;
	i=0;ReportRayout=new Array();
	for(y=0;y<Cards.length;y++)
		{
		if (!(y in Cards)) continue;
		ReportRayout[i]=y;
		i++;
		}

	for(y=0;y<ReportRayout.length;y+=5)
		{
		s="<div style='position:absolute;width:900px;z-index:5;top:8px;left:1600px;";
		s+="text-align:right;font-size:40px'>";
		s+=tymd+"�쐬("+SplitDate(c1)+"�`"+SplitDate(c2)+")</div>";
		s+="<div style='position:absolute;z-index:2;top:0px;left:0px;'>";
		for(x=0;x<=4;x++)
			{
			if (y+x>=ReportRayout.length) break;
			i=ReportRayout[y+x];
			ssx=Cards[i].name;
			if (ssx.length>8) ssx=ssx.substring(0,8);
			s+=WriteReportCell(x,0,3,i+":"+ssx);
			s+=GetReportDetail(i,c1,c2,x);
			}
		ReportBody[yy]=s;
		yy++;
		}
	ReportPage=0;ReportMax=yy-1;
	ClearKey();
	ClearLayer("Stage");
	Keys[11]="MENU2End()";
	s="";
	s+=AddKeys(1,"���ׂĈ������","PrintReport(-1)");
	s+=AddKeys(2,"���̃y�[�W���������","PrintReport(0)");
	s+=AddKeys(3,"�O�̃y�[�W","MENU2Prev()");
	s+=AddKeys(4,"���̃y�[�W","MENU2Next()");
	s+=AddKeys(0,"�߂�","MENU2End()");
	FloatingMenu.Title="�񍐏����j���[";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",20,20,3,240,190);
	window.scrollTo(0,0);
	RscrollX=0;RscrollY=0;
	window.onscroll=WriteMap_Scroll;
	MENU2Disp();
	}

function MENU2Disp()
	{
	var s,i,Bmap="";
	var vml=new Poly();
	var r=GetImageInfo(SysFolder()+"s13a.jpg");
	var Imgx=r.x;
	var Imgy=r.y;
	vml.width=r.x;
	vml.height=r.y;
	vml.mapsize=1;
	ClearLayer("Stage");
	s="<img src=\""+SysFolder()+"s13a.jpg\" onload='ImageMap.Adjust()'>";
	s+=ReportBody[ReportPage];
	ImageMap.Content=SetContent(s,vml,Imgx,Imgy,Bmap);
	ImageMap.Create("MAP",window["Stage"],document.documentElement.clientWidth,document.documentElement.clientHeight-40);
	}

function MENU2Prev()
	{
	if (ReportPage>0)
		{
		ReportPage--;
		MENU2Disp();
		}
	}

function MENU2Next()
	{
	if (ReportPage<ReportMax)
		{
		ReportPage++;
		MENU2Disp();
		}
	}

function MENU2End()
	{
	CloseFloatings();
	window.onscroll="";
	MainMenu();
	}
//------------------------------------------------------------------------------------
//	�T�u���[�`��
//------------------------------------------------------------------------------------
function ReportLogs()
	{
	var lines=new Array();
	var maxlogs=0;
	var logcnt=0;
	var s;
	var r=new Object();
	var first;
	var p1,p2;

	s="<div style='width:400px;height:120px;background-color:#ffaaff;overflow-y:scroll;border:ridge 2px black;padding:4px;'>";
	s+="<font color=blue><b>�񍐏��쐬�����F</b></font><br><span style='font-size:14px'>";

	first=true;
	var text=ReadFile(ReportLog());
	r.Last="";
	if (text!="")
		{
		lines = text.split(/\r\n/);
		maxlogs=lines.length;
		for(i=maxlogs-1;i>=0;i--)
			{
			if (lines[i]=="") continue;
			if (first)
				{
				p1=lines[i].indexOf("�`",0);
				p2=lines[i].indexOf(")",0);
				r.Last=AddDays(lines[i].substring(p1+1,p2),1);
				first=false;
				}
			s+=lines[i]+"<br>";
			}
		}
	else{
		text+="����������܂���B";
		}
	s+="</div>";
	r.HTML=s;
	return r;
	}

function GetReportDetail(num,date1,date2,x)
	{
	var logs=new Array();
	var lines=new Array();
	var logline=new Array();
	var maxlogs=0;
	var logcnt=0;
	var BFRDAT;
	var BFRUSR;
	var BFRSTR,BFREND;
	var s,sb;
	var obj,l;

	obj=LoadLog(num);
	l=obj.History.length;
	if (l==0) return "";
	for(i in obj.History)
		{
		if (obj.History[i].Status=="Using") continue;
		if ((obj.History[i].End<date1)||(obj.History[i].End>date2)) continue;
		logs[logcnt]=new Object();
		logs[logcnt].USR=obj.History[i].User;
		logs[logcnt].STR=obj.History[i].Rent;
		logs[logcnt].END=obj.History[i].End;
		logcnt++;
		}
	if (logcnt>25) logcnt=25;	//	�Q�T���ׂ܂ł����󎚂ł��Ȃ��B
	s="";
	for(i=0;i<logcnt;i++)
		{
		s+=WriteReportCell(x,i,0,logs[i].USR);
		s+=WriteReportCell(x,i,1,SplitDate4(logs[i].STR));
		s+=WriteReportCell(x,i,2,SplitDate4(logs[i].END));
		}
	return s;
	}
function SplitDate4(dat)
	{
	var s,y,m,d;
	dat=dat+"";
	if (dat=="0000") return "";
	y=dat.substring(2,4);
	m=dat.substring(4,6);
	d=dat.substring(6,8);
	s=y+"/"+m+"/"+d;
	return s;
	}

function ReportLog()
	{
	return DataFolder()+"reportlog.txt";
	}

function WriteReportCell(x,y,pos,str)
	{
	var vx,vy,s,fsize;
	s="<div style='position:absolute;z-index:3;vertical-align:bottom;white-space:nowrap;";
	switch(pos)
		{
		case 0:
			s+="width:446px;height:50px;text-align:center;";
			vx=212+(Math.floor(x*454.25));
			vy=356+(Math.floor(y*112.85));
			fsize=50;
			break;
		case 1:
			s+="width:222px;height:53px;text-align:center;";
			vx=212+(Math.floor(x*454.25));
			vy=416+(Math.floor(y*112.85));
			fsize=44;
			break;
		case 2:
			s+="width:222px;height:53px;text-align:center;";
			vx=437+(Math.floor(x*454.25));
			vy=416+(Math.floor(y*112.85));
			fsize=44;
			break;
		case 3:
			s+="width:300px;height:60px;";
			vx=330+(x*455);
			vy=290;
			fsize=36;
			break;
		default:
			break;
		}
	s+="left:"+vx+"px;top:"+vy+"px;";
	s+="font-size:"+fsize+"px;";
	s+="'>"+str+"</div>";
	return s;
	}
