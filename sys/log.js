//------------------------------------------------------------------
function LoadLog(num)
	{
	var f=LogXML(num);
	var obj=ReadXMLFile(f,false);
	if (obj=="")
		{
		obj=NewLog();
		return obj;
		}
	if (!("History" in obj))
		{
		obj.History=new Array();
		}
	return obj;
	}

function SaveLog(obj,num)
	{
	WriteXMLFile(obj,LogXML(num));
	var sql="update PublicList set ";
	if (obj.Status=="Free")	sql+=" inuse='false',";
					else	sql+=" inuse='true',";
	sql+="userid='"+obj.Latest.User+"',";
	sql+="startday="+obj.Latest.Rent+",";
	sql+="endday="+obj.Latest.End+",";
	sql+="limitday="+obj.Latest.Limit;
	sql+=" where congnum="+congnum+" and num="+num+";";
	SQ_Exec(sql);
	}

//------------------------------------------------------------------
function NewLog()
	{
	var obj=new Object();
	obj.Status="Free";
	obj.Latest=new Object();
	obj.Latest.User="";
	obj.Latest.Rent=0;
	obj.Latest.Limit=0;
	obj.Latest.End=0;
	obj.History=new Array();
	return obj;
	}
//------------------------------------------------------------------
function AddLog(obj,num,user,rent,limit)
	{
	var i,l,t;
	l=obj.History.length;
	obj.History[l]=new Object();
	t=obj.History[l];
	t.Status="Using";
	t.User=user;
	t.Rent=rent;
	t.Limit=limit;
	t.End=0;
	t.Map=new Array();
	t.Compress=0;
	for(i=1;i<=Cards[num].count;i++)
		{
		t.Map[i]=new Object();
		t.Map[i].Sequence=i;
		t.Map[i].Start=0;
		t.Map[i].End=0;
		}
	SetLogSummary(obj);
	}

//------------------------------------------------------------------
function FinishLog(obj,num,mode)	//mode=true�Ȃ���͒l�ɁAfalse�Ȃ��������
	{
	var i,j,last;
	if (obj.Status!="Using") return;
	l=obj.History.length-1;
	t=obj.History[l];
	last=0;
	for(i in t.Map)
		{
		j=parseInt(t.Map[i].End,10);
		if (j!=0)
			{
			if (j>last) last=j;
			}
		}
	if (!mode)
		{
		if (t.Limit>last) last=t.Limit;
		}
	for(i in t.Map)
		{
		if (t.Map[i].Start==0)	t.Map[i].Start=t.Rent;
		if (t.Map[i].End==0)	t.Map[i].End=last;
		}
	obj.Status="Free";
	t.Status="Finish";
	t.End=last;
	SetLogSummary(obj);
	}
//------------------------------------------------------------------
function RollBackLog(obj,num)
	{
	var i,j,l;
	l=obj.History.length-1;
	if (obj.Status=="Using")	//	���ݎg�p���Ȃ�A���O�����������łn�j
		{
		obj.History.splice(l,1);
		}
	else{						//	���ݖ��g�p�Ȃ�A�O�񃍃O�̏I����������
		obj.History[l].Status="Using";
		obj.History[l].End=0;
		for(i in obj.History[l].Map)
			{
			obj.History[l].Map[i].Start=0;
			obj.History[l].Map[i].End=0;
			}
	/*	2017/12/11�o�O�C���F�}�[�J�[��i�߂�͎̂g�p�J�n���Ȃ̂ŁA�I�����g�p���ɖ߂��Ƃ��̓}�[�J�[��߂��Ȃ��Ă悢
		//	�}�[�J�[�̖߂�����
		Markers=LoadMarker(num);
		if (Markers.Count>0)
			{
			DecMarkerHistory();
			SaveMarker(num,Markers);
			}
	*/
		}
	SetLogSummary(obj);
	}
//------------------------------------------------------------------
function SetLogSummary(obj)
	{
	var i,j,l,c1,c2,last;
	l=obj.History.length;
	if (l==0)
		{
		obj.Status="Free";
		obj.Latest.User="";
		obj.Latest.Rent=0;
		obj.Latest.Limit=0;
		obj.Latest.End=0;
		}
	else{
		l--;
		c1=0;c2=0;	//	c1=������ c2=����
		last=0;
		for(j in obj.History[l].Map)
			{
			if (obj.History[l].Map[j].End!=0)
				{
				c2++;
				if (obj.History[l].Map[j].End>last) last=obj.History[l].Map[j].End;
				}
			else c1++;
			}
		if ((c1==0)&&(c2!=0))
			{
			obj.History[l].Status="Finish";
			obj.History[l].End=last;
			}
		else{
			obj.History[l].Status="Using";
			obj.History[l].End=0;
			}
		if (obj.History[l].Status=="Using")
			{
			obj.Status="Using";
			obj.Latest.User=obj.History[l].User;
			obj.Latest.Rent=obj.History[l].Rent;
			obj.Latest.Limit=obj.History[l].Limit;
			if (l>0) obj.Latest.End=obj.History[l-1].End;
				else obj.Latest.End=0;
			}
		else{
			obj.Status="Free";
			obj.Latest.User=obj.History[l].User;
			obj.Latest.Rent=obj.History[l].Rent;
			obj.Latest.Limit=obj.History[l].Limit;
			obj.Latest.End=obj.History[l].End;
			}
		}
	}

