//-----------------------------------------------------------------------------
function SQliteSetup()
	{
	RefreshPublicList_All();
//	CreateUsers();
//	CreateConfig();
//	LogSetUp();
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
//	RefreshPublicList_All()   ��O�̋��ꗗ�̎g�p�󋵂��ꊇ�쐬����
//-----------------------------------------------------------------------------
function RefreshPublicList_All()
	{
	var i,j,k;
	var obj1=new Array();		//	���ʃ��X�g
	var obj2=new Array();		//	�n�}�ʃ��X�g
	var obj3=new Array();		//	���׃��X�g
	var obj4=new Array();		//	�W���Z��X�g
	var obj5=new Array();		//	�r���ꗗ
	var buf,ptr,vb,vt,vtb;

	//	�ڍs�O�f�[�^�̃N���A
	ExecSQlite("DELETE FROM Preaching_PublicList;");
	ExecSQlite("DELETE FROM Preaching_PublicDetail;");
	ExecSQlite("DELETE FROM Preaching_Notices;");
	ExecSQlite("DELETE FROM Preaching_Condominiums;");	//	�W���Z��
	ExecSQlite("DELETE FROM Preaching_Buildings;");		//	�r�����

	//	���ʏ��̏o��
	for(i in Cards)
		{
		ptr=Cards[i];
		buf=new Object();
		buf.congnum=congnum;
		buf.num=i;
		buf.name=ptr.name;
		buf.kubun=ptr.kubun;
		buf.lastuse=ptr.lastuse;
		buf.nowusing=ptr.nowusing;
		buf.lastuser=ptr.lastuser;
		buf.count=ptr.count;
		buf.MapType=ptr.MapType;
		if ("spanDays" in ptr) buf.spanDays=ptr.spanDays;else buf.spanDays="";
		buf.HeaderType=ptr.HeaderType;
		buf.AllMapPosition=ptr.AllMapPosition;
		buf.AllMapTitle=ptr.AllMapTitle;
		buf.Buildings=ptr.Buildings.Count;
		buf.BuildingsTotal=ptr.Buildings.House;
		obj1.push(buf);
		
		//	�W���Z��̃J�[�h�̂�Condominiums�f�[�^�̏o��
		if ("Condominium" in Cards[i])
			{
			for(j=0;j<Cards[i].Condominium.length;j++)
				{
				ptr=Cards[i].Condominium[j];
				buf=new Object();
				buf.congnum=congnum;
				buf.num=i;
				buf.seq=ptr.Seq;
				buf.id=ptr.Name;
				buf.left=ptr.x;
				buf.top=ptr.y;
				obj4.push(buf);
				}
			}

		//	�n�}�ʏ��̏o��
		for(j=1;j<=Cards[i].count;j++)
			{
			buf=new Object();
			buf.congnum=congnum;
			buf.num=i;
			buf.seq=j;
			if (j in Cards[i].Clip)
				{
				buf.M_Area=Cards[i].Clip[j].Area;
				buf.M_Zoom=Cards[i].Clip[j].Zoom;
				buf.M_Top=Cards[i].Clip[j].Top;
				buf.M_Left=Cards[i].Clip[j].Left;
				}
			else{
				buf.M_Area="";
				buf.M_Zoom=100;
				buf.M_Top=0;
				buf.M_Left=0;
				}
			obj2.push(buf);
			}

		//	���L���̏o��
		for(j=0;j<Cards[i].RTB.length;j++)
			{
			ptr=Cards[i].RTB[j];
			buf=new Object();
			buf.congnum=congnum;
			buf.num=i;
			buf.seq=ptr.Num;
			buf.KBN1=ptr.KBN1;
			buf.KBN2=ptr.KBN2;
			buf.Name=ptr.Name;
			buf.Person=ptr.Person;
			buf.Reason=ptr.Reason;
			buf.Date=ptr.Date;
			buf.Servant=ptr.Servant;
			buf.Confirm=ptr.Confirm;
			buf.Position=ptr.Position;
			buf.Writing=ptr.Writing;
			if ("LastConfirm" in ptr)	buf.LastConfirm=ptr.LastConfirm;
								else	buf.LastConfirm=0;
			if ("Frequency" in ptr)		buf.Frequency=ptr.Frequency;
								else	buf.Frequency=0;
			if ("Cycle" in ptr)			buf.Cycle=ptr.Cycle;
								else	buf.Cycle=0;
			obj3.push(buf);
			}
		//	�R�����g�͓��L���ɏo�͂���i�������S�n�}�Ɂj
		for(j=0;j<Cards[i].Comments.length;j++)
			{
			ptr=Cards[i].Comments[j];
			buf=new Object();
			buf.congnum=congnum;
			buf.num=i;
			buf.KBN1="�������";
			buf.KBN2="";
			buf.Name="";
			buf.Person="";
			buf.Reason="";
			buf.Date=0;
			buf.Servant="";
			buf.Confirm="";
			buf.Position="";
			buf.Writing=ptr.Text+","+ptr.Size+","+ptr.Left+","+ptr.Top;
			buf.LastConfirm=0;
			buf.Frequency="";
			buf.Cycle="";
			for(k=1;k<=Cards[i].count;k++)
				{
				buf.seq=k;
				obj3.push(buf);
				}
			}
		//	�r���\���t�@�C��������΂�����o��
		if (fso.FileExists(numFolder(i)+"building.xml"))
			{
			vb=ReadXMLFile(numFolder(i)+"building.xml",true);
			vt=ReadFile(numFolder(i)+"building.xml");
			vt=vt.replace(/\r/g,"");
			vt=vt.replace(/\n/g,"");
			p1=0;
			for(j=0;j<vb.building.length;j++)
				{
				ptr=vb.building[j];
				p1=vt.indexOf("<sequence",p1);
				p2=vt.indexOf("</sequence>",p1)+11;
				buf=new Object();
				buf.congnum=congnum;
				buf.type=0;		//	�ʏ�A�p�[�g
				buf.num=i;
				buf.seq=ptr.map;
				buf.id=ptr.id;
				buf.left=ptr.left;
				buf.top=ptr.top;
				buf.sequences=ptr.sequences;
				buf.columns=ptr.columns;
				s=vt.substring(p1,p2);
				buf.XML=escape(s);
				obj5.push(buf);
				}
			}
		}
	if (obj1.length>0) InsertSQlite("Preaching_PublicList",obj1);		//	���P�ʂ̏��
	if (obj2.length>0) InsertSQlite("Preaching_PublicDetail",obj2);		//	�n�}�P�ʂ̏��
	if (obj3.length>0) InsertSQlite("Preaching_Notices",obj3);			//	���L���
	if (obj4.length>0) InsertSQlite("Preaching_Condominiums",obj4);		//	�W���Z��
	if (obj5.length>0) InsertSQlite("Preaching_Buildings",obj5);		//	�r�����
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
