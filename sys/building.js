/*
�r���z�u�f�[�^�ibuilding.xml�j�̃t�H�[�}�b�g�F
<building id="������" top="y���W" left="x���W" map="�n�}�ԍ�">�`</building>	�c�������
<sequence id="����">�`</sequence>	�c�����
<stairs id="�K�i��">�`</stairs>		�c���̊K�i�Ɋ܂܂��K���͈̔�
<floor id="�K��">�`</floor>			�c�K�Ɋ܂܂�镔���͈̔�
<room>������</room>

2018/5/19 �ҏW�J�n���A���O�ύX�o�b�t�@���쐬�A�ҏW�����i�ۑ��j���Ƀ}�[�J�[����ҏW����
          �������폜�����ꍇ�̓}�[�J�[���폜����

*/
var Building=new Object();
var BuildingNum="";
var BuildingSeq="";
var BSeq=new Array("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20","�P,�Q,�R,�S,�T,�U,�V,�W,�X,�P�O,�P�P,�P�Q,�P�R,�P�S,�P�T,�P�U,�P�V,�P�W,�P�X,�Q�O","A,B,C,D,E,F,G,H,I","�`,�a,�b,�c,�d,�e,�f,�g,�h","�k,��","��,��","��,��","��,�k","a,b,c,d,e,f,g,h,i","��,��,��,��,��,��,��,��,��","�@,�A,�B,�C,�D,�E,�F,�G,�H,�I,�J,�K,�L,�M,�N,�O,�P,�Q,�R,�S","��,��,�O,�l,��,�Z,��,��,��,�\","�T,�U,�V,�W,�X,�Y,�Z,�[,�\");
var ReturntoBuildingFrom="";
var fsizelist=new Array(24,32,40,48,56);
var alignlistk=new Array("������","����","�E��");
var alignlist=new Array("center","left","right");
var BuildingNamesChanged=new Array();

function ReadBuilding(num)
	{
	var i,j,jc;
	Building=ReadXMLFile(BuildingFile(num),true);
	BuildingNum=num;
	if (Building=="")	Building=new Object();
	if (!("building" in Building))	Building.building=new Array();
	//	�W���Z����̓ǂݍ���(moved���������Ă���̂ŋ�ʂł���)
	for(i=0;i<Cards[num].Condominium.length;i++)
		{
		j=Cards[num].Condominium[i];
		jc=ReadXMLFile(ApartXML(j.Name,true));
		jc.building[0].left=parseInt(j.x,10);
		jc.building[0].top=parseInt(j.y,10);
		jc.building[0].moved=true;
		jc.building[0].map=parseInt(j.Seq,10);	//	�z�u��̒n�}�ԍ�
		jc.building[0].Condominium=true;
		jc.building[0].SourceNum=jc.Num;
		jc.building[0].SourceSeq=jc.Seq;
		Building.building.push(jc.building[0]);
		}
	}

function WriteBuilding()
	{
	var num=BuildingNum;
	var i,j;
	var temp=new Object();
	temp.building=new Array();
	j=-1;
	for(i=0;i<Building.building.length;i++)
		{
		if ("moved" in Building.building[i]) continue;
		j++;
		temp.building[j]=clone(Building.building[i]);
		EraseTempProperty(temp.building[j]);
		}
	WriteXMLFile(temp,BuildingFile(num));
	}

function AddBuilding(num,seq)
	{
	var i,j,obj,tmp,err;
	var b=prompt("�ǉ�����A�p�[�g�E�}���V�����̖��̂���͂��Ă��������B","");
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if (b==null) return;
	BuildingNum=num;
	BuildingSeq=seq;
	i=0;err=false;
	if (Building!="")
		{
		for(j in Building.building)
			{
			if (Building.building[j].id==b) err=true;
			i++;
			}
		if (err)
			{
			alert("���͂��ꂽ���O�́A���������ɂ��鑼�̕����Əd�����܂��B");
			return;
			}
		}
	else{
		Building=new Object();
		Building.building=new Array();
		Building.building[0]=new Object();
		i=0;
		}
	CloseFloatings();
	tmp=ReadXMLFile(BuildingDefault(),true);
	Building.building[i]=clone(tmp.building[0]);
	obj=Building.building[i];
	obj.id=b;
	obj.map=seq;
	BuildingNamesChanged=new Array();
	EditBuilding(i);
	}

function EditBuilding(seqid)
	{
	var i,j,s,obj;
	var fsize;
	var BNum,BSeq;
	ClearKey();
	ClearLayer("Stage");
	ReturntoBuildingFrom="EditBuilding";
	obj=Building.building[seqid];
	BNum=obj.SourceNum;
	BSeq=obj.SourceSeq;
	s="<div class=size5 align=center>�u"+obj.id+"�v�̕������</div>";
	if ("SourceNum" in obj)
		{
		s+="<div class=size4 style='color:#0000ff;cursor:pointer;text-decoration:underline;' onclick='PopupBuildingPlace("+BNum+","+BSeq+",\""+obj.id+"\")'>";
		s+="�n�}"+BNum+"-"+BSeq+"�̎Q��</div>";
		}
	s+="<form onsubmit='return false;'><table border=0 cellpadding=0 cellspacing=4>";
	s+="<tr><td>�����i�����̐��j</td><td><select size=1 onChange='ChangeSequence(0,"+seqid+")'>";
	j=parseInt(Building.building[seqid].sequences,10);
	for(i=1;i<=9;i++)
		{
		s+="<option";
		if (i==j) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select></td>";
	s+="<td>���̉����ѐ�</td><td><select size=1 onChange='ChangeParallel(0,"+seqid+")'>";
	j=parseInt(Building.building[seqid].columns,10);
	for(i=1;i<=4;i++)
		{
		s+="<option";
		if (i==j) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select></td></tr>";
	s+="<tr><td>�����̃T�C�Y</td><td><select size=1 onChange='ChangeFontSize(0,"+seqid+")'>";
	for(i=0;i<=4;i++)
		{
		s+="<option";
		if ("Fontsize" in obj)
			{
			if (parseInt(obj.Fontsize,10)==fsizelist[i])
				{
				s+=" selected";
				}
			}
		else{
			if (fsizelist[i]==40) s+=" selected";
			}
		s+=">"+fsizelist[i]+"</option>";
		}
	s+="</select></td>";
	s+="<td>�������̉��ʒu</td><td><select size=1 onChange='ChangeAlign(0,"+seqid+")'>";
	for(i=0;i<=2;i++)
		{
		s+="<option";
		if ("Align" in obj)
			{
			if (obj.Align==alignlist[i]) s+=" selected";
			}
		else{
			if (alignlist[i]=="center") s+=" selected";
			}
		s+=">"+alignlistk[i]+"</option>";
		}
	s+="</select></td></tr>";
	s+="<tr><td>���L���̕\�L</td><td><select size=1 onChange='ChangeRefuseDisplay(0,"+seqid+")'>";
	if ("Comment" in obj)
		{
		if (obj.Comment=="yes")
			{
			s+="<option selected>���o���ɕ\������</option>";
			s+="<option>���o���ɕ\�����Ȃ�</option>";
			}
		else{
			s+="<option>���o���ɕ\������</option>";
			s+="<option selected>���o���ɕ\�����Ȃ�</option>";
			}
		}
	else{
		s+="<option selected>���o���ɕ\������</option>";
		s+="<option>���o���ɕ\�����Ȃ�</option>";
		}
	s+="</select></td></tr>";
	s+="</table>"+hr();
	s+="<input type=button value='�n�}��̈ʒu�i";
	if ("top" in obj)	s+="�ݒ��";
		else			s+="���ݒ�";
	s+="�j' onClick='PlaceBuilding(0,"+seqid+")'><br>";

	s+="<input type=button value='�X�@�V' onClick='EditBuilding_Exec("+seqid+")'>";
	s+="<input type=button value='��@��' onClick='DeleteBuilding("+seqid+")'>";
	s+="<input type=button value='�߁@��' onClick='CancelBuilding()'></form>";
	WriteLayer("Stage",s);
	s=CreateBuildingImage(BuildingNum,BuildingSeq,0,seqid,"",0.5,0.5,1);
	WriteLayer("Stage",s);
	Keys[11]="CancelBuilding()";
	window.scrollTo(0,0);
	SetOverflow("y");
	}

function EditBuilding_Exec(inx)
	{
	var i,num,seq,jc,ac,temp;
	num=BuildingNum;
	seq=BuildingSeq;
	temp=new Object();
	temp.building=new Array();
	if (!("top" in Building.building[inx]))
		{
		alert("�n�}��̈ʒu��ݒ肵�Ă��Ȃ��̂ŁA�o�^�ł��܂���B");
		return;
		}
	jc=Building.building[inx];
	if ("moved" in jc)	//	�W���Z��̕������
		{
		for(i=0;i<Cards[num].Condominium.length;i++)
			{
			ac=Cards[num].Condominium[i];
			if ((ac.Name==jc.id)&&(ac.Seq==jc.map))
				{
				ac.x=BPosX;ac.y=BPosY;	//	������ł̕\���ʒu
				}
			}
		SaveConfig(num);
		temp.building[0]=clone(jc);
		temp.Type=2;
		temp.Num=jc.SourceNum;
		temp.Seq=jc.SourceSeq;
		WriteXMLFile(temp,ApartXML(jc.id));
		MENU1PBig(num,seq);
		return;
		}

	//	�ʏ�̃A�p�[�g�ł���
	WriteBuilding();
	ChangeMarkersName(num);	//	���O�ύX�o�b�t�@BuildingNamesChanged�Ɋ�Â��ă}�[�J�[�����ꊇ�u������
	Cards[num].Buildings=GetBuildingSummeryInfo(num);
	SaveConfig(num);
	LoadCard(num);
	MENU1PBig(BuildingNum,BuildingSeq);
	}

function CancelBuilding()
	{
	ReadBuilding(BuildingNum);
	MENU1PBig(BuildingNum,BuildingSeq);
	}

function DeleteBuilding(inx)
	{
	var num=BuildingNum;
	var obj=Building.building[inx];
	var id=obj.id;
	var a=confirm("�u"+id+"�v���폜���Ă���낵���ł����H");
	if (!a) return;
	Building.building.splice(inx,1);
	WriteBuilding();
	Cards[num].Buildings=GetBuildingSummeryInfo(num);
	SaveConfig(num);
	DeleteMarkersName(num,id);	//	�}�[�J�[��񂩂炻�̖��O�̃r���̂��̂��폜����
	LoadCard(num);
	MENU1PBig(BuildingNum,BuildingSeq);
	}

function ReturntoBuilding(num)
	{
	switch(ReturntoBuildingFrom)
		{
		case  "EditBuilding":
			EditBuilding(num);
			break;
		case  "MENU1PBig":
			MENU1PBig(BuildingNum,BuildingSeq);
			break;
		default:
			EditRefuses(RRefuse,RRinx);
			break;
		}
	}

function GetBobj(obj)
	{
	if (obj==0) return Building;
	if (obj==1) return ABuilding;
	return obj;
	}

function ChangeFontSize(Bobj,num)
	{
	Bobj=GetBobj(Bobj);
	var i=document.forms[0].elements[2].selectedIndex;
	Bobj.building[num].Fontsize=fsizelist[i];
	ReturntoBuilding(num);
	}

function ChangeAlign(Bobj,num)
	{
	Bobj=GetBobj(Bobj);
	var i=document.forms[0].elements[3].selectedIndex;
	Bobj.building[num].Align=alignlist[i];
	ReturntoBuilding(num);
	}

function ChangeRefuseDisplay(Bobj,num)
	{
	var val=new Array("yes","no");
	Bobj=GetBobj(Bobj);
	var i=document.forms[0].elements[4].selectedIndex;
	Bobj.building[num].Comment=val[i];
	ReturntoBuilding(num);
	}

function ChangeParallel(Bobj,num)
	{
	Bobj=GetBobj(Bobj);
	var i=document.forms[0].elements[1].selectedIndex+1;
	Bobj.building[num].columns=i;
	ReturntoBuilding(num);
	}

function ChangeSequence(Bobj,num)
	{
	Bobj=GetBobj(Bobj);
	var k,s;
	var obj=Bobj.building[num];
	var i=document.forms[0].elements[0].selectedIndex+1;
	var j=parseInt(obj.sequences,10);
	if (i==j) return;
	if (i>j)	//	����������
		{
		if (j==1)
			{
			obj.sequence[0].id="�P��";
			}
		for(k=j;k<i;k++)
			{
			Bobj.building[num].sequence[k]=clone(obj.sequence[0]);
			s=MakeSequenceName(obj.sequence[0].id,k+1);
			Bobj.building[num].sequence[k].id=s;
			}
		}
	else{		//	����������
		k=j-i;
		Bobj.building[num].sequence.splice(i,k);
		if (i==1) delete obj.sequence[0].id;
		}
	Bobj.building[num].sequences=i;
	setTimeout("EditBuilding("+num+")",10);
	}

function MakeSequenceName(srcname,seq)
	{
	var i,j,s,c,c2,retname;
	retname=srcname;
	if (srcname=="") return retname;
	for(i in BSeq)
		{
		s=BSeq[i].split(",");
		if (seq>s.length-1) continue;
		c=s[0];
		if (srcname.indexOf(c,0)!=-1)
			{
			c2=s[seq-1];
			retname=srcname.replace(c,c2);
			break;
			}
		}
	return retname;
	}

function MakeRoomName(srcname,srcfloor,dstfloor,xshift)
	{
	var result,bbs1,bbs2;
	var i,j,c,ch,chd,p,p1,d1,d2,v2;
	srcfloor+="";
	dstfloor+="";
	p=srcname.indexOf(srcfloor,0);
	if (p==-1)
		{
		return srcname;
		}
	d1=srcname.substring(0,p);
	d2=srcname.substring(p+srcfloor.length,srcname.length);
	result=d1+dstfloor+d2;
	if ((xshift==0)||(d2==""))
		{
		return result;
		}
	if ((!isNaN(d2))&(d2.indexOf("-",0)==-1)&&(d2.indexOf(".",0)==-1))
		{
		l=d2.length;
		v2=parseInt(d2,10);
		v2+=xshift;
		if (v2==4) v2=5;	//	�S���΂���O����
		d2=v2+"";
		while(d2.length<l) d2="0"+d2;
		result=d1+dstfloor+d2;
		}
	else{
		for(i=0;i<d2.length;i++)
			{
			ch=d2.charAt(i);
			for(j in BSeq)
				{
				bbs1=BSeq[j].split(",");
				bbs2=bbs1.join("");
				p1=bbs2.indexOf(ch,0);
				if (p1==-1) continue;
				if ((p1+xshift)>=bbs2.length) continue;
				chd=bbs2.charAt(p1+xshift);
				if (chd=="4") chd="5";
				if (chd=="�S") chd="�T";
				if (chd=="�C") chd="�D";
				if (chd=="�l") chd="��";
				d2=d2.substring(0,i)+chd+d2.substring(i+1,d2.length);
				result=d1+dstfloor+d2;
				return result;
				}
			}
		}
	return result;
	}

function ChangeBuildingName(Bobj,num)
	{
	var tobj=new Object();
	Bobj=GetBobj(Bobj);
	if (ReturntoBuildingFrom=="EditRefuses") return;
	var i,err;
	var a=Bobj.building[num].id;
	var b=prompt("�����̖��O����͂��Ă��������F",a);
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if ((b=="")||(b==a)) return;
	err=false;
	for(i in Bobj.building)
		{
		if (i==num) continue;
		if (Bobj.building[i].id==b) {err=true;break;}
		}
	if (err)
		{
		alert("���͂��ꂽ���O�́A���������ɂ��鑼�̕����Əd�����܂��B");
		return;
		}

	//	���O�ύX�o�b�t�@�Ɂu�ύX�O�v�u�ύX��v�̖��O��ۑ�����
	tobj.before=Bobj.building[num].id;
	tobj.after=b;
	BuildingNamesChanged.push(tobj);
	
	Bobj.building[num].id=b;
	ReturntoBuilding(num);
	}

function ChangeSequenceName(Bobj,num,seq)
	{
	Bobj=GetBobj(Bobj);
	var i,q;
	var obj=Bobj.building[num].sequence[seq];
	var a=obj.id;
	var b=prompt("���̖��O����͂��Ă��������F",a);
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if ((b=="")||(b==a)) return;
	obj.id=b;
	q=parseInt(Bobj.building[num].sequences,10);
	if ((seq==0)&&(q>1))
		{
		for(i=1;i<q;i++)
			{
			Bobj.building[num].sequence[i].id=MakeSequenceName(obj.id,i+1);
			}
		}
	ReturntoBuilding(num);
	}

function ChangeStairName(Bobj,num,seq,str)
	{
	Bobj=GetBobj(Bobj);
	var i,q;
	var obj=Bobj.building[num].sequence[seq].stair[str];
	var a=obj.id;
	var b=prompt("�K�i�̖��O����͂��Ă��������F",a);
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if ((b=="")||(b==a)) return;
	obj.id=b;
	q=parseInt(Bobj.building[num].sequence[seq].stairs,10);
	if ((str==0)&&(q>1))
		{
		for(i=1;i<q;i++)
			{
			Bobj.building[num].sequence[seq].stair[i].id=MakeSequenceName(obj.id,i+1);
			}
		}
	ReturntoBuilding(num);
	}

function ChangeFloorName(Bobj,num,seq,str,flr)
	{
	Bobj=GetBobj(Bobj);
	var i,q;
	var obj=Bobj.building[num].sequence[seq].stair[str].floor[flr];
	var a=obj.id;
	var b=prompt("�K�̖��O����͂��Ă��������F",a);
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if ((b=="")||(b==a)) return;
	obj.id=b;
	q=parseInt(Bobj.building[num].sequence[seq].stair[str].floors,10);
	if ((flr==q-1)&&(q>1))
		{
		for(i=0;i<q-1;i++)
			{
			Bobj.building[num].sequence[seq].stair[str].floor[i].id=MakeSequenceName(obj.id,q-i);
			}
		}
	ReturntoBuilding(num);
	}

function ChangeRoomName(Bobj,num,seq,str,flr,rom)
	{
	Bobj=GetBobj(Bobj);
	var i,q;
	var obj=Bobj.building[num].sequence[seq].stair[str].floor[flr].room[rom];
	var a=obj.Text;
	var b=prompt("�����̖��O����͂��Ă��������F",a);
	if ((b==null)||(b=="")) return;
	b=b.trim();
	if ((b=="")||(b==a)) return;
	obj.Text=b;
	q=parseInt(Bobj.building[num].sequence[seq].stair[str].floors,10);
	ReturntoBuilding(num);
	}

function DecStair(Bobj,num,seq)
	{
	Bobj=GetBobj(Bobj);
	var obj=Bobj.building[num].sequence[seq];
	var i=parseInt(obj.stairs,10);
	var k,j;
	obj.stairs=i-1;
	obj.stair.splice(i-1,1);
	if (i==2)
		{
		delete obj.stair[0].id;
		}
	ReturntoBuilding(num);
	}

function IncStair(Bobj,num,seq)
	{
	Bobj=GetBobj(Bobj);
	var obj=Bobj.building[num].sequence[seq];
	var i=parseInt(obj.stairs,10);
	var k,j;
	obj.stairs=i+1;
	obj.stair[i]=clone(obj.stair[0]);
	if (i==1)
		{
		obj.stair[0].id="�K�i1";
		}
	obj.stair[i].id=MakeSequenceName(obj.stair[0].id,i+1);
	ReturntoBuilding(num);
	}

function DecFloor(Bobj,num,seq,ist)
	{
	Bobj=GetBobj(Bobj);
	var obj=Bobj.building[num].sequence[seq].stair[ist];
	var i=parseInt(obj.floors,10);
	var k,j;
	obj.floors=i-1;
	obj.floor.splice(0,1);
	if (i==2)
		{
		delete obj.floor[0].id;
		}
	ReturntoBuilding(num);
	}

function IncFloor(Bobj,num,seq,ist)
	{
	Bobj=GetBobj(Bobj);
	var obj=Bobj.building[num].sequence[seq].stair[ist];
	var i=parseInt(obj.floors,10);
	var k,j,s,s1;
	obj.floors=i+1;
	for(j=i-1;j>=0;j--)
		{
		obj.floor[j+1]=clone(obj.floor[j]);
		}
	if (i==1)
		{
		obj.floor[i].id="1F";
		}
	obj.floor[0].id=MakeSequenceName(obj.floor[i].id,i+1);
	for(k in obj.floor[0].room)
		{
		s=obj.floor[1].room[k].Text;
		s1=MakeRoomName(s,i,i+1,0);
		obj.floor[0].room[k].Text=s1;
		}
	ReturntoBuilding(num);
	}

function AddFloor(Bobj,num,seq,ist,ifl)
	{
	var obj,i,j,k,s,s1;
	Bobj=GetBobj(Bobj);
	obj=Bobj.building[num].sequence[seq].stair[ist];
	i=parseInt(obj.floors,10);
	obj.floors=i+1;
	if (i==1)
		{
		obj.floor[0].id="1F";
		}
	for(j=i;j>ifl;j--)
		{
		obj.floor[j]=clone(obj.floor[j-1]);
		}
	ReturntoBuilding(num);
	}

function DeleteFloor(Bobj,num,seq,ist,ifl)
	{
	var obj,i,j,k,s,s1;
	Bobj=GetBobj(Bobj);
	obj=Bobj.building[num].sequence[seq].stair[ist];
	i=parseInt(obj.floors,10);
	if (i==1) return;

	obj.floors=i-1;
	obj.floor.splice(ifl,1);
	if (i==2)
		{
		delete obj.floor[0].id;
		}
	ReturntoBuilding(num);
	}

function DecRoom(Bobj,num,seq,ist,ifl)
	{
	var obj,i,j,k;
	Bobj=GetBobj(Bobj);
	obj=Bobj.building[num].sequence[seq].stair[ist].floor[ifl];

	i=obj.rooms-1;
	if ("Colspan" in obj.room[i])
		{
		j=parseInt(obj.room[i].Colspan,10)-1;
		if (j<2)	delete obj.room[i].Colspan;
					else obj.room[i].Colspan=j;
		}
	else{
		i=parseInt(obj.rooms,10);
		obj.rooms=i-1;
		obj.room.splice(i-1,1);
		}
	ReturntoBuilding(num);
	}

function IncRoom(Bobj,num,seq,ist,ifl)
	{
	var obj,i,j,k;
	Bobj=GetBobj(Bobj);
	obj=Bobj.building[num].sequence[seq].stair[ist].floor[ifl];
	if (ShiftKey)
		{
		i=obj.rooms-1;
		if ("Colspan" in obj.room[i]) j=parseInt(obj.room[i].Colspan,10);
			else j=1;
		j++;
		obj.room[i].Colspan=j;
		ReturntoBuilding(num);
		document.body.focus();
		return;
		}
	i=parseInt(obj.rooms,10);
	obj.rooms=i+1;
	k=parseInt(Bobj.building[num].sequence[seq].stair[ist].floors,10)-ifl;
	obj.room[i]=clone(obj.room[i-1]);
	if ("Colspan" in obj.room[i])
		{
		delete obj.room[i].Colspan;
		}
	obj.room[i].Text=MakeRoomName(obj.room[i-1].Text,k,k,1);
	ReturntoBuilding(num);
	}

function ReverseRooms(Bobj,num,seq,ist)
	{
	Bobj=GetBobj(Bobj);
	var i,r,r0,r1,r2;
	var tmp;
	var obj=Bobj.building[num].sequence[seq].stair[ist];
	for(i in obj.floor)
		{
		r=parseInt(obj.floor[i].rooms,10);
		if (r==1) continue;
		r0=Math.floor(r/2);
		for(r1=0;r1<r0;r1++)
			{
			r2=(r-1)-r1;
			tmp=clone(obj.floor[i].room[r1]);
			obj.floor[i].room[r1]=clone(obj.floor[i].room[r2]);
			obj.floor[i].room[r2]=clone(tmp);
			}
		}
	ReturntoBuilding(num);
	}
//-------------------------------------------------------------------------------
//	�r�����ɓ��L���𔽉f������
//-------------------------------------------------------------------------------
function SetRefusesToBuilding(Bobj,ref,num,clickable)
	{
	var ABobj=GetBobj(Bobj);
	var i,j,bs,bs1,bs2,tbl,seq,room;
	var p1,p2,lbl,obj,tobj;
	var s1,s2,s3,s4;
	if (ABobj=="") return;
	if (ref.length==0) return;
	for(i in ABobj.building)
		{
		ABobj.building[i].Temp=new Object();
		ABobj.building[i].Temp.Caption="";
		ABobj.building[i].Temp.Refuse=-1;
		EraseTempProperty(ABobj.building[i]);
		}
	for(i in ref)		//	���ۏ��ꗗ���[�v
		{
		i=parseInt(i,10);
		if ((Bobj==0)&&(ref[i].KBN2!="�W���Z��(�P��)")) continue;	//	��ʃA�p�[�g�ɂ́u�W���Z��i�P�Ɓj�v�𔽉f������
		if ((Bobj==1)&&(ref[i].KBN2!="�W���C���^�[�z��")) continue;	//	�W���C���^�[�z���ɂ́u�W���C���^�[�z���v�𔽉f������
		lbl="";
		if (ref[i].KBN1=="����") lbl="����:";
		if (ref[i].KBN1=="�m�F") lbl="�m�F:";
		if (ref[i].KBN1=="�ĖK��/����") lbl="��:";
		if (ref[i].KBN1=="�O����/��b") lbl="�O:";
		if (lbl=="") continue;
		obj=GetBLDString(ref[i].Position);
		if (obj.id=="")
			{
			continue;	//	�r���ΏۂłȂ�
			}
		for(j in ABobj.building)
			{
			if (ABobj.building[j].id!=obj.id) continue;
//			if (ABobj.building[j].map!=ref[i].Num) continue;
			tobj=ABobj.building[j].sequence[obj.sequence].stair[obj.stair].floor[obj.floor].room[obj.room];
			tobj.Temp=new Object();
			tobj.Temp.num=num;
			tobj.Temp.seq=i;
			tobj.Temp.KBN1=ref[i].KBN1;
			tobj.Temp.KBN2=ref[i].KBN2;
			tobj.Temp.Date=ref[i].Date;
			room=tobj.Text;
			if (ABobj.building[j].sequences>1)
				{
				lbl+=ABobj.building[j].sequence[obj.sequence].id+room;
				}
			else{
				lbl+=room;
				}
			if (ABobj.building[j].Temp.Caption=="")
				{
				ABobj.building[j].Temp.Caption+="��";
				}
			else ABobj.building[j].Temp.Caption+=",";
			if (clickable)
				{
				lbl="<span onclick='PreEditRefuses("+num+","+i+")'>"+lbl+"</span>";
				}
			ABobj.building[j].Temp.Caption+=lbl;
			break;
			}
		}
	}
//---------------------------------------------------------------------------------------------------
// mode:0=�ʏ�\���@1=�ҏW�p 2=�h���b�O�z�u�p 3=�h���b�O�w�i�p 4=���@�E�ʒu�̂�	5=���L���N���b�N�p
//	    6=����p�i�J���[���[�h���ʁA��{�I�ɂ͂O�Ɠ����j 7=�}�[�J�[�ҏW�p�i�V�j8=�}�[�J�[�ҏW�p�i�u���j
//---------------------------------------------------------------------------------------------------
function CreateBuildingImage(mapnum,mapseq,Bobj,num,cmd,zoomx,zoomy,mode)
	{
	var ABobj=GetBobj(Bobj);
	var CondMode=false;
	var i,j,k,s,seq;
	var ix,iy,ist,floors,rooms,ifl,iro;
	var x,y,mr,tobj;
	var refstring="";
	var obj=ABobj.building[num];
	var editmode=false;
	var SizeObj=new Object();
	var pix=new Array();
	for(i=1;i<=64;i++) pix[i]=Math.floor(i*zoomy*10)/10;
//	pix[40]=32;

	if (("Condominium" in ABobj.building[num]))			CondMode=true;
	if ((mode==1)||(mode==5)||(mode==7)||(mode==8))		CondMode=false;
	if (mode==1) editmode=true;

	s="<div id=BLD"+num+" align=center style='overflow:visible;display:inline-block;";
	s+="border:"+pix[8]+"px outset;text-align:center;background-color:#dddddd;";
/*
	if ((zoomx!=1)||(zoomy!=1))
		{
		alert(zoomx+","+zoomy);
		s+="transform:scale("+zoomx+","+zoomy+");";
		}
*/
	x=parseInt(obj.left,10);
	y=parseInt(obj.top,10);
	x=Math.floor(x*zoomx);
	y=Math.floor(y*zoomy);
	if (mode==3)
		{
		s+="z-index:3;filter:alpha(Opacity=50);";
		}
	if ((mode==0)||(mode==6)||(mode==7))
		{
		s+="z-index:5;";
		}
	if ((mode==0)||(mode==3)||(mode==6)||(mode==7))
		{
		s+="position:absolute;";
		s+="left:"+x+"px;top:"+y+"px;";
		}
	if (mode==4)
		{
		SizeObj.x=x;
		SizeObj.y=y;
		}
	if (cmd!="")
		{
		s+="cursor:pointer;'";
		s+=cmd;
		}
	else	s+="'";
	if (mode==0)
		{
		s+=" title='���̕�����ҏW���܂�'";
		}
	s+=">";

	if (mode==8) s="";

	s+="<div align=center style='overflow:visible;border:inset "+pix[8]+"px;";
	s+="background-color:#";
	s+="0000ff;";	//	�J���[��p�ɏC��(2016/7/8)
	s+="font-size:"+pix[48]+"px;color:#ffffff;padding:"+pix[4]+"px;font-weight:bold;white-space:nowrap;";
	if ((editmode)&&(ReturntoBuildingFrom!="EditRefuses"))
		{
		s+="cursor:pointer;' title='���̕����̖��O��ύX���܂�' onclick='ChangeBuildingName("+Bobj+","+num+")'";
		}
	else{
		s+="'";
		}
	s+=">"+obj.id+"</div>";

	var tdisp=true;
	if (!("Temp" in obj)) tdisp=false;
	if (("Comment" in obj)&&(obj.Comment=="no")) tdisp=false;
	if (tdisp)
		{
		if (editmode)
			{
			s+="<div align=left style='cursor:pointer;white-space:nowrap;color:#000000;text-decoration:underline;font-size:"+pix[30]+"px;'>";
			}
		else{
			s+="<div align=left style='white-space:nowrap;color:#000000;font-size:"+pix[30]+"px;'>";
			}
		s+=obj.Temp.Caption;
		s+="</div>";
		}
	s+="<table border=0 cellpadding="+pix[8]+" cellspacing=0>";
	x=parseInt(obj.columns,10);
	y=Math.floor(obj.sequences/x);
	mr=obj.sequences%x;
	if (mr!=0) y++;
	seq=-1;
	for(iy=1;iy<=y;iy++)
		{
		s+="<tr>";
		for(ix=1;ix<=x;ix++)
			{
			seq++;
			if ("Fontsize" in obj)
				{
				fsize=obj.Fontsize;
				}
			else fsize=40;
			s+="<td align=center valign=top style='font-size:"+pix[fsize]+"px;color:#000000;white-space:nowrap;'>";
			if (seq in obj.sequence)
				{
				if ((editmode)&&(obj.sequence[seq].stairs>1))
					{
					s+="<img src='./sys/left.gif' width="+pix[32]+" height="+pix[32];
					s+=" style='cursor:pointer' title='�K�i���P���炵�܂�' onClick='DecStair("+Bobj+","+num+","+seq+")'>";
					}
				if ("id" in obj.sequence[seq])
					{
					if (editmode)	s+="<span style='cursor:pointer;' title='���̓��̖��O��ύX���܂�' onclick='ChangeSequenceName("+Bobj+","+num+","+seq+")'>";
					if (obj.sequence[seq].id!="") s+=obj.sequence[seq].id;
					if (editmode) s+="</span>";
					}
				if (editmode)
					{
					s+="<img src='./sys/right.gif' width="+pix[32]+" height="+pix[32];
					s+=" style='cursor:pointer' title='�K�i���P���₵�܂�' onClick='IncStair("+Bobj+","+num+","+seq+")'>";
					}
				s+="<table border=0 cellpadding=0 cellspacing=0><tr>";
				for(ist in obj.sequence[seq].stair)
					{
					s+="<td align=center valign=bottom style='font-size:"+pix[fsize]+"px;color:#000000;white-space:nowrap;'>";
					if (editmode)
						{
						if (obj.sequence[seq].stair[ist].floors>1)
							{
							s+="<img src='./sys/down.gif' width="+pix[32]+" height="+pix[30];
							s+=" style='cursor:pointer' title='�K���P���炵�܂�' onClick='DecFloor("+Bobj+","+num+","+seq+","+ist+")'>";
							}
						}
					if ("id" in obj.sequence[seq].stair[ist])	//	�K�i��
						{
						if (editmode)
							{
							s+="<span style='cursor:pointer;' title='���̊K�i�̖��O��ύX���܂�' onclick='ChangeStairName("+Bobj+","+num+","+seq+","+ist+")'>";
							}
						if (obj.sequence[seq].stair[ist].id!="") s+=obj.sequence[seq].stair[ist].id;
						if (editmode) s+="</span>";
						}
					if (editmode)
						{
						s+="<img src='./sys/up.gif' width="+pix[32]+" height="+pix[32];
						s+=" style='cursor:pointer' title='�K���P���₵�܂�' onClick='IncFloor("+Bobj+","+num+","+seq+","+ist+")'>";
						s+="<img src='./sys/reverse.gif' width="+pix[64]+" height="+pix[32];
						s+=" style='cursor:pointer' title='���ׂĂ̕����ԍ������E���]���܂�' onClick='ReverseRooms("+Bobj+","+num+","+seq+","+ist+")'>";
						}
					s+="<table border=0 cellpadding="+pix[4]+" cellspacing=0>";
					var ffl=true;
					for(ifl in obj.sequence[seq].stair[ist].floor)
						{
						var moved=false,detected=true;
						s+="<tr>";
						if (CondMode)
							{
							if (!("moved" in obj.sequence[seq].stair[ist].floor[ifl])) detected=false;
							else{
								if (obj.sequence[seq].stair[ist].floor[ifl].moved!=(mapnum+"-"+mapseq)) detected=false;
								}
							}
						if (editmode)
							{
							s+="<td>";
							s+="<img src='./sys/left.gif' width="+pix[32]+" height="+pix[32];
							s+=" style='cursor:pointer' title='�������P���炵�܂�'";
							if (obj.sequence[seq].stair[ist].floor[ifl].rooms>1)
								{
								s+=" onClick='DecRoom("+Bobj+","+num+","+seq+","+ist+","+ifl+")'";
								}
							s+=">";
							s+="</td>";
							}
						//	�t���A��
						if ("id" in obj.sequence[seq].stair[ist].floor[ifl])
							{
							s+="<td nowrap style='font-size:"+pix[fsize]+"px;white-space:nowrap;";
							s+="border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;";
							if (ffl) s+="border-top:1px solid black;";
							if (moved) s+="background-color:ffaaaa;"; else s+="background-color:#bbbbbb;";
							if (!detected) s+="color:#999999;";
							s+="'>";
							if (editmode)
								{
								s+="<span style='cursor:pointer;' title='���̊K�̖��O��ύX���܂�' onclick='ChangeFloorName("+Bobj+","+num+","+seq+","+ist+","+ifl+")'>";
								}
							s+=obj.sequence[seq].stair[ist].floor[ifl].id;
							if (editmode)	s+="</span>";
							s+="</td>";
							}
						//	�K�̒��̃t���A���\��
						for(iro in obj.sequence[seq].stair[ist].floor[ifl].room)
							{
							s+="<td align=";
							if ("Align" in obj)
								{
								s+=obj.Align+" ";
								}
							else{
								s+="center ";
								}
							if ("Colspan" in  obj.sequence[seq].stair[ist].floor[ifl].room[iro])
								{
								s+="colspan="+obj.sequence[seq].stair[ist].floor[ifl].room[iro].Colspan+" ";
								}
							s+="style='border-bottom:1px solid black;border-right:1px solid black;";
							if (ffl) s+="border-top:1px solid black;";
							s+="font-size:"+pix[fsize]+"px;white-space:nowrap;";
							if (!detected) s+="color:#aaaaaa;text-decoration:line-through;background-color:#cccccc;";	//	�W���Z��Œn�}�ΏۊO�ł���Z��
							else{
								if ("Temp" in obj.sequence[seq].stair[ist].floor[ifl].room[iro])	//	���L���̂���Z��
									{
									to=obj.sequence[seq].stair[ist].floor[ifl].room[iro].Temp;
									switch (to.KBN1)
										{
										case "����":
											s+="color:#ffffff;background-color:#ff0000;";
											break;
										case "�m�F":
											s+="color:#000000;background-color:#ffff00;";
											break;
										case "�Ԋu":
											s+="color:#000000;background-color:#00ffff;";
											break;
										default:
											s+="color:#ffffff;background-color:#000000";
											break;
										}
									}
								else{	//	���L���̂Ȃ��Z��
									s+="color:#000000;";
									if (moved) s+="background-color:ffdddd;"; else s+="background-color:#ffffff;";
									}
								}

							//	�Z���̔w�i(cw�C��)
							if (((mode==0)||(mode==7)||(mode==8))&&("Mark" in obj.sequence[seq].stair[ist].floor[ifl].room[iro]))	//	�}�[�N�L��̃Z��
								{
								to=obj.sequence[seq].stair[ist].floor[ifl].room[iro].Mark;
								s+="background-repeat:no-repeat;background-position:center;background-size:contain;";
								switch (to.type)
									{
									case "NewO":
										s+="background-image:url(\"./sys/marks/redO"+fsize+".png\");";
										break;
									case "oldO":
										s+="background-image:url(\"./sys/marks/blueO"+fsize+".png\");";
										break;
									case "oldX":
										s+="background-image:url(\"./sys/marks/blueX"+fsize+".png\");";
										break;
									case "oldOO":
										s+="background-image:url(\"./sys/marks/redOO"+fsize+".png\");";
										break;
									case "star":
										s+="background-image:url(\"./sys/marks/star"+fsize+".png\");";
										break;
									}
								}

							if (editmode)
								{
								s+="cursor:pointer;' ";
								tobj=obj.sequence[seq].stair[ist].floor[ifl].room[iro];
								if ("Temp" in tobj)
									{
									s+="title='���L����ҏW���܂�' onclick='PreEditRefuses(";
									s+=tobj.Temp.num+",";
									s+=tobj.Temp.seq+")'>";
									}
								else{
									s+="title='�����̖��O��ύX���܂�' onclick='ChangeRoomName("+Bobj+","+num+","+seq+","+ist+","+ifl+","+iro+")'>";
									}
								}
							else{
								switch(mode)
									{
									case 5:
										s+="cursor:pointer;' title='���L���̏ꏊ���w�肵�܂�' onclick='PickRefuseRoom("+Bobj+","+num+","+seq+","+ist+","+ifl+","+iro+")'>";
										break;
									case 7:
									case 8:
										s+="cursor:pointer;' onclick='RoomMarker("+num+","+seq+","+ist+","+ifl+","+iro+")'>"
										break;
									default:
										s+="'>";
										break;
									}
								}
							s+=obj.sequence[seq].stair[ist].floor[ifl].room[iro].Text+"</td>";
							}
						if (editmode)
							{
							s+="<td><img src='./sys/right.gif' width="+pix[32]+" height="+pix[32];
							s+=" style='cursor:pointer' title='�������P���₵�܂�\n(Shift)�����̕����g�����܂�'";
							s+=" onClick='IncRoom("+Bobj+","+num+","+seq+","+ist+","+ifl+")'></td>";
							s+="<td><img src='./sys/plus.gif' width="+pix[32]+" height="+pix[32];
							s+=" style='cursor:pointer' title='�P���ɊK��}�����܂��B'";
							s+=" onClick='AddFloor("+Bobj+","+num+","+seq+","+ist+","+ifl+")'></td>";
							s+="<td><img src='./sys/delete.gif' width="+pix[32]+" height="+pix[32];
							s+=" style='cursor:pointer' title='���̊K���폜���܂��B'";
							s+=" onClick='DeleteFloor("+Bobj+","+num+","+seq+","+ist+","+ifl+")'></td>";
							}
						s+="</tr>";
						ffl=false;
						}
					s+="</table></td>";
					}
				s+="</tr></table>";
				}
			s+="</td>";
			}
		s+="</tr>";
		}
	s+="</table>";
	if (mode!=8) s+="</div>";

	if (mode==4)
		{
		TEST.innerHTML=s;
		SizeObj.width=TEST.offsetWidth;
		SizeObj.height=TEST.offsetHeight;
		return SizeObj;
		}
	//	�}�[�J�[�ҏW�p�Ƀr���T�C�Y���擾����
	if (mode==7)
		{
		var hitobj=new Object();
		TEST.innerHTML=s;
		hitobj.x=parseInt(obj.left,10);
		hitobj.y=parseInt(obj.top,10);
		hitobj.width=window["BLD"+num].offsetWidth;
		hitobj.height=window["BLD"+num].offsetHeight;
		hitobj.html=s;
		hitobj.name=obj.id+"";
		TEST.innerHTML="";
		NM_DispBuildings.push(hitobj);
		}
	return s;
	}

//---------------------------------------------------------
var BCursor="";
var BPosX=0,BPosY=0;
var BWidth,BHeight;
var BCsrX=0,BCsrY=0,BBtn=false,BDrag=false;
var BRelX=0,BRelY=0;
//---------------------------------------------------------
function PlaceBuilding(Bobj,num)
	{
	var mapimage;
	var ABobj=GetBobj(Bobj);
	BCursor=CreateBuildingImage(BuildingNum,BuildingSeq,Bobj,num,"",1,1,2);
	TEST.innerHTML=BCursor;
	BWidth=TEST.offsetWidth;
	BHeight=TEST.offsetHeight;
	BDrag=false;BBtn=false;

	var i,k,s,found,file,r,tbl,cl;
	var obj=ABobj.building;
	var rx=new Array();
	RDTitle=document.title;
	RDragObj=num;
	if (Cards[BuildingNum].MapType==0)
		{
		mapimage=PNGFile(BuildingNum,BuildingSeq);
		}
	else{
		mapimage=BlankPNG();
		}

	r=GetImageInfo(mapimage);
	if ("top" in ABobj.building[num])
		{
		BPosX=parseInt(ABobj.building[num].left,10);
		BPosY=parseInt(ABobj.building[num].top,10);
		}
	else{
		BPosX=0;BPosY=0;
		}
	//	���z�u���Ă���ȊO�̃r����w�i�ɃZ�b�g����
	var BG="";
	var BGcmd;
	for(i in obj)
		{
		i=parseInt(i,10);
		if (i==num) continue;
		k=parseInt(obj[i].map,10);
		if (k!=BuildingSeq) continue;
		BG+=CreateBuildingImage(BuildingNum,BuildingSeq,Bobj,i,"",1,1,3);
		}

	ClearKey();
	ClearLayer("Stage");	//�@�n�}���C���[
	ClearLayer("Mask");		//	���L���C���[
	ClearLayer("Drag");		//	�}�E�X���샌�C���[
	ClearLayer("Terop");

	document.title="������z�u����ꏊ�փh���b�O���Ă��������B";
	Keys[11]="";
	
	//	1.�n�}���C���[
	s="<img src='"+mapimage+"' style='position:absolute;z-index:0;top:0px;left:0px;'>";
	WriteLayer("Stage",s);

	//	2.���������C���[
	WriteLayer("Mask",BG);
	//	3.�h���b�O�I�u�W�F�N�g
	s="<div id='BDRG' style='position:absolute;z-index:5;top:"+BPosY+"px;left:"+BPosX+"px;'";
	s+=" onmousedown='PlaceBuilding_mousedown()' onmousemove='PlaceBuilding_mousemove()' onmouseup='PlaceBuilding_mouseup()'";
	s+=">"+BCursor+"</div>";
	WriteLayer("Drag",s);

	//	4.�������C���[
	s="<img src='"+BlankGIF()+"' width="+r.x+" height="+r.y;
	s+=" style='cursor:default;z-index:6;position:absolute;top:0px;left:0px;'";
	s+=" onmousedown='PlaceBuilding_mousedown()' onmousemove='PlaceBuilding_mousemove()' onmouseup='PlaceBuilding_mouseup()'>";
	WriteLayer("Drag",s);

	wx=BPosX-(document.documentElement.clientWidth/2);
	wy=BPosY-(document.documentElement.clientHeight/2);
	if (wx<0) wx=0;
	if (wy<0) wy=0;
	window.scrollTo(wx,wy);

	s="������z�u���Ă�������<br>";
	s+=AddKeys(1,"�m��","EndofPlaceBuilding("+Bobj+","+num+",true)");
	s+=AddKeys(0,"�߂�","EndofPlaceBuilding("+Bobj+","+num+",false)");
	FloatingMenu.Title="�����̔z�u";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",wx,wy,10,240,104);
	RscrollX=wx;RscrollY=wy;
	window.onscroll=WriteMap_Scroll;
	SetOverflow("xy");
	}

function PlaceBuilding_mousedown()
	{
	var ax1,ax2,ay1,ay2;
	if (event.button!=0) return;
	BCsrX=event.offsetX;
	BCsrY=event.offsetY;
	BBtn=true;
	ax1=BPosX;ax2=BPosX+BWidth;
	ay1=BPosY;ay2=BPosY+BHeight;
	BDrag=false;
	if ((BCsrX>=ax1)&&(BCsrX<=ax2)&&(BCsrY>=ay1)&&(BCsrY<=ay2))
		{
		BDrag=true;
		BRelX=BCsrX-ax1;BRelY=BCsrY-ay1;
		}
	}

function PlaceBuilding_mouseup()
	{
	if (event.button!=0) return;
	BCsrX=event.offsetX;
	BCsrY=event.offsetY;
	BBtn=false;
	BDrag=false;
	}

function PlaceBuilding_mousemove()
	{
	BCsrX=event.offsetX;
	BCsrY=event.offsetY;
	if (BDrag)
		{
		BPosX=BCsrX-BRelX;
		BPosY=BCsrY-BRelY;
		BPosX=Math.floor(BPosX/8)*8;
		BPosY=Math.floor(BPosY/8)*8;
		BDRG.style.left=BPosX+"px";
		BDRG.style.top=BPosY+"px";
		}
	}

function EndofPlaceBuilding(Bobj,num,mode)
	{
	var ABobj=GetBobj(Bobj);
	var cmd,wx,wy,obj;
	var s,i,p,ac;
	document.title=RDTitle;
	window.onscroll="";
	FloatingMenu.Close();
	ClearLayer("Terop");
	ClearLayer("Mask");
	ClearLayer("Drag");
	if (mode)
		{
		ABobj.building[num].left=BPosX;
		ABobj.building[num].top=BPosY;
		if (ReturntoBuildingFrom=="MENU1PBig")
			{
			for(i=0;i<Cards[BuildingNum].Condominium.length;i++)
				{
				obj=Cards[BuildingNum].Condominium[i];
				if (obj.Name!=ABobj.building[num].id) continue;
				if (obj.Seq!=BuildingSeq) continue;
				obj.x=BPosX;
				obj.y=BPosY;
				}
			SaveConfig(BuildingNum);
			}
		}
	ReturntoBuilding(num);
	}


function GetBLDString(str)
	{
	var p1,tbl;
	var obj=new Object();
	obj.id="";
	obj.sequence=0;
	obj.stair=0;
	obj.floor=0;
	obj.room=0;
	if (str=="") return obj;
	p1=str.indexOf("bld:",0);
	if (p1==-1) return obj;
	tbl=str.split(",");
	obj.id=tbl[0].substring(4,tbl[0].length);
	obj.sequence=parseInt(tbl[1],10);
	obj.stair=parseInt(tbl[2],10);
	obj.floor=parseInt(tbl[3],10);
	obj.room=parseInt(tbl[4],10);
	return obj;
	}

function SetBLDString(Bobj,num,seq,ist,ifl,iro)
	{
	Bobj=GetBobj(Bobj);
	var s="";
	s="bld:"+Bobj.building[num].id+",";
	s+=seq+","+ist+","+ifl+","+iro;
	return s;
	}

function EraseTempProperty(obj)	//	building[num]�I�u�W�F�N�g��n��
	{
	var a1,a2,a3,a4,a5;
	for(a1 in obj.sequence)
		{
		for(a2 in obj.sequence[a1].stair)
			{
			for(a3 in obj.sequence[a1].stair[a2].floor)
				{
				for(a4 in obj.sequence[a1].stair[a2].floor[a3].room)
					{
					for(a5 in obj.sequence[a1].stair[a2].floor[a3].room[a4])
						{
						if (a5=="Temp")
							{
							delete obj.sequence[a1].stair[a2].floor[a3].room[a4].Temp;
							}
						if (a5=="Mark")
							{
							delete obj.sequence[a1].stair[a2].floor[a3].room[a4].Mark;
							}
						}
					}
				}
			}
		}
	}

function GetBuildingSummeryInfo(num)
	{
	var i,j,a1,a2,a3;
	var result=new Object();
	var b=ReadXMLFile(BuildingFile(num),true);
	result.Count=0;
	result.House=0;
	if (b=="") return result;
	for(i in b.building)
		{
		result.Count++;
		for(a1 in b.building[i].sequence)
			{
			for(a2 in b.building[i].sequence[a1].stair)
				{
				for(a3 in b.building[i].sequence[a1].stair[a2].floor)
					{
					result.House+=parseInt(b.building[i].sequence[a1].stair[a2].floor[a3].rooms,10);
					}
				}
			}
		}
	return result;
	}

//-----------------------------------------------------------------------
function SplitFloor(Bobj,num,seq,ist,ifl)
	{
	var p1,p2,s,ss,err;
	s=prompt("���̊K�̈ړ���ɂȂ���ԍ�-�n�}�ԍ��𔼊p�œ��͂��Ă��������B\n�i��F��20�̒n�}�B��20-3�j","");
	err=false;
	if ((s=="")||(s==null)) return;
	s=s.trim();
	if ((s=="")||(s==null)) return;
	ss=s.split("-");
	if (ss.length!=2) err=true;
	else if ((isNaN(ss[0]))||(isNaN(ss[1]))) err=true;
	if (!err)
		{
		var fn=DataFolder()+ss[0];
		if (!fso.FolderExists(fn)) err=true;
		}
	if (err)
		{
		alert("���͌`��������������܂���B");
		return;
		}
	Bobj=GetBobj(Bobj);
	Bobj.building[num].sequence[seq].stair[ist].floor[ifl].moved=s;
	ReturntoBuilding(num);
	}
function RejoinFloor(Bobj,num,seq,ist,ifl)
	{
	Bobj=GetBobj(Bobj);
	delete Bobj.building[num].sequence[seq].stair[ist].floor[ifl].moved;
	ReturntoBuilding(num);
	}

function PopupBuildingPlace(num,seq,Id)
	{
	var s,temp;
	var fc,i,j;
	var BTB=Cards[num].RTB;
	for(i in BTB)
		{
		if (BTB[i].Name==Id) break;
		}
	var mapimage=BlankPNG();
	var r=GetImageInfo(mapimage);
	var vml=new Poly();
	vml.mapsize=1;
	vml.width=r.x;
	vml.height=r.y;
	vml.AddObject(BTB[i].Position,"","",0.3,0.3,"");

	s="<html xmlns:v=\"urn:schemas-microsoft-com:vml\">"; 
	s+="<head><title>"+Id+"(��"+num+"-"+seq+")</title>";
	s+="<meta http-equiv=\"content-type\" content=\"text/html;charset=shift-jis\">";
	s+="<meta HTTP-EQUIV=\"imagetoolbar\" CONTENT=\"no\">";
	s+="<style>v"+qt+":* { behavior: url(#default#VML); }</style>";
	s+="<body onkeydown='window.close()'>";
	s+="<div style='position:absolute;top:0px;left:0px;zoom:30%;'>";
	s+="<img src=\""+PNGFile(num,seq)+"\">";
	s+="</div>";
	v="<div style='position:absolute;top:0mm;left:0mm;z-index:5;'>";
	v+=vml.Draw(true,false)+"</div>";
	s+=v;
	s+="</body></html>";
	temp=SysFolder()+"popup.htm";
	var fc=fso.CreateTextFile(temp,true);
	fc.Write(s);
	fc.close();
	window.showModalDialog(temp,this,"dialogWidth=800px;dialogHeight=600px;center=true;resizable=true;");
	}

//---------------------------------------------------------------------------------
//	2018/5/19�ǉ��F�r���ҏW�I�����A���O��ύX�����W���Z��̃}�[�J�[����u������
//---------------------------------------------------------------------------------
function ChangeMarkersName(num)
	{
	if (BuildingNamesChanged.length<1) return;		//	���O�ύX�o�b�t�@�ɉ����Ȃ���ΏI��
	if (!fso.FileExists(MarkerFile(num))) return;	//	�}�[�J�[���Ȃ�
	var tobj=LoadMarker(num);
	var i,j,k,s,stbl;
	var ctr=0;

	for(k=0;k<BuildingNamesChanged.length;k++)
		{
		for(i in tobj.Map)
			{
			for(j in tobj.Map[i].Points)
				{
				if (tobj.Map[i].Points[j].x!="building") continue;
				s=tobj.Map[i].Points[j].y;
				stbl=s.split(",");
				if (stbl[0]!=BuildingNamesChanged[k].before) continue;
				ctr++;
				stbl[0]=BuildingNamesChanged[k].after;
				tobj.Map[i].Points[j].y=stbl.join(",");
				}
			}
		}
	SaveMarker(num,tobj);
	}
//---------------------------------------------------------------------------------
//	2018/5/19�ǉ��F�r���폜���A�}�[�J�[���̂��̖��O�̂��̂��폜����
//---------------------------------------------------------------------------------
function DeleteMarkersName(num,id)
	{
	if (!fso.FileExists(MarkerFile(num))) return;	//	�}�[�J�[���Ȃ�
	var tobj=LoadMarker(num);
	var i,j,k,s,stbl;
	var ctr=0;

	for(i in tobj.Map)
		{
		for(j=tobj.Map[i].Points.length-1;j>=0;j--)
			{
			if (tobj.Map[i].Points[j].x!="building") continue;
			s=tobj.Map[i].Points[j].y;
			stbl=s.split(",");
			if (stbl[0]!=id) continue;
			tobj.Map[i].Points.splice(j,1);
			}
		}
	SaveMarker(num,tobj);
	}

