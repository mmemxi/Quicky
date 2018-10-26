var Markers;
var TempMarker=new Object();
var MarkerSize=40;
var MarkerCursorX=0;
var MarkerCursorY=0;
var MarkerType=0;
var MarkerTable=new Array("��","��","�~","��","�H","�I","��","��");
var MarkerEditor;
//---------------------------------------------------------
function LoadMarker(num)
	{
	var obj,i,j,c;
	var result;
	obj=ReadXMLFile(MarkerFile(num),true);
	if (obj=="")
		{
		obj=new Object();
		obj.Map=new Array();
		}
	if (!("Map" in obj))
		{
		obj.Map=new Array();
		}
	result=new Object();
	result.Map=new Array();
	c=0;
	for(i in obj.Map)
		{
		if ("Id" in obj.Map[i])
			{
			j=parseInt(obj.Map[i].Id,10);
			result.Map[j]=clone(obj.Map[i]);
			if (!("Points" in result.Map[j])) result.Map[j].Points=new Array();
			c+=result.Map[j].Points.length;
			}
		}
	result.Count=c;
	return result;
	}

function SaveMarker(num,mobj)
	{
	var obj,i,j;
	obj=new Object();
	obj.Map=new Array();
	obj.Count=0;
	j=0;
	for(i in mobj.Map)
		{
		mobj.Map[i].Id=i;
		obj.Map[j]=clone(mobj.Map[i]);
		obj.Count+=mobj.Map[i].Points.length;
		j++;
		}
	WriteXMLFile(obj,MarkerFile(num));
	}
//-------------------------------------------------------------------------------
// �}�[�J�[�\��(0:��O�p�n�}�\�� 1:��O�p�n�}��� 2:�l�p�n�}�\�� 3:�l�p�n�}���)
//-------------------------------------------------------------------------------
function DrawMarker(mobj,seq,zoomx,zoomy,printmode)
	{
	var s="";
	var i,j,vx,vy,vsize,vchar,vcolor,vh;
	var o;
	if (mobj.Count==0) return s;
	if (!(seq in mobj.Map)) return s;
	vcolor="ff0000";

	for(i=0;i<mobj.Map[seq].Points.length;i++)
		{
		o=mobj.Map[seq].Points[i];
		if (o.x=="building") continue;
		o.x=parseInt(o.x,10);
		o.y=parseInt(o.y,10);
		o.size=parseInt(o.size,10);
		vh=parseInt(o.History,10);
		vsize=Math.floor(o.size*zoomx);
		vx=Math.floor((o.x+o.size/2)*zoomx-vsize/2);
		vy=Math.floor((o.y+o.size/2)*zoomy-vsize/2);
		vchar="";
		switch (printmode)
			{
			case 0:	//	��O�p�n�}�\��
				if (vh==0) 	vchar="��";
				if (vh==1) 	vchar="��";
//				if ((vh>=2)&&(vh<=3)) vchar="��";
				if (vh==2) vchar="��";
				break;
			case 1:	//	��O�p�n�}���
//				if ((vh>=2)&&(vh<=3)) vchar="��";
				if (vh==2) vchar="��";
				break;
			case 2:	//	�l�n�}�\��
				if (vh==2) vchar="��";
				break;
			case 3:	//	�l�n�}���
				if (vh==2) vchar="��";
				break;
			default:
				break;
			}
		if (vchar=="") continue;
		s+="<div style='position:absolute;z-index:8;left:"+vx+"px;top:"+vy+"px;color:#"+vcolor+";font-size:"+vsize+"px;'>";
		s+=vchar+"</div>";
		}
	return s;
	}
