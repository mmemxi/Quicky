//------------------------------------------------------------------------------------
//	���L�����̒ǉ��E�ύX
//------------------------------------------------------------------------------------
var RTB=new Array();
var RSTR=new Array();
var RSortkey=new Array();
var yy,mm,dd;
var RRefuse=0;
var RRinx=0;
var RDragging=false;
var RDragStartX=0;
var RDragStartY=0;
var RDragEndX=0;
var RDragEndY=0;
var RDragObj;
var RDTitle="";
var RDComment="";
var RDSize=50;
var oRDComment="";
var oRDSize=50;
var RefuseExit;
var Rvml=new Poly("");
var RscrollX,RscrollY;
var RBuild=new Object();
var TempXMLFile="";

function Maint_Refuses(num)
	{
	var BTB=Cards[num].RTB;
	RRefuse=num;
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	RefuseExit="";
	s="<form>"+SysImage("cwministry.png")+"<br>";
	s+="<span class=size3>���C�����j���[�����ꗗ�����L���</span><br>";
	s+="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̓��L���ꗗ�F</div>"+hr();
	WriteLayer("Stage",s);
	AddKey("Stage",1,"���L���̒ǉ�","AddRefuses("+num+",0)");
	AddKey("Stage",0,"���ꗗ�֖߂�","MENU1()");
	Keys[11]="MENU1()";
	ReadBuilding(num);
	SetRefusesToBuilding(0,BTB,num,false);
	//	�ꗗ�\---------------------------------------------------------------------
	s="<table border=1 cellpadding=5 cellspacing=0><tr class=HEAD>";
	s+="<td align=center class=size2 width=30>�n�}</td>";
	s+="<td align=center class=size2 width=80>�敪�P</td>";
	s+="<td align=center class=size2 width=100>�敪�Q</td>";
	s+="<td align=center class=size2 width=150>���O</td>";
	s+="<td align=center class=size2 width=100>����</td>";
	s+="<td align=center class=size2 width=70>�o�^��</td>";
	s+="<td align=center class=size2 width=70>�m�F��</td>";
	s+="</tr>";
	//�\�[�g�L�[�̍쐬------------------------------------------------------------ 
	maxsort=0;
	for(i in RSortkey) delete RSortkey[i];
	for(i in BTB)
		{
		RSortkey[maxsort]=new Object();
		RSortkey[maxsort].num=i;
		RSortkey[maxsort].key=(100+BTB[i].Num)+BTB[i].KBN1+BTB[i].Date;
		maxsort++;
		}
	RSortkey.sort(Refuse_sort);
	for(j=0;j<maxsort;j++)
		{
		i=RSortkey[j].num;
		s+="<tr style='cursor:pointer' title='���̓��L�����C�����܂�' onClick='PreEditRefuses("+num+","+i+")' class=size2>";
		s+="<td align=right>"+BTB[i].Num+"</td>";				//	�n�}�ԍ�
		s+="<td align=center";
		if (BTB[i].KBN1=="����") s+=" bgcolor='#ff6666'";
		s+=">"+BTB[i].KBN1+"</td>";				//	�敪�P
		s+="<td align=center>"+BTB[i].KBN2+"</td>";				//	�敪�Q
		s+="<td>"+BTB[i].Name+"</td>";							//	���O
		s+="<td>"+BTB[i].Person+"�@</td>";						//	����
		if (BTB[i].Date=="") s+="<td align=center>-</td>";
		else s+="<td align=right>"+SplitDate(BTB[i].Date)+"</td>";				//	�o�^��
		if (!("LastConfirm" in BTB[i])) s+="<td align=center>-</td>";
		else
			{
			if (BTB[i].LastConfirm==0) s+="<td align=center>-</td>";
			else s+="<td align=right>"+SplitDate(BTB[i].LastConfirm)+"</td>";				//	�m�F��
			}
		s+="</tr>";
		}
	s+="</table>";
	if (BTB.length==0) s+="<span class=size3>���L���͂���܂���B</span>";
	s+="</form>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
//	document.forms[0].elements[0].focus();
	}
function Refuse_sort(a, b)
	{
	if (a.key>b.key) return 1;
	if (a.key<b.key) return -1;
	return 0;
	}
// ���L���̒ǉ�----------------------------------------------------------------
function AddRefuses(num,seq)
	{
	var BTB=Cards[num].RTB;
	var i=BTB.length;
	BTB[i]=new Object();
	if (seq==0) BTB[i].Num=1;else BTB[i].Num=seq;
	BTB[i].KBN1="����";
	BTB[i].KBN2="�ˌ�";
	if (Cards[num].MapType!=0) BTB[i].KBN2="�W���Z��i�P�Ɓj";
	BTB[i].Name="";				//	������
	BTB[i].Person="";			//	����i�W���̏ꍇ�A���v�����j
	BTB[i].Reason="";			//	���L���R�i�W���̏ꍇ�R�����g�j
	BTB[i].Date="20111101";		//	���L�ǉ����i�W���̏ꍇ�ԗ��J�n���j
	BTB[i].Servant="";			//	�񍐕�d�Җ��i�W���̏ꍇ�g�p�Җ��j
	BTB[i].Confirm="";			//	�m�F�󋵁i�W���̏ꍇ�ԗ��I�����j
	BTB[i].Position="";			//	�ʒu���
	BTB[i].Writing="";			//	�L�����
	BTB[i].Clip="";				//	�N���b�v�t�@�C����
	BTB[i].LastConfirm=0;		//	�ŏI�m�F��
	BTB[i].Frequency=0;			//	�Ԋu����
	BTB[i].Cycle=0;				//	�T�C�N��
	BTB[i].Add=true;
	PreEditRefuses(num,i);
	}

function PreEditRefuses(num,inx)
	{
	TempXMLFile="";
	EditRefuses(num,inx);
	}