//---------------------------------------------------------
// �}�[�J�[�����r���ɔ��f   mode=0:��O�p  mode=1:�l�p
//---------------------------------------------------------
function SetMarkersToBuilding(Bobj,mobj,mode)
	{
	var ABobj=GetBobj(Bobj);
	var i,j,k,o,mh,mtbl
	var isequence,istair,ifloor,iroom,iobj;
	for(i in mobj.Map)
		{
		for(j in mobj.Map[i].Points)
			{
			o=mobj.Map[i].Points[j];
			if (o.x!="building") continue;
			mh=parseInt(o.History,10);
			if ((mode==0)&&(mh>2)) continue;	//	��O�p�i�\���j
			if ((mode==1)&&(mh!=2)) continue;	//	�l�p�i�\���j
			mtbl=o.y.split(",");
			for(k=0;k<=ABobj.building.length;k++)
				{
				try{
				if (ABobj.building[k].id==mtbl[0])
					{
					isequence=parseInt(mtbl[1],10);
					istair=parseInt(mtbl[2],10);
					ifloor=parseInt(mtbl[3],10);
					iroom=parseInt(mtbl[4],10);
					iobj=ABobj.building[k].sequence[isequence].stair[istair].floor[ifloor].room[iroom];
					iobj.Mark=new Object();
					if (mh==0) 	iobj.Mark.type="NewO";
					if (mh==1) 	iobj.Mark.type="oldOO";
					if (mh==2)	iobj.Mark.type="star";
					break;
					}
				}catch(e){alert("�}�[�J�[��񂪈ُ�ł��B\n������:"+mtbl[0]+"\n���ԍ�:"+isequence+"\n�K�i�ԍ�:"+istair+"\n�K:"+ifloor+"�����ԍ�:"+iroom);}
				}
			}
		}
	}
//---------------------------------------------------------
function DrawEditMarker()
	{
	var s="";
	var i,vx,vy,vsize,vchar;
	for(i=0;i<TempMarker.Points.length;i++)
		{
		vx=TempMarker.Points[i].x;
		vy=TempMarker.Points[i].y;
		vsize=TempMarker.Points[i].size;
		vh=parseInt(TempMarker.Points[i].History,10);
		//	vh�̒l�@0:�t�����΂��� 1:�P��ڌo�߁@2:���� 3:�p�� 4:�Ȃ�
		if (vh>2) continue;
		vchar="";
		switch(vh)
			{
			case 0:	vchar="��";
					break;
			case 1:	vchar="��";
					break;
			case 2:	vchar="��";
					break;
			default:
					break;
			}
		s+="<div style='position:absolute;z-index:8;left:"+vx+"px;top:"+vy+"px;color:#ff0000;font-size:"+vsize+"px;cursor:pointer;' ";
		s+="onclick='EditMarker_MarkOff("+i+")'>"+vchar+"</div>";
		}
	ClearLayer("Drag");
	WriteLayer("Drag",s);
	ShowLayer("Drag");
	}
//---------------------------------------------------------
function EditMarker(num,seq,Editor)
	{
	var c;
	if (Cards[num].status.indexOf("�g�p��",0)!=-1)
		{
		c=confirm("�ʏ�́A�}�[�J�[�ҏW�͋�悪���g�p���ɍs���܂��B\n���ҏW���Ă���낵���ł����H");
		if (!c) return;
		}
	if (Editor!="MasterClient") CloseFloatings();
	MarkerEditor=Editor;
	MarkerType=0;
	Markers=LoadMarker(num);
	var i,j,k,s,found,file,r,tbl,cl;
	var BG="";
	var rx=new Array();
	RDTitle=document.title;
	RDragObj=num;
	r=GetImageInfo(PNGFile(num,seq));
	ClearKey();
	ClearLayer("Stage");	//�@�n�}���C���[
	ClearLayer("Terop");
	ClearLayer("Mask");		//	���L���C���[
	ClearLayer("Drag");		//	�}�E�X���샌�C���[

	if (seq in Markers.Map)
		{
		TempMarker=clone(Markers.Map[seq]);
		}
	else{
		TempMarker.Points=new Array();
		}
	document.title="�}�[�N�̕ҏW";
	Keys[11]="";
	
	//	1.�n�}���C���[
	s="<img src='"+PNGFile(num,seq)+"' style='position:absolute;z-index:0;top:0px;left:0px;'>";
	WriteLayer("Stage",s);

	//	2.�}�E�X�J�[�\�����C���[

	//	3.�����蔻�背�C���[
	s="<img src='"+BlankGIF()+"' width="+r.x+" height="+r.y+" style='position:absolute;z-index:6;top:0px;left:0px;' ";
	s+="onclick='EditMarker_MarkOn("+seq+")' onmousewheel='EditMarker_Wheel();return false;' onmousemove='EditMarker_Mousemove()' ";
	s+="onmouseout='EditMarker_MarkOut()'>";
	ShowLayer("Mask");
	WriteLayer("Mask",s);

	//	4.�ݒu�ς݃}�[�J�[
	DrawEditMarker();
	window.scrollTo(0,0);

	s="���N���b�N�F�P��ڗ����}�[�N�L���^����<br>";
	s+="Shift+���N���b�N�F�Q��ڗ����}�[�N�L��<br>";
	s+="�z�C�[���F�g��^�k��<br>";
	s+=AddKeys(1,"�m��","EndofEditMarker("+num+","+seq+",true)");
	s+=AddKeys(2,"��������","SendAll()");
	s+=AddKeys(0,"�߂�","EndofEditMarker("+num+","+seq+",false)");
	FloatingMenu.Title="�}�[�J�[�ҏW";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",50,50,10,250,140);
	RscrollX=50;RscrollY=50;
	window.onscroll=WriteMap_Scroll;
	document.body.focus();
//	document.body.onmousewheel=EditMarker_Wheel;
	}