// ���t���̓t�H�[���̍쐬-----------------------------------------------------------
function CreateDateForm(date,head)
	{
	var s,y,m,d,i;
	if (date==0) date="20111101";
	if (date==undefined) date="20111101";
	s="<select id='"+head+"_DATEYY'>";
	y=parseInt(date.substring(0,4),10);
	m=parseInt(date.substring(4,6),10);
	d=parseInt(date.substring(6,8),10);
	for(i=1995;i<=2030;i++)
		{
		s+="<option value="+i;
		if (i==y) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select>�N";
	s+="<select id='"+head+"_DATEMM'>";
	for(i=1;i<=12;i++)
		{
		s+="<option value="+i;
		if (i==m) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select>��";
	s+="<select id='"+head+"_DATEDD'>";
	for(i=1;i<=31;i++)
		{
		s+="<option value="+i;
		if (i==d) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select>��";
	return s;
	}
// ���L���̕ҏW --------------------------------------------------------------
function EditRefuses(num,inx)
	{
	var BTB=Cards[num].RTB;
	var s;
	var thistype=BTB[inx].KBN1;
	var kbn1=new Array("����","�ĖK��/����","�O����/��b","�W���C���^�[�z��","�W���Z��");
	var kbn2=new Array("�ˌ�","�W���Z��(�P��)","�W���Z��(�S��)","�W���C���^�[�z��");
	var mode;
	var bldobj;
	RRefuse=num;
	RRinx=inx;
	ReturntoBuildingFrom="EditRefuses";
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	//	����`���ڂ̃t�H���[
	if (!("LastConfirm" in BTB[inx])) BTB[inx].LastConfirm=BTB[inx].Date;
	if (!("Frequency" in BTB[inx])) BTB[inx].Frequency=0;
	if (!("Cycle" in BTB[inx])) BTB[inx].Cycle=0;
	//	�t�H�[���쐬
	s="<form>"+SysImage("cwministry.png")+"<br>";
	if ("Add" in BTB[inx])
		{
		mode=0;
		s+="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̓��L���̒ǉ��F</div>"+hr();
		}
	else{
		mode=1;
		if (!(isNaN(RefuseExit)))
			{
			s+="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̓��L���̏C���F</div>"+hr();
			}
		else{
			s+="<div class=size5>�u"+RefuseExit+"�v�̏C���F</div>"+hr();
			}
		}
	s+="<div class=size3><form onsubmit='return false'>";
	//	�i�P�j�n�}�ԍ� ---------------------------------------------------------------
	s+="�n�}�ԍ��F<select id='ER_SEQ' onChange='ChangeRefuseNum("+inx+")'>";
	for(i=1;i<=Cards[num].count;i++)
		{
		s+="<option value="+i;
		if (BTB[inx].Num==i) s+=" selected";
		s+=">"+i+"</option>";
		}
	s+="</select><br>";
	//	�i�Q�j�敪�P -----------------------------------------------------------------
	s+="�敪�P�F<select id='ER_KBN1' onChange='ChangeRefuseKBN1("+mode+","+inx+")'";
	if (mode==1)
		{
		if ((BTB[inx].KBN1!="�W���C���^�[�z��")&&(BTB[inx].KBN1!="�W���Z��")) s+=" disabled";
		}
	s+=">";
	for(i=0;i<kbn1.length;i++)
		{
		s+="<option";
		if (BTB[inx].KBN1==kbn1[i]) s+=" selected";
		if (mode==1)
			{
			if ((BTB[inx].KBN1=="�W���C���^�[�z��")||(BTB[inx].KBN1=="�W���Z��"))
				{
				if (i<3) s+=" disabled";
				}
			}
		s+=">"+kbn1[i];
		s+="</option>";
		}
	s+="</select><br>";
	//	�i�R�j�敪�Q -----------------------------------------------------------------
	if ((mode==0)&&(BTB[inx].KBN1!="�W���C���^�[�z��")&&(BTB[inx].KBN1!="�W���Z��"))
		{
		s+="�敪�Q�F<select id='ER_KBN2' onChange='ChangeRefuseKBN2("+inx+")'>";
		}
	else{
		s+="�敪�Q�F<select id='ER_KBN2' onChange='ChangeRefuseKBN2("+inx+")' disabled>";
		}
	for(i in kbn2)
		{
		s+="<option";
		if (BTB[inx].KBN2==kbn2[i]) s+=" selected";
		s+=">"+kbn2[i];
		s+="</option>";
		}
	s+="</select><br>";

	//	�i�S�j���O�` -----------------------------------------------------------------
	if ((thistype!="�W���C���^�[�z��")&&(thistype!="�W���Z��"))
		{
		s+="���O�F<input id='ER_NAME' type=text size=50 style='ime-mode:active;' value='"+BTB[inx].Name+"'><br>";
		s+="����F<input id='ER_PERSON' type=text size=10 style='ime-mode:active;' value='"+BTB[inx].Person+"'><br>";
		s+="���R�F<input id='ER_REASON' type=text size=50 style='ime-mode:active;' value='"+BTB[inx].Reason+"'><br>";
		s+="�o�^���F";
		s+=CreateDateForm(BTB[inx].Date,"ER")+"<br>";
		s+="��d�ҁF<input id='ER_SERVANT' type=text size=20 style='ime-mode:active;' value='"+BTB[inx].Servant+"'><br>";
		s+="�m�F���F<input id='ER_CONFIRM' type=text size=50 style='ime-mode:active;' value='"+BTB[inx].Confirm+"'><br>";
		s+="�ŏI�m�F���F"+CreateDateForm(BTB[inx].LastConfirm,"ERC")+"<br>";
		s+="�K��p�x�F<select id='ER_FREQUENCY'>";
		s+="<option value=0";if (BTB[inx].Frequency==0) s+=" selected";s+=">�K�₵�Ȃ�</option>";
		s+="<option value=2";if (BTB[inx].Frequency==2) s+=" selected";s+=">�Q��ɂP��</option>";
		s+="<option value=3";if (BTB[inx].Frequency==3) s+=" selected";s+=">�R��ɂP��</option>";
		s+="<option value=4";if (BTB[inx].Frequency==4) s+=" selected";s+=">�S��ɂP��</option>";
		s+="</select><br>";
		s+="�T�C�N���F<input id='ER_CYCLE' type=text size=5 style='ime-mode:disabled;' value='"+BTB[inx].Cycle+"'><br>";
		}
	else{
		s+="�������F<input id='ER_NAME' type=text size=50 style='ime-mode:active;' value='"+BTB[inx].Name+"'";
		if ((!("Add" in BTB[inx]))||(fso.FileExists(ApartXML(BTB[inx].Name))))
			{
			s+=" disabled";
			}
		s+="><br>";
		s+="���v�����F<input id='ER_PERSON' type=text size=10 style='ime-mode:disabled;' value='"+BTB[inx].Person+"'><br>";
		s+="�⑫�����F<input id='ER_REASON' type=text size=50 style='ime-mode:active;' value='"+BTB[inx].Reason+"'><br>";
		}
	switch (BTB[inx].KBN2)
		{
		case "�W���Z��(�P��)":
			s+=hr()+"�W���Z��̏ڍׁF<br>";
			s+="<select id='ER_BUILDING' size=5 onchange='ChangeRefuseBuilding(0,"+inx+")'>";
			bldobj=GetBLDString(BTB[inx].Position);
			bldsel=-1;
			if (Building=="")	s+="�i�s���j";
			else{
				for(i in Building.building)
					{
					if (parseInt(Building.building[i].map,10)!=BTB[inx].Num) continue;
					s+="<option value='"+i+"'";
					if (bldobj.id==Building.building[i].id) {s+=" selected";bldsel=parseInt(i,10);}
					s+=">"+Building.building[i].id+"</option>";
					}
				}
			s+="</select><br>";
			if (bldsel!=-1)
				{
				SetRefusesToBuilding(0,BTB,num,false);
				s+=CreateBuildingImage(num,0,0,bldsel,"",0.5,0.5,5);
				Building.building[bldsel].Temp=new Object();
				Building.building[bldsel].Temp.Refuse=inx;
				}
			s+=hr();
			break;
		case "�W���C���^�[�z��":
			s+=hr()+"�W���C���^�[�z���̏ڍׁF<br>";
			s+="<select id='ER_BUILDING' size=5 onchange='ChangeRefuseBuilding(1,"+inx+")'>";
			bldobj=GetBLDString(BTB[inx].Position);
			bldsel=-1;
			for(i in BTB)
				{
				if (BTB[i].Num!=BTB[inx].Num) continue;
				if (BTB[i].KBN1!="�W���C���^�[�z��") continue;
				s+="<option value='"+BTB[i].Name+"'";
				if (bldobj.id==BTB[i].Name) {s+=" selected";bldsel=parseInt(i,10);}
				s+=">"+BTB[i].Name+"</option>";
				}
			s+="</select><br>";
			if (bldsel!=-1)
				{
				if (TempXMLFile!=ApartXML(bldobj.id))
					{
					TempXMLFile=ApartXML(bldobj.id);
					ABuilding=ReadXMLFile(TempXMLFile,true);
					}
				if (ABuilding!="")
					{
 					SetRefusesToBuilding(1,BTB,num,false);
					s+=CreateBuildingImage(num,0,1,0,"",0.5,0.5,5);
					ABuilding.building[0].Temp=new Object();
					ABuilding.building[0].Temp.Refuse=inx;
					}
				else s+="�i���̕����͏ڍׂ��쐬����Ă��܂���j";
				}
			s+=hr();
			break;
		case "�W���Z��":
			s+=hr()+"�W���Z��̏ڍׁF<br>";
			s+="<select id='ER_BUILDING' size=5 onchange='ChangeRefuseBuilding(1,"+inx+")'>";
			bldobj=GetBLDString(BTB[inx].Position);
			bldsel=-1;
			for(i in BTB)
				{
				if (BTB[i].Num!=BTB[inx].Num) continue;
				if (BTB[i].KBN1!="�W���Z��") continue;
				s+="<option value='"+BTB[i].Name+"'";
				if (bldobj.id==BTB[i].Name) {s+=" selected";bldsel=parseInt(i,10);}
				s+=">"+BTB[i].Name+"</option>";
				}
			s+="</select><br>";
			if (bldsel!=-1)
				{
				if (TempXMLFile!=ApartXML(bldobj.id))
					{
					TempXMLFile=ApartXML(bldobj.id);
					ABuilding=ReadXMLFile(TempXMLFile,true);
					}
				if (ABuilding!="")
					{
					SetRefusesToBuilding(1,BTB,num,false);
					s+=CreateBuildingImage(num,0,1,0,"",0.5,0.5,5);
					ABuilding.building[0].Temp=new Object();
					ABuilding.building[0].Temp.Refuse=inx;
					}
				else s+="�i���̕����͏ڍׂ��쐬����Ă��܂���j";
				}
			s+=hr();
			break;
		default:
			s+="<input type=button value='�ʒu���̎w��";
			if (BTB[inx].Position=="") s+="(�w�肳��Ă��܂���)";else s+="(�w���)";
			s+="' onClick='PostMapPosition("+num+","+inx+")'><br>";
		break;
		}
	s+="<input type=button value='�L�����̎w��";
	if (BTB[inx].Writing=="") s+="(�w�肳��Ă��܂���)";else s+="(�w���)";
	s+="' onClick='WriteMapComment("+num+","+inx+")'><br>";
	if ((thistype=="�W���C���^�[�z��")||(thistype=="�W���Z��"))
		{
		BuildingNum=num;
		BuildingSeq=BTB[inx].Num;
		if (BTB[inx].Name!="")
			{
			if (TempXMLFile!=ApartXML(BTB[inx].Name))
				{
				TempXMLFile=ApartXML(BTB[inx].Name);
				ABuilding=ReadXMLFile(TempXMLFile,true);
				SetRefusesToBuilding(1,BTB,num,true);
				}
			}
		else ABuilding="";
		if (ABuilding=="")
			{
			s+="<input type=button value='�����C���[�W�̍쐬' onClick='EditRefuses_CreateBuilding(1,"+num+","+inx+")'>";
			}
		else{
			s+="<input type=button value='�����C���[�W�̈ʒu�w��";
			if ("top" in ABuilding.building[0]) s+="(�w���)";else s+="(�w�肳��Ă��܂���)";
			s+="' onClick='PlaceBuilding(1,0)'><br>";
			s+=CreateBuildingImage(num,0,1,0,"",0.5,0.5,1);
			}
		}

	s+=hr();
	if ("Add" in BTB[inx])
		{
		s+="<input type=button value='�o�^' onClick='EditRefuses_Exec("+num+","+inx+",0)'>";
		}
	else{
		s+="<input type=button value='�X�V' onClick='EditRefuses_Exec("+num+","+inx+",1)'>";
		s+="<input type=button value='�폜' onClick='DeleteRefuses("+num+","+inx+")'>";
		}
	s+="<input type=button value='�߂�' onClick='";
	Keys[11]="";
	if ("Add" in BTB[inx])
		{
		Keys[11]+="Cards["+num+"].RTB.splice("+inx+",1);";
		}
	if (RefuseExit=="")
		{
		Keys[11]+="Maint_Refuses("+num+")";
		}
	else{
		if (!(isNaN(RefuseExit)))	{Keys[11]+="MENU1PBig("+num+","+RefuseExit+")";}
		else Keys[11]+="ViewApart(\""+RefuseExit+"\")";
		}
	s+=Keys[11]+"'></form>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	}

function EditRefuses_CreateBuilding(Bobj,num,inx)
	{
	var BTB=Cards[num].RTB;
	Bobj=GetBobj(Bobj);
	StoreRefuses(num,inx);
	if (BTB[inx].Name=="")
		{
		alert("���O�����͂���Ă��܂���B");
		return;
		}
	Bobj=ReadXMLFile(SysFolder()+"building.xml",true);
	Bobj.building[0].id=BTB[inx].Name;
	WriteXMLFile(Bobj,ApartXML(BTB[inx].Name));
	TempXMLFile="";
	EditRefuses(num,inx);
	}

function ChangeRefuseBuilding(Bobj,inx)
	{
	var BTB=Cards[RRefuse].RTB;
	var i;
	var ABobj=GetBobj(Bobj);
	StoreRefuses(RRefuse,inx);
	if (Bobj==0)
		{
		i=parseInt(d$("ER_BUILDING").value,10);
		if (ABobj!="")
			{
			if (i in ABobj.building)
				{
				BTB[inx].Position="bld:"+ABobj.building[i].id+",0,0,0,0";
				}
			}
		}
	else{
		i=d$("ER_BUILDING").value;
		BTB[inx].Position="bld:"+i+",0,0,0,0";
		}
	EditRefuses(RRefuse,inx);
	}

function PickRefuseRoom(Bobj,num,seq,ist,ifl,iro)
	{
	var BTB=Cards[RRefuse].RTB;
	var ABobj=GetBobj(Bobj);
	EraseTempProperty(ABobj.building[num]);
	StoreRefuses(num,RRinx);
	var ref=ABobj.building[num].Temp.Refuse;
	BTB[ref].Position=SetBLDString(Bobj,num,seq,ist,ifl,iro);
	SetRefusesToBuilding(Bobj,BTB,RRefuse,false);
	ABobj.building[num].sequence[seq].stair[ist].floor[ifl].room[iro].Temp=ref;
	EditRefuses(RRefuse,ref);
	}

function ChangeRefuseNum(inx)
	{
	var BTB=Cards[RRefuse].RTB;
	var obj=d$("ER_SEQ");
	var a1=obj.value;
	BTB[inx].Num=a1;
	BTB[inx].Position="";
	BTB[inx].Writing="";
	EditRefuses(RRefuse,inx);
	}

function ChangeRefuseKBN1(mode,inx)
	{
	var BTB=Cards[RRefuse].RTB;
	var obj1=document.forms[0].elements[1];
	var obj2=document.forms[0].elements[2];
	var a1=obj1.selectedIndex;
	var a2=obj1.options[a1].text;
	var a3=obj2.selectedIndex;
	if ((a1==3)||(a1==4))	//	�W���C���^�[�z��or�W���Z��
		{
		BTB[inx].KBN2="�W���Z��(�S��)";
		BTB[inx].Date="";					//	�ԗ��J�n��
		if (mode==0)
			{
			BTB[inx].Position="";
			BTB[inx].Writing="";
			}
		}
	else{
		BTB[inx].Date="20111101";			//	���L�ǉ���
		BTB[inx].Position="";
		BTB[inx].Writing="";
		}
	BTB[inx].Servant="";				//	�g�p�Җ�
	BTB[inx].Confirm="";				//	�ԗ��I����
	BTB[inx].KBN1=a2;
	EditRefuses(RRefuse,inx);
	}

function ChangeRefuseKBN2(inx)
	{
	var BTB=Cards[RRefuse].RTB;
	var obj1=document.forms[0].elements[1];
	var obj2=document.forms[0].elements[2];
	var a1=obj2.selectedIndex;
	var a2=obj2.options[a1].text;
	var a3=obj1.selectedIndex;
	if ((a3==3)&&(a1!=2)) {obj2.selectedIndex=2;return;}
	BTB[inx].KBN2=a2;
	BTB[inx].Position="";
	BTB[inx].Writing="";
	EditRefuses(RRefuse,inx);
	}

function DeleteRefuses(num,inx)
	{
	var BTB=Cards[num].RTB;
	var s;
	s=confirm("���̓��L�����폜���܂��B��낵���ł����H");
	if (!s) return;
	if ((BTB[inx].KBN1=="�W���C���^�[�z��")||(BTB[inx].KBN1=="�W���Z��"))
		{
		RemoveCondominium(BTB[inx].Name);	//	���J�[�h�Ɋ܂܂�Ă��邻�̏Z�������
		if (fso.FileExists(ApartFile(BTB[inx].Name))) fso.DeleteFile(ApartFile(BTB[inx].Name));	//	���O�t�@�C���폜
		if (fso.FileExists(ApartXML(BTB[inx].Name))) fso.DeleteFile(ApartXML(BTB[inx].Name));	//	�w�l�k�t�@�C���폜
		}
	BTB.splice(inx,1);
	SaveConfig(num);
	LoadCard(num);
	if (RefuseExit=="")	Maint_Refuses(num);
				else	{
						if (!(isNaN(RefuseExit))) MENU1PBig(num,RefuseExit);
						else MENU5();
						}
	}

function StoreRefuses(num,inx)
	{
	var BTB=Cards[RRefuse].RTB;
	var thistype=BTB[inx].KBN1;
	var y,m,d;
	var today=new Date();
	BTB[inx].Num=d$("ER_SEQ").value;										//�n�}�ԍ�
	BTB[inx].Name=d$("ER_NAME").value.replace(/[#]/g, "��");				//���O
	BTB[inx].Person=d$("ER_PERSON").value.replace(/[#]/g, "��");			//����
	BTB[inx].Reason=d$("ER_REASON").value.replace(/[#]/g, "��");			//���R
	if ((thistype!="�W���C���^�[�z��")&&(thistype!="�W���Z��"))
		{
		y=d$("ER_DATEYY").value;
		m=d$("ER_DATEMM").value;
		d=d$("ER_DATEDD").value;
		if (m<10) m="0"+m;
		if (d<10) d="0"+d;
		BTB[inx].Date=y+""+m+""+d;
		BTB[inx].Servant=d$("ER_SERVANT").value.replace(/[#]/g, "��");	//	��d��
		BTB[inx].Confirm=d$("ER_CONFIRM").value.replace(/[#]/g, "��");	//	�m�F���
		y=d$("ERC_DATEYY").value;
		m=d$("ERC_DATEMM").value;
		d=d$("ERC_DATEDD").value;
		if (m<10) m="0"+m;
		if (d<10) d="0"+d;
		BTB[inx].LastConfirm=y+""+m+""+d;
		if (BTB[inx].Date>BTB[inx].LastConfirm) BTB[inx].LastConfirm=BTB[inx].Date;
		BTB[inx].Frequency=d$("ER_FREQUENCY").value;	//	�K��p�x
		BTB[inx].Cycle=d$("ER_CYCLE").value;			//	�T�C�N��
		}
	else{
		BTB[inx].Date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
		BTB[inx].Servant="";
		BTB[inx].Confirm="";
		BTB[inx].LastConfirm=0;
		BTB[inx].Frequency=0;
		BTB[inx].Cycle=0;
		}
	}
// ���L���̒ǉ��E�X�V�̎��s---------------------------------------------------------------
function EditRefuses_Exec(num,inx,addmode)
	{
	var BTB=Cards[num].RTB;
	var a1,a2,a3,a4,a5,rooms;
	StoreRefuses(num,inx);
	if (addmode==0)
		{
		if (BTB[inx].Name=="")
			{
			alert("���O�����͂���Ă��܂���B");
			return;
			}
		if (fso.FileExists(ApartFile(BTB[inx].Name)))
			{
			alert("�����̕��������łɑ��݂��܂��B");
			return;
			}
		}
	if ((BTB[inx].KBN1=="�W���C���^�[�z��")||(BTB[inx].KBN1=="�W���Z��"))
		{
		if (!fso.FileExists(ApartFile(BTB[inx].Name))) fso.CreateTextFile(ApartFile(BTB[inx].Name),true);
		if (ABuilding!="")
			{
			ABuilding.Type=0;
			if (BTB[inx].KBN1=="�W���C���^�[�z��") ABuilding.Type=1;
			if (BTB[inx].KBN1=="�W���Z��") ABuilding.Type=2;
			ABuilding.Num=num;
			ABuilding.Seq=BTB[inx].Num;
			WriteXMLFile(ABuilding,ApartXML(BTB[inx].Name));
//			AddCondominium(BTB[inx].Name);
			rooms=0;
			for(a1 in ABuilding.building[0].sequence)
				{
				for(a2 in ABuilding.building[0].sequence[a1].stair)
					{
					for(a3 in ABuilding.building[0].sequence[a1].stair[a2].floor)
						{
						rooms+=parseInt(ABuilding.building[0].sequence[a1].stair[a2].floor[a3].rooms,10);
						}
					}
				}
			BTB[inx].Person=rooms;
			}
		}
	if ("Add" in BTB[inx]) delete BTB[inx].Add;
	SaveConfig(num);
	LoadCard(num);
	if (RefuseExit=="") Maint_Refuses(num);
	else	{
			if (!(isNaN(RefuseExit))) MENU1PBig(num,RefuseExit);
				else	ViewApart(RefuseExit);
			}
	}

function WriteMapComment(num,inx)
	{
	var BTB=Cards[num].RTB;
	var s,found,file;
	var seq=BTB[inx].Num;
	var rx=new Array();
	var mfile;
	if (Cards[num].MapType==0) mfile=PNGFile(num,seq);
	else mfile=BlankPNG();
	Rvml=new Poly();
	StoreRefuses(num,inx);
	file=fso.FileExists(mfile);
	if (!file)
		{
		alert("�n�}�f�[�^���Ȃ��̂ŁA�R�����g�̋L���͂ł��܂���B");
		BTB[inx].Position="";
		BTB[inx].Writing="";
		return;
		}
	RDragObj=inx;
	RDComment="";

	var r=GetImageInfo(mfile);
	if (r.x>r.y)
		{
		alert("���̃T�C�Y�̒n�}�ɂ́A���L���̋L���͂ł��܂���B\n�n�}�f�[�^�ɒ��ڏ�������ł��������B");
		return;
		}

	if (BTB[inx].Writing!="")
		{
		s=BTB[inx].Writing+",,,,,,";
		rx=s.split(",");
		RDComment=rx[0];
		RDSize=parseInt(rx[1],10);
		RDragStartX=parseInt(rx[2],10);
		RDragStartY=parseInt(rx[3],10);
		oRDComment=RDComment;
		oRDSize=RDSize;
		if (rx[4]!="")
			{
			s=rx[4];
			while(1==1)
				{
				if (s.indexOf("&",0)==-1) break;
				s=s.replace("&",",");
				}
			Rvml.AddArrow(s,1,1,false);
			}
		}
	else{
		RDragStartX=-1;
		RDragStartY=0;
		RDSize=50;
		oRDComment="";
		oRDSize=RDSize;
		}
	RDComment=prompt("�n�}�ɏ������ރR�����g����͂��Ă��������B",RDComment);
	if (RDComment==null) return;
	RDComment=RDComment.trim();
	if (RDComment=="")
		{
		BTB[inx].Writing="";
		EditRefuses(num,inx);
		return;
		}
	RDComment=RDComment.replace(/[,]/g, "�C");
	RDComment=RDComment.replace(/[#]/g, "��");

	RDTitle=document.title;
	RDragging=false;
	ClearKey();
	ClearLayer("Stage");
	ClearLayer("Mask");
	ClearLayer("Terop");
	ClearLayer("Drag");
	SetOverflow("xy");

	document.title="�R�����g���������ޏꏊ���w�肵�Ă�������";
	Keys[11]="";

	//	1.�n�}���C���[
	s="<img src='"+mfile+"' style='position:absolute;z-index:0;top:0px;left:0px;z-index:0;'>";
	if (Building!="")
		{
		for(i in Building.building)
			{
			rmap=parseInt(Building.building[i].map,10);
			if (rmap!=seq)	continue;
			s+=CreateBuildingImage(num,0,0,i,"",1,1,0);
			}
		}
	WriteLayer("Stage",s);

	//	2.�N���b�N���C���[
	s="<img src='"+BlankGIF()+"' width="+r.x+" height="+r.y;
	s+=" style='cursor:default;position:absolute;top:0px;left:0px;z-index:5;'";
	s+=" onmousedown='WriteMap_mousedown();return false;' onmousemove='WriteMap_mousemove()' onmouseup='WriteMap_mouseup();return false;' onmousewheel='WriteMap_Wheel()'>";
	WriteLayer("Drag",s);

	//	3.���L��񃌃C���[
	s="<div id='REFLAYER' style='position:absolute;top:0px;left:0px;z-index:3;width:"+r.x+"px;height:"+r.y+";'>";
	s+=Rvml.Draw(false,true);
	s+="</div>";
	WriteLayer("Mask",s);

	if (RDragStartX==-1)
		{
		wx=0;wy=0;
		}
	else{
		wx=RDragStartX-(document.documentElement.clientWidth/2);
		wy=RDragStartY-(document.documentElement.clientHeight/2);
		if (wx<0) wx=0;
		if (wy<0) wy=0;
		}
	window.scrollTo(wx,wy);
	WriteMap_Draw();

	s="���N���b�N�ŃR�����g���������ވʒu������<br>�E�N���b�N�̃h���b�O�Ŗ��쐬<br>Shift+�z�C�[���ŕ����T�C�Y�ύX<br>";
	s+=AddKeys(1,"����","EndofWriteMap(true)");
	s+=AddKeys(2,"���̏���","EraseArrow()");
	s+=AddKeys(0,"�߂�","EndofWriteMap(false)");
	FloatingMenu.Title="���L���̋L��";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",wx,wy,10,240,170);
	RscrollX=wx;RscrollY=wy;
	window.onscroll=WriteMap_Scroll;
	}

function EraseArrow()
	{
	if (Rvml.objects==1)
		{
		Rvml.objects--;
		RDragging=false;
		REFLAYER.innerHTML=Rvml.Draw(false,true);
		}
	}

function WriteMap_Scroll()
	{
	var x=FloatingMenu.x-RscrollX;
	var y=FloatingMenu.y-RscrollY;
	var wx=x+document.documentElement.scrollLeft;
	var wy=y+document.documentElement.scrollTop;
	FloatingMenu.moveTo(wx,wy);
	RscrollX=document.documentElement.scrollLeft;
	RscrollY=document.documentElement.scrollTop;
	}

function WriteMap_mouseup()
	{
	var btn=event.button;
	var x=event.clientX+document.documentElement.scrollLeft-8;
	var y=event.clientY+document.documentElement.scrollTop-8;
	if (btn==0)	
		{
		RDragStartX=x;
		RDragStartY=y;
		oRDSize=RDSize;
		oRDComment=RDComment;
		WriteMap_Draw();
		return;
		}
	if (btn==2)
		{
		RDragging=false;
		}
	}

function WriteMap_mousedown()
	{
	var i;
	var btn=event.button;	// 0=left 4=center 2=right
	if (btn!=2) return;
	RDragging=true;
	var s;
	var x=event.clientX+document.documentElement.scrollLeft-8;
	var y=event.clientY+document.documentElement.scrollTop-8;
	s=x+","+y+" "+x+","+y;
	if (Rvml.objects==0)
		{
		Rvml.AddArrow(s,1,1,false);
		return;
		}
	Rvml.objects--;
	REFLAYER.innerHTML=Rvml.Draw(false,true);
	Rvml.AddArrow(s,1,1,false);
	}

function WriteMap_mousemove()
	{
	var i,j,x,y,s;
	x=event.clientX+document.documentElement.scrollLeft-8;
	y=event.clientY+document.documentElement.scrollTop-8;
	RDragEndX=x;
	RDragEndY=y;
	if (Rvml.objects==0)
		{
		WriteMap_Draw();
		return;
		}
	if (RDragging)
		{
		Rvml.obj[0].x[1]=x;
		Rvml.obj[0].y[1]=y;
		REFLAYER.innerHTML=Rvml.Draw(false,true);
		}
	WriteMap_Draw();
	}

function WriteMap_Wheel()	//�}�E�X�z�C�[��
	{
	var a;
	if (!ShiftKey) return;
	a=event.wheelDelta;
	if (a==120)
		{
		RDSize+=8;
		}
	if (a==-120)
		{
		RDSize-=8;
		if (RDSize<8) RDSize=8;
		}
	WriteMap_Draw();
	}

function WriteMap_DecidePosition()
	{
	var BTB=Cards[RRefuse].RTB;
	RDragEndX=document.documentElement.scrollLeft+event.clientX-8;
	RDragEndY=document.documentElement.scrollTop+event.clientY-8;
	BTB[RDragObj].Writing=RDComment+","+RDSize+","+RDragEndX+","+RDragEndY;
	EndofPostMap();
	}

function WriteMap_Draw()
	{
	var s,ox,oy;
	var x=RDragEndX;
	var y=RDragEndY;
	ClearLayer("Terop");
	s="<div style='position:absolute;left:"+x+"px;top:"+y+"px;z-index:3;white-space:nowrap;font-size:"+RDSize+"px;color:999999;'>";
	s+=RDComment+"</div>";
	if (RDragStartX!=-1)
		{
		ox=RDragStartX;oy=RDragStartY;
		s+="<div style='position:absolute;left:"+ox+"px;top:"+oy+"px;z-index:4;white-space:nowrap;font-size:"+oRDSize+"px;color:#0000ff;'>";
		s+=oRDComment+"</div>";
		}
	WriteLayer("Terop",s);
	}

function EndofWriteMap(mode)
	{
	var BTB=Cards[RRefuse].RTB;
	var cmd,wx,wy;
	var s,i;
	if ((mode)&&(RDragStartX==-1))
		{
		alert("�L�����̈ʒu�����肳��Ă��܂���B");
		return;
		}
	window.onscroll="";
	document.title=RDTitle;
	FloatingMenu.Close();
	ClearLayer("Mask");
	ClearLayer("Drag");
	ClearLayer("Terop");
	window.scrollTo(0,0);
	if (mode)
		{
		s=RDComment+","+RDSize+","+RDragStartX+","+RDragStartY;
		if (Rvml.objects!=0)
			{
			s+=","+Rvml.obj[0].x[0]+"&"+Rvml.obj[0].y[0]+" ";
			s+=Rvml.obj[0].x[1]+"&"+Rvml.obj[0].y[1];
			}
		BTB[RDragObj].Writing=s;
		}
	EditRefuses(RRefuse,RDragObj);
	}

// ���L���̃|���S���I��-------------------------------------------------------------
function PostMapPosition(num,inx)
	{
	var BTB=Cards[num].RTB;
	var s,found,file,r;
	var seq=BTB[inx].Num;
	var rx=new Array();
	RDTitle=document.title;
	StoreRefuses(num,inx);
	Rvml=new Poly();
	file=fso.FileExists(PNGFile(num,seq));

	if (!file)
		{
		alert("�n�}�f�[�^���Ȃ��̂ŁA�ꏊ�w��͂ł��܂���B");
		BTB[inx].Position="";
		BTB[inx].Writing="";
		return;
		}

	RDragObj=inx;
	r=GetImageInfo(PNGFile(num,seq));

	if (r.x>r.y)
		{
		alert("���̃T�C�Y�̒n�}�ɂ́A���L���̋L���͂ł��܂���B\n�n�}�f�[�^�ɒ��ڏ�������ł��������B");
		EndofPostMap(false);
		return;
		}
	if (BTB[inx].Position!="")
		{
		Rvml.AddObject(BTB[inx].Position,"","",1,1,"");
		}
	ClearKey();
	ClearLayer("Stage");	//�@�n�}���C���[
	ClearLayer("Mask");		//	���L���C���[
	ClearLayer("Drag");		//	�}�E�X���샌�C���[

	document.title="���L���̏ꏊ���N���b�N���đI�����Ă��������B";
	Keys[11]="";
	Rvml.mapsize=1;
	Rvml.width=r.x;
	Rvml.height=r.y;
	
	//	1.�n�}���C���[
	s="<img src='"+PNGFile(num,seq)+"' style='position:absolute;z-index:0;top:0px;left:0px;'>";
	if (Building!="")
		{
		for(i in Building.building)
			{
			rmap=parseInt(Building.building[i].map,10);
			if (rmap!=seq)	continue;
			s+=CreateBuildingImage(num,0,0,i,"",1,1,0);
			}
		}
	WriteLayer("Stage",s);
	SetOverflow("xy");

	//	2.�N���b�N���C���[
	s="<img src='"+BlankGIF()+"' width="+r.x+" height="+r.y;
	s+=" style='cursor:default;position:absolute;top:0px;left:0px;z-index:5;'";
	s+=" onmousedown='PostMap_mousedown()' onmousemove='PostMap_mousemove()' onmouseup='PostMap_mouseup()'>";
	WriteLayer("Drag",s);

	//	3.���L��񃌃C���[
	s="<div id='REFLAYER' style='position:absolute;top:0px;left:0px;z-index:3;width:"+r.x+"px;height:"+r.y+";'>";
	s+=Rvml.Draw(false,true);
	s+="</div>";
	WriteLayer("Mask",s);

	if (Rvml.objects==0)
		{
		window.scrollTo(0,0);
		wx=0;wy=0;
		}
	else{
		wx=(min(Rvml.obj[0].x)+max(Rvml.obj[0].x))/2-(document.documentElement.clientWidth/2);
		wy=(min(Rvml.obj[0].y)+max(Rvml.obj[0].y))/2-(document.documentElement.clientHeight/2);
		if (wx<0) wx=0;
		if (wy<0) wy=0;
		window.scrollTo(wx,wy);
		}

	s="���N���b�N�Ő}�`�쐬<br>�E�N���b�N�Œ��f<br>";
	s+=AddKeys(1,"�m��","EndofPostMap(true)");
	s+=AddKeys(2,"�}�`�̏���","EraseObj()");
	s+=AddKeys(0,"�߂�","EndofPostMap(false)");
	FloatingMenu.Title="���L���̋L��";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",wx,wy,10,240,150);
	RscrollX=wx;RscrollY=wy;
	window.onscroll=WriteMap_Scroll;
	}

function EraseObj()
	{
	if (Rvml.objects==1)
		{
		Rvml.objects--;
		Rvml.isDrawing=false;
		REFLAYER.innerHTML=Rvml.Draw(false,true);
		}
	}

function EndofPostMap(mode)
	{
	var BTB=Cards[RRefuse].RTB;
	var cmd,wx,wy;
	var s,i;
	if (mode)
		{
		if (!Rvml.Closed())
			{
			alert("�L�����̈ʒu�����肳��Ă��܂���B");
			return;
			}
		}
	document.title=RDTitle;
	window.onscroll="";
	FloatingMenu.Close();
	ClearLayer("Mask");
	ClearLayer("Drag");
	if (mode)
		{
		if (Rvml.objects==0)
			{
			s="";
			}
		else{
			s="vml:";
			for(i=0;i<Rvml.obj[0].points;i++)
				{
				if (i>0) s+=" ";
				s+=Rvml.obj[0].x[i]+","+Rvml.obj[0].y[i];
				}
			}
		BTB[RDragObj].Position=s;
		}
	EditRefuses(RRefuse,RDragObj);
	}

function PostMap_mousedown()
	{
	var i;
	var btn=event.button;	// 0=left 4=center 2=right
	if (btn!=0) return;
	var s;
	var x=event.clientX+document.documentElement.scrollLeft-8;
	var y=event.clientY+document.documentElement.scrollTop-8;
	if (Rvml.objects==0)
		{
		Rvml.AddObject();
		return;
		}
	if (!Rvml.Closed()) return;
	Rvml.objects--;
	Rvml.AddObject();
	REFLAYER.innerHTML=Rvml.Draw(false,true);
	}

function PostMap_mousemove()
	{
	if (Rvml.objects==0) return;
	if (Rvml.Closed()) return;
	var i,j,x,y,s;
	var base;
	x=event.clientX+document.documentElement.scrollLeft-8;
	y=event.clientY+document.documentElement.scrollTop-8;
	Rvml.DeletePoint();
	Rvml.AddPoint(x,y);
	REFLAYER.innerHTML=Rvml.Draw(false,true);
	}

function PostMap_mouseup()
	{
	var i,j,x,y;
	var absx,absy;
	var btn=event.button;	// 0=left 4=center 2=right

	if (btn==2)	//	�E�N���b�N
		{
		if (Rvml.objects==0)
			{
			return;
			}
		if (Rvml.Closed())
			{
			return;
			}
		Rvml.objects--;
		Rvml.AddObject();
		REFLAYER.innerHTML=Rvml.Draw(false,true);
		return;
		}
	if (btn!=0) return;

	x=event.clientX+document.documentElement.scrollLeft-8;
	y=event.clientY+document.documentElement.scrollTop-8;

	if (!Rvml.isDrawing)		//	����
		{
		Rvml.AddPoint(x,y);
		Rvml.AddPoint(x,y);
		return;
		}

	if (Rvml.Finished(x,y))
		{
		Rvml.Finish();
		REFLAYER.innerHTML=Rvml.Draw(false,true);
		return;
		}
	Rvml.AddPoint(x,y);
	}
//-----------------------------------------------------------
// ���ۂ���v�m�F���ɕϊ�����i�Ԋu���Q�N�j
//-----------------------------------------------------------
function CheckRefusesStatus(num,seq,BTB)
	{
	var i,j,d,tp;
	var s2,s3;
	var t=clone(BTB);

	//	����̊J�n�����擾
	var obj,l,nst;
	obj=LoadLog(num);
	l=obj.History.length-1;
	if (l<=0) return t;
	else nst=obj.Latest.Rent+"";

	for(i=0;i<t.length;i++)
		{
		if (t[i].Num!=seq) continue;
		if (t[i].KBN1!="����") continue;
		//	�Ԋu��������ꍇ
		if ("Frequency" in t[i])
			{
			tp=parseInt(t[i].Frequency,10);
			if (tp!=0)
				{
				if (parseInt(t[i].Cycle,10)>=tp)
					{
					t[i].KBN1="�Ԋu";
					continue;
					}
				}
			}
		if ("LastConfirm" in t[i]) d=t[i].LastConfirm+"";else d=t[i].Date+"";
		s2=parseInt(d.substring(0,4),10)*12+parseInt(d.substring(4,6),10);
		s3=parseInt(nst.substring(0,4),10)*12+parseInt(nst.substring(4,6),10);
		//�@�Q�N���o�߂��Ă���Ίm�F
		if ((s3-s2)>=24) t[i].KBN1="�m�F";
		}
	return t;
	}