function SendAll()
	{
	var i,vh;
	var c=confirm("�S�Ẵ}�[�J�[���P�i�K�i�߂Ă������ł����H");
	if (!c) return;
	for(i=0;i<TempMarker.Points.length;i++)
		{
		vh=parseInt(TempMarker.Points[i].History,10);
		TempMarker.Points[i].History=vh+1;
		}
	DrawEditMarker();
	}

function SetMarker(num)
	{
	MarkerType=num;
	DrawEditCursor();
	}

function ChangeMarker()
	{
	MarkerType++;
	if (MarkerType>=MarkerTable.length) MarkerType=0;
	DrawEditCursor();
	}

function EditMarker_MarkOut()
	{
	ClearLayer("Terop");
	}

function EditMarker_Mousemove()
	{
	var mx,my;
	mx=event.offsetX;
	my=event.offsetY;
	MarkerCursorX=mx-Math.floor(MarkerSize/2);
	MarkerCursorY=my-Math.floor(MarkerSize/2);
	DrawEditCursor();
	}

function DrawEditCursor()
	{
	var s;
	var c="��";
	if (ShiftKey) c="��";
	s="<div style='position:absolute;left:"+MarkerCursorX+"px;top:"+MarkerCursorY+"px;z-index:5;color:#77aa77;font-size:"+MarkerSize+"px;'>";
	s+=c+"</div>";
	ClearLayer("Terop");
	WriteLayer("Terop",s);
	}

function EditMarker_MarkOn(seq)
	{
	var mx,my,i;
	var o,c;
	mx=event.offsetX;
	my=event.offsetY;
	i=TempMarker.Points.length;
	TempMarker.Points[i]=new Object();
	o=TempMarker.Points[i];
	o.x=mx-Math.floor(MarkerSize/2);
	o.y=my-Math.floor(MarkerSize/2);
	o.size=MarkerSize;
	o.char="��";
	if (ShiftKey) o.History=1;else o.History=0;
	DrawEditMarker();
	}

function EditMarker_MarkOff(num)
	{
	TempMarker.Points.splice(num,1);
	DrawEditMarker();
	}

function EditMarker_Wheel()
	{
	var a;
	var mx,my;
	mx=event.offsetX;
	my=event.offsetY;
	a=event.wheelDelta;
	if (a==120)
		{
		MarkerSize+=4;
		}
	if (a==-120)
		{
		MarkerSize-=4;
		if (MarkerSize<8) MarkerSize=8;
		}
	MarkerCursorX=mx-Math.floor(MarkerSize/2);
	MarkerCursorY=my-Math.floor(MarkerSize/2);
	DrawEditCursor();
	}

//-------------------------------------------------------------------------------
function EndofEditMarker(num,seq,mode)
	{
	var i,j,v;
	var copy=new Array();
	if (!mode)
		{
		v=confirm("�ҏW���ʂ�ۑ������ɏI�����܂����H");
		if (!v) return;
		}
	document.title=RDTitle;
	window.onscroll="";
	FloatingMenu.Close();
	ClearLayer("Terop");
	ClearLayer("Mask");
	ClearLayer("Drag");
	if (mode)
		{
		if (!(seq in Markers.Map))
			{
			Markers.Map[seq]=new Object();
			Markers.Map[seq].User="";
			Markers.Map[seq].Edited="False";
			Markers.Map[seq].Editor="";
			Markers.Map[seq].Points=new Array();
			}
		if (Cards[num].status.indexOf("�g�p��",0)==-1)	Markers.Map[seq].Edited="True";
												else	Markers.Map[seq].Edited="False";
		Markers.Map[seq].Editor=MarkerEditor;
		Markers.Map[seq].Points=clone(TempMarker.Points);
		if (Markers.Map[seq].Points.length==0)
			{
			delete Markers.Map[seq];
			}
		SaveMarker(num,Markers);
		}
	if (MarkerEditor=="MasterClient")
		{
		MENU6B();
		}
	else{
		MENU1PBig(num,seq);
		}
	}
//---------------------------------------------------------
function IncMarkerHistory()
	{
	var i,j,v;
	for(i in Markers.Map)
		{
		for(j=0;j<Markers.Map[i].Points.length;j++)
			{
			v=parseInt(Markers.Map[i].Points[j].History,10);
			if ((v==1)&&(Markers.Map[i].Edited!="True")) continue;	//	�q�X�g���[1����2�ւ͕ҏW�����ł͐i�܂Ȃ�
			v++;
			Markers.Map[i].Points[j].History=v;
			}
		Markers.Map[i].Edited="False";
		Markers.Map[i].Editor="";
		Markers.Map[i].User="";
		}
	}
function DecMarkerHistory()
	{
	var i,j,k,v;
	var copy=new Object();
	copy.Points=new Array();
	k=0;
	for(i in Markers.Map)
		{
		for(j in Markers.Map[i].Points)
			{
			v=parseInt(Markers.Map[i].Points[j].History,10);
			if ((v==1)&&(Markers.Map[i].Edited!="True")) continue;	//	�q�X�g���[1����2�ւ͕ҏW�����ł͐i�܂Ȃ�
			v--;
			if (v<0) {delete Markers.Map[i].Points[j];continue;}
			Markers.Map[i].Points[j].History=v;
			}
		}
	}
//---------------------------------------------------------
function PushMarkerHistory(num)
	{
	var f,ln,s,i,fc;
	f=ReadFile(MarkerFile(num));
	if (f=="") return;
	ln=f.split("\r\n");
	s="<split>\r\n";
	for(i=0;i<ln.length;i++)
		{
		if (ln[i].indexOf("<Map",0)!=0) continue;
		s+=ln[i]+"\r\n";
		}
	fc=fso.OpenTextFile(NumFolder(num)+"markerhistory.xml",8,true);
	fc.write(s);
	fc.close();
	}
//---------------------------------------------------------
function PopMarkerHistory(num)
	{
	var f,f1,f2,ln,s,p1,p2,i,j,fc;
	var bodyo,bodyn,tbl;
	var TBL1=new Array();
	var TBL2=new Array();
	//	�}�[�J�[����Ǎ�
	f1=ReadFile(NumFolder(num)+"markerhistory.xml");
	if (f1=="") return "no markerhistory";
	p=f1.lastIndexOf("<split>");
	if (p==-1) return "no split";
	p2=f1.indexOf("<Map",p);
	if (p2==-1) return "no maptag";
	//	���s�}�[�J�[�t�@�C���Ǎ�
	f2=ReadFile(MarkerFile(num));
	if (f2=="") return "no marker";
	//	�}�[�J�[��������ŐV��������ďo��
	bodyo=f1.substring(0,p);
	bodyn=f1.substring(p2,f1.length);
	fc=fso.CreateTextFile(NumFolder(num)+"markerhistory.xml",true);
	fc.Write(bodyo);
	fc.close();
	//	�}�[�J�[������n�}ID�ʂɕۑ�
	tbl=bodyn.split("\r\n");
	for(i=0;i<tbl.length;i++)
		{
		p1=tbl[i].indexOf("Id=",0);
		if (p1==-1) continue;
		p2=tbl[i].indexOf("\"",p1+4);
		if (p2==-1) continue;
		s=tbl[i].substring(p1+4,p2);
		TBL1[s]=tbl[i];
		}
	//	�}�[�J�[�t�@�C����n�}ID�ʂɒu�����Ă���
	tbl=f2.split("\r\n");
	for(i=0;i<tbl.length;i++)
		{
		p=tbl[i].indexOf("<Map",0);
		if (p!=0) continue;
		p1=tbl[i].indexOf("Id=",p);
		if (p1==-1) continue;
		p2=tbl[i].indexOf("\"",p1+4);
		if (p2==-1) continue;
		s=tbl[i].substring(p1+4,p2);
		tbl[i]=TBL1[s];
		}
	//	�}�[�J�[�ŐV�Ńt�@�C�����o��
	s=tbl.join("\r\n");
	fc=fso.CreateTextFile(MarkerFile(num),true);
	fc.Write(s);
	fc.close();
	return "Done";
	}
