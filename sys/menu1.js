//------------------------------------------------------------------------------------
var Sortkey=new Array();
var Menu1_Filter_status="";
var Menu1_Filter_kubun="";
var Menu1_Filter_kubuncount=0;
var Menu1_Sortkey="���ԍ�";
var FLD=new Array();
var kbn=new Array();
var sts=new Array();
var FLDFocus=0;
var FLDATTR=new Array();
var UPAD=new Array();
var UPAD2=new Array();
var MapZoom;
var MapSize;
var nums="�@�A�B�C�D�E�F�G�H�I�J�K�L�M�N�O�P�Q�R�S";
var PickFrom;
var Menu1_AutoEndSpan;
var Placenum,Placeseq,Placename;
//------------------------------------------------------------------------------------
function MENU1()
	{
	SetOverflow("y");
	var s;
	var logline=new Array();
	var now=new Date();
	var today=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate();
	var kubun;
	PickFrom="List";
	ClearKey();
	ClearLayer("Stage");
	s="<form>"+SysImage("cwministry.png")+"<br>";
	s+="<span class=size3>���C�����j���[�����ꗗ</span><br>"+hr();
	WriteLayer("Stage",s);
	AddKey("Stage",1,"�V�������̒ǉ�","MENU1A()");
	AddKey("Stage",2,"�S�̐}�̎Q��","All(false)");
	AddKey("Stage",0,"���C�����j���[�֖߂�","MainMenu()");
	Keys[11]="MainMenu()";
	for(i in kbn) delete kbn[i];
	kbn["���ׂ�"]=0;
	kubuncount=1;
	Menu1_Filter_kubuncount=0;
	
	//	SQlite�e�[�u���̓Ǎ�--------------------------------------------------------------
	var cwhere="congnum="+congnum;
	var corder="num";
	var clast;
	var cobj;
	if (Menu1_Filter_status=="�g�p�\")	cwhere+=" and inuse='false'";
	if (Menu1_Filter_status=="���g�p")		cwhere+=" and inuse='false'";
	if (Menu1_Filter_status=="�g�p��")		cwhere+=" and inuse='true'";
	if (Menu1_Filter_kubun!="")				cwhere+=" and kubun='"+Menu1_Filter_kubun+"'";
	var ctbl=SQ_Read("PublicList",cwhere,"");

	//	�g�p�󋵂�z��I�u�W�F�N�g�ɒǉ�����---------------------------------------------
	for(i=0;i<ctbl.length;i++)
		{
		cobj=ctbl[i];
		num=cobj.num;
		kubun=cobj.kubun;
		if (!(kubun in kbn))
			{
			Menu1_Filter_kubuncount++;
			kbn[kubun]=Menu1_Filter_kubuncount;
			}

		if (cobj.inuse=="true")
			{
			cobj.Lastuse=cobj.startday;
			cobj.Blank=CalcDays(cobj.startday,"");					//	�g�p����
			cobj.Avail="false";										//	�g�p�\���m��
			cobj.Status="�g�p��("+cobj.userid+"�F"+cobj.startday.substring(4,6)+"/"+cobj.startday.substring(6,8)+"�`�j";
			}
		else{
			cobj.Lastuse=cobj.endday;
			cobj.Blank=CalcDays(cobj.endday,"");					//	�g�p����
			if (isCampeign(today))			//	�L�����y�[����
				{
				if (cobj.Blank<ConfigAll.BlankCampeign) cobj.Avail="disable";else cobj.Avail="true";
				}
			else{
				if (isAfterCampeign(today))	//	����߰݊��Ԍ�30��
					{
					if (cobj.Blank<ConfigAll.BlankAfterCampeign) cobj.Avail="disable";else cobj.Avail="true";
					}
				else{						//	�ʏ�̊���
					if ((cobj.Blank<ConfigAll.BlankMin)&&(cobj.Blank!=-1)) cobj.Avail="disable";else cobj.Avail="true";
					}
				}
			cobj.Status="���g�p("+cobj.Blank+"���O)";
			if (isBeforeCampeign(today))
				{
				cobj.Status="����߰ݏ�������("+cobj.Blank+"���O)";
				cobj.Avail="false";
				}
			}

		//	�t�B���^�[�ɂ��\������
		if ((Menu1_Filter_status=="�g�p�\")&&(cobj.Avail!="true"))
			{
			ctbl.splice(i,1);
			i--;
			}
		}
	//	�\�[�g�L�[-----------------------------------------------------------------
	s="<br>���я��F<select size=1 onChange='MENU1_Sort_Change(this.selectedIndex)'>";
	if (Menu1_Sortkey=="�敪��") s+="<option selected>";else s+="<option>";
	s+="�敪��</option>";
	if (Menu1_Sortkey=="���ԍ�") s+="<option selected>";else s+="<option>";
	s+="���ԍ�</option>";
	if (Menu1_Sortkey=="���g�p������") s+="<option selected>";else s+="<option>";
	s+="���g�p������</option>";
	if (Menu1_Sortkey=="�g�p�J�n����") s+="<option selected>";else s+="<option>";
	s+="�g�p�J�n����</option>";
	s+="</select><br>";
	//	�ꗗ�\---------------------------------------------------------------------
	s+="<table border=1 cellpadding=5 cellspacing=0><tr class=HEAD>";
	s+="<td align=center class=size2 width=50>���ԍ�</td>";
	s+="<td align=center class=size2 width=200>��於</td>";
	s+="<td align=center class=size2 width=100>�敪<br>";
	s+="<select size=1 onChange='MENU1_kubun_Change(this.selectedIndex)'>";
	for(i in kbn)
		{
		if (i=="���ׂ�")
			{
			if (Menu1_Filter_kubun=="") s+="<option selected>";else s+="<option>";
			s+="���ׂ�</option>";
			}
		else{
			if (Menu1_Filter_kubun==i) s+="<option selected>";else s+="<option>";
			s+=i+"</option>";
			}
		}
	s+="</select></td>";

	s+="<td align=center class=size2 width=50>������</td>";
	s+="<td align=center class=size2 width=50>���L����</td>";
	s+="<td align=center class=size2 width=100>�W���Z��</td>";
	s+="<td align=center class=size2 width=150>���݂̏��<br>";
	s+="<select size=1 onChange='MENU1_status_Change(this.selectedIndex)'>";
	if (Menu1_Filter_status=="") s+="<option selected>";else s+="<option>";
	s+="���ׂ�</option>";
	if (Menu1_Filter_status=="�g�p�\") s+="<option selected>";else s+="<option>";
	s+="�g�p�\�̂�</option>";
	if (Menu1_Filter_status=="���g�p") s+="<option selected>";else s+="<option>";
	s+="���g�p�̂�</option>";
	if (Menu1_Filter_status=="�g�p��") s+="<option selected>";else s+="<option>";
	s+="�g�p���̂�</oprion>";
	s+="</select></td>";
	s+="</tr>";
	//�\�[�g�L�[�̍쐬------------------------------------------------------------ 
	maxsort=0;
	SumMaps=0;SumRefuses=0;SumUsing=0;SumFree=0;SumTotal=0;SumBuildings=0;SumHouses=0;
	for(i in Sortkey) delete Sortkey[i];
	for(i in ctbl)
		{
		num=ctbl[i].num;
		if (ctbl[i].Status.indexOf("�g�p��",0)!=-1) SumUsing++;
		if (ctbl[i].Status.indexOf("���g�p",0)==0) SumFree++;
		SumBuildings+=parseInt(ctbl[i].buildings,10);
		SumHouses+=parseInt(ctbl[i].persons,10);
		SumTotal++;
		SumMaps+=parseInt(ctbl[i].maps,10);
		SumRefuses+=parseInt(ctbl[i].refuses,10);
		Sortkey[maxsort]=new Object();
		Sortkey[maxsort].num=num;
		Sortkey[maxsort].i=i;
		Sortkey[maxsort].lastuse=ctbl[i].Lastuse;
		Sortkey[maxsort].kubun=ctbl[i].kubun;
		maxsort++;
		}
	Sortkey.sort(cmp_sort);
	s+="<tr><td colspan=3 bgcolor='#009900' style='font-size:12px;color:#ffffff;font-weight:bold;'>";
	s+="�\����("+SumTotal+")----�g�p��("+SumUsing+")/���g�p("+SumFree+")</td>";
	s+="<td bgcolor='#009900' align=right style='font-size:12px;color:#ffffff;font-weight:bold;'>"+SumMaps+"</td>";
	s+="<td bgcolor='#009900' align=right style='font-size:12px;color:#ffffff;font-weight:bold;'>"+SumRefuses+"</td>";
	s+="<td bgcolor='#009900' nowrap align=right style='font-size:12px;color:#ffffff;font-weight:bold;'>"+SumBuildings+"��("+SumHouses+"����)</td>";
	s+="<td bgcolor='#009900' align=right style='font-size:11px;color:#ffffff;font-weight:bold;'>";
	s+="�@</td></tr>";
	for(j=0;j<maxsort;j++)
		{
		i=Sortkey[j].i;
		num=ctbl[i].num;
		s+="<tr>";
		s+="<td style='cursor:pointer' title='�ڍ׏����C�����܂�' onClick='MENU1B("+num+")' align=right>"+num+"</td>";				//	���ԍ�
		s+="<td style='cursor:pointer' title='�n�}�̈ꗗ�\�����s���܂�' onClick='MENU1P("+num+")'>"+ctbl[i].name+"</td>";							//	��於
		s+="<td style='cursor:pointer' title='�n�}�̈ꗗ�\�����s���܂�' onClick='MENU1P("+num+")'>"+ctbl[i].kubun+"</td>";						//	�敪��
		s+="<td style='cursor:pointer' title='�n�}�̈ꗗ�\�����s���܂�' onClick='MENU1P("+num+")' align=right>"+ctbl[i].maps+"</td>";			//	������
		s+="<td align=right style='cursor:pointer' title='���L�������C�����܂�' onClick='Maint_Refuses("+num+")'>"+ctbl[i].refuses+"</td>";		//	���L����
		s+="<td nowrap style='cursor:pointer;font-size:12px;' title='�n�}�̈ꗗ�\�����s���܂�' onClick='MENU1P("+num+")'";
		if (ctbl[i].buildings!=0)
			{
			s+=" align=right>";
			s+=ctbl[i].buildings+"��("+ctbl[i].persons+"����)";
			}
		else s+=" align=center>-";
		s+="</td>";

		//	�E�[�Z���̕\��
		if (ctbl[i].Status.indexOf("�g�p��",0)!=-1)
			{
			s+="<td style='cursor:pointer;white-space:nowrap;' title='�g�p�I�����̓��͂��s���܂�' onClick='MENU1E("+num+")'";
			s+=" bgcolor='#ffff00'";
			}
		else{
			if (ctbl[i].Avail=="true")
				{
				s+="<td style='cursor:pointer;white-space:nowrap;' title='�V�K�g�p�J�n�̓��͂��s���܂�' onClick='MENU1E("+num+")'";
				s+=" bgcolor='#aaffff'";
				}
			else{
				s+="<td style='white-space:nowrap;'";
				s+=" bgcolor='#ffaaaa'";
				}
			}
		s+=">"+ctbl[i].Status+"</td>";	//	�g�p��
		s+="</tr>";
		}
	s+="</table></form>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	document.body.focus();
	}
function cmp_sort(a, b)
	{
	if (Menu1_Sortkey=="�敪��")
		{
		if (a.kubun<b.kubun) return -1;
		if (a.kubun>b.kubun) return 1;
		return a.num-b.num;
		}
	if (Menu1_Sortkey=="���ԍ�")		return a.num-b.num;
	if (Menu1_Sortkey=="���g�p������")	return a.lastuse-b.lastuse;
	if (Menu1_Sortkey=="�g�p�J�n����")	return b.lastuse-a.lastuse;
	return 0;
	}
 
// ---------------------------------------------------------------------------------------
function MENU1_Sort_Change(num)
	{
	if (num==0) Menu1_Sortkey="�敪��";
	if (num==1) Menu1_Sortkey="���ԍ�";
	if (num==2) Menu1_Sortkey="���g�p������";
	if (num==3) Menu1_Sortkey="�g�p�J�n����";
	MENU1();
	}
function MENU1_status_Change(num)
	{
	if (num==0) Menu1_Filter_status="";
	if (num==1) Menu1_Filter_status="�g�p�\";
	if (num==2) Menu1_Filter_status="���g�p";
	if (num==3) Menu1_Filter_status="�g�p��";
	MENU1();
	}
function MENU1_kubun_Change(num)
	{
	var i;
	if (num==0) Menu1_Filter_kubun="";
	else{
		for (i in kbn)
			{
			if (kbn[i]==num) break;
			}
		Menu1_Filter_kubun=i;
		}
	MENU1();
	}
//------------------------------------------------------------------------------------
//	���̒ǉ�
//------------------------------------------------------------------------------------
function Field(num,size,imemode,attr,id1,id2)	//	attr=0-2(0:�Ȃ� 1:���� 2:���t)
	{
	var s;
	s="<input type=text size="+size+" style='ime-mode:";
	if (imemode) s+="active;'";else s+="disabled;'";
	if (id1!=undefined) s+=" "+id1;
	if (id2!=undefined) s+=" "+id2;
	s+=" onfocus='FLDFocus="+num+"'>";
	FLDATTR[num]=attr;
	return s;
	}

function MENU1A()
	{
	var s,ymd;
	ClearKey();
	ClearLayer("Stage");
	Keys[11]="MENU1()";
	s="<div class=size5>�V�������̒ǉ�</div>"+hr();
	s+="<div class=size3><form onsubmit='MENU1A_Exec();return false;'>";
	s+="���ԍ��F"+Field(0,8,false,0)+"(1�`)<br>";
	s+="��於�́F"+Field(1,40,true,0)+"<br>";
	s+="���敪�F"+Field(2,20,true,0)+"(�Q�ꖼ�Ȃ�)<br>";
	s+="�������F"+Field(3,8,false,0)+"(1�`)<br>";
	s+="�K��̏I�������F"+Field(4,8,false,0)+"(�ȗ�����ƑS�̂̊���l�Ɠ���)<br>";
	s+="���n�}�̎�ށF<select size=1>";
	s+="<option>�ʏ�i�Z��n�}�j</option>";
	s+="<option>�L��i�S�̐}�j</option>";
	s+="</select><br>";
	s+="���t�L�����F<select size=1>";
	s+="<option>�Ȃ�</option>";
	s+="<option>�p�r��</option>";
	s+="<option>�񐔕�</option>";
	s+="</select><br>";
	s+=hr()+"<input type=button value='�o�^' onClick='MENU1A_Exec()'>";
	s+="<input type=button value='�߂�' onClick='MENU1()'></form>";
	WriteLayer("Stage",s);
	Focus(0);
	window.scrollTo(0,0);
	}

function MENU1A_Exec()
	{
	var s,num,name,kubun,count,f,obj,spanDays,maptype,headertype;
	num=document.forms[0].elements[0].value;
	if ((num=="")||(isNaN(num))||(num<1))
		{
		alert("���ԍ�������������܂���i�P�ȏ�̐������w�肵�Ă��������j");
		return;
		}
	num=parseInt(num,10);
	if (fso.FolderExists(NumFolder(num)))
		{
		alert("���̋��ԍ��͂��łɑ��݂��܂��B�ǉ��ł��܂���B");
		return;
		}

	name=document.forms[0].elements[1].value;
	name=name.trim();
	if ((name=="")||(name==null))
		{
		alert("��於�����͂���Ă��܂���B");
		return;
		}

	kubun=document.forms[0].elements[2].value;
	kubun=kubun.trim();

	count=document.forms[0].elements[3].value;
	if ((count=="")||(isNaN(count))||(count<1))
		{
		alert("������������������܂���i�P�ȏ�̐������w�肵�Ă��������j");
		return;
		}
	spanDays=document.forms[0].elements[4].value+"";
	spanDays=spanDays.trim();
	if (spanDays!="")
		{
		if (isNaN(spanDays))
			{
			alert("�K��̏I������������������܂���i�󗓂ɂ��邩�A�������w�肵�Ă��������j");
			return;
			}
		spanDays=parseInt(spanDays,10);
		if (spanDays<=0)
			{
			alert("�K��̏I������������������܂���i�P��菬�����l�ɂ��邱�Ƃ͂ł��܂���j");
			return;
			}
		}
	else{
		spanDays=0;
		}
	maptype=document.forms[0].elements[5].selectedIndex;
	headertype=document.forms[0].elements[5].selectedIndex;

	fso.CreateFolder(NumFolder(num));
	Cards[num]=new Object();
	Cards[num].name=name;
	Cards[num].count=count;
	Cards[num].kubun=kubun;
	Cards[num].RTB=new Array();
	if (spanDays!=0)	Cards[num].spanDays=spanDays;
	Cards[num].MapType=maptype;
	Cards[num].HeaderType=headertype;
	SaveConfig(num);
	obj=LoadLog(num);
	SaveLog(obj,num);
	AllMaps=new Array();
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1();
	}
//------------------------------------------------------------------------------------
//	���̏C��
//------------------------------------------------------------------------------------
function MENU1B(num)
	{
	var s,ymd,i,sc,cm;
	ClearKey();
	ClearLayer("Stage");
	Keys[11]="MENU1()";
	s="<div class=size5>��懂"+num+"�̏ڍ׏��F</div>"+hr();
	s+="<div class=size3><form onsubmit='MENU1B_Exec("+num+");return false;'>";
	s+="��於�́F"+Field(0,40,true,0)+"<br>";
	s+="���敪�F"+Field(1,20,true,0)+"(�Q�ꖼ�Ȃ�)<br>";
	s+="�������F"+Field(2,8,false,0)+"(1�`)<br>";
	s+="�K��̏I�������F"+Field(3,8,false,0)+"(�ȗ�����ƑS�̂̊���l�Ɠ���)<br>";
	s+="���n�}�̎�ށF<select size=1>";
	s+="<option>�ʏ�i�Z��n�}�j</option>";
	s+="<option>�L��i�S�̐}�j</option>";
	s+="</select><br>";
	s+="���t�L�����F<select size=1>";
	s+="<option>�Ȃ�</option>";
	s+="<option>�p�r��</option>";
	s+="<option>�񐔕�</option>";
	s+="</select><br>"+hr();
	if (Cards[num].Comments.length>0)
		{
		s+="<table border=1 cellpadding=0 cellspacing=0>";
		for(i=0;i<Cards[num].Comments.length;i++)
			{
			cm=Cards[num].Comments[i];
			cm.Top=parseInt(cm.Top,10);
			cm.Left=parseInt(cm.Left,10);
			cm.Size=parseInt(cm.Size,10);
			while(1==1)
				{
				if (cm.Text.indexOf("@br@",0)==-1) break;
				cm.Text=cm.Text.replace("@br@","\r\n");
				}
			s+="<tr><td><textarea name='CM"+i+"' cols=80 rows=4>"+cm.Text+"</textarea>";
			s+="</td>";
			s+="<td><input type=button style='width:120px;' value='�ʒu�w��(";
			if (cm.Top==-1) s+="���ݒ�";else s+="�ݒ�ς�";
			s+=")' onclick='PlaceComment("+num+","+i+")'><br>";
			s+="<input type=button style='width:120px;' value='�R�����g�폜' onclick='RemoveComment("+num+","+i+")'></td>";
			s+="</tr>";
			}
		s+="</table>";
		}
	s+="<input type=button value='�R�����g�ǉ�' onClick='AddComment("+num+")'><br>"+hr();
	s+="<input type=button value='�X�V' onClick='MENU1B_Exec("+num+")'>";
	s+="<input type=button value='�n�}�ꗗ��' onClick='MENU1P("+num+")'>";
	s+="<input type=button value='�g�p�󋵓��͂�' onClick='MENU1E("+num+")'>";
	s+="<input type=button value='���̋����폜����' onClick='MENU1Del("+num+")'><br>";
	s+="<input type=button value='�߂�' onClick='LoadCard("+num+");MENU1()'></form>";
	WriteLayer("Stage",s);
	document.forms[0].elements[0].value=Cards[num].name;
	document.forms[0].elements[1].value=Cards[num].kubun;
	document.forms[0].elements[2].value=Cards[num].count;
	if ("spanDays" in Cards[num])
		{
		if (Cards[num].spanDays!=0) document.forms[0].elements[3].value=Cards[num].spanDays;
		}
	document.forms[0].elements[4].selectedIndex=Cards[num].MapType;
	document.forms[0].elements[5].selectedIndex=Cards[num].HeaderType;
	Focus(0);
	window.scrollTo(0,0);
	}

function MENU1B_Store(num)
	{
	var i,s;
	var cd=Cards[num];
	cd.name=document.forms[0].elements[0].value;
	cd.kubun=document.forms[0].elements[1].value;
	cd.count=document.forms[0].elements[2].value;
	cd.spanDays=document.forms[0].elements[3].value;
	cd.MapType=document.forms[0].elements[4].selectedIndex;
	cd.HeaderType=document.forms[0].elements[5].selectedIndex;
	for(i=0;i<Cards[num].Comments.length;i++)
		{
		s=document.forms[0].elements["CM"+i].value;
		while(1==1)
			{
			if (s.indexOf("\r\n",0)==-1) break;
			s=s.replace("\r\n","@br@");
			}
		cd.Comments[i].Text=s;
		}
	}

function MENU1B_Exec(num)
	{
	var s,name,kubun,count,f,spanDays,maptype,headertype;
	MENU1B_Store(num);
	cd=Cards[num];
	cd.name=cd.name.trim();
	if ((cd.name=="")||(cd.name==null))
		{
		alert("��於�����͂���Ă��܂���B");
		return;
		}
	cd.kubun=cd.kubun.trim();
	if ((cd.count=="")||(isNaN(cd.count))||(cd.count<1))
		{
		alert("������������������܂���i�P�ȏ�̐������w�肵�Ă��������j");
		return;
		}
	if (cd.spanDays!="")
		{
		if (isNaN(cd.spanDays))
			{
			alert("�K��̏I������������������܂���i�󗓂ɂ��邩�A�������w�肵�Ă��������j");
			return;
			}
		cd.spanDays=parseInt(cd.spanDays,10);
		if (cd.spanDays<=0)
			{
			alert("�K��̏I������������������܂���i�P��菬�����l�ɂ��邱�Ƃ͂ł��܂���j");
			return;
			}
		}
	else{
		cd.spanDays=0;
		}
	s="("+num+")"+Cards[num].name+"��"+name;
	s+="�A��������"+Cards[num].count+"��"+count+"�A�敪��"+Cards[num].kubun+"��"+kubun;
	if (cd.spanDays==0)
		{
		delete cd.spanDays;
		}
	SaveConfig(num);
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1();
	}

function MENU1Del(num)
	{
	var s;
	var a=confirm("���ԍ�"+num+"���폜���܂��B\n��x�폜����ƁA�n�}�f�[�^����юg�p�����A���L�����Ȃǂ��ׂĂ������Ă��܂��܂��B\n���s���Ă�낵���ł����H");
	if (!a) return;
	var fdir=NumFolderPath(num);
	fso.DeleteFolder(fdir,true);
	s="("+num+")"+Cards[num].name;
	s+="�A��������"+Cards[num].count+"�A�敪��"+Cards[num].kubun;
	delete Cards[num];
	AllMaps=new Array();
	MENU1();
	alert("���ԍ�"+num+"���폜���܂����B");
	}
//------------------------------------------------------------------------------------
//	���̈ꗗ�\��
//------------------------------------------------------------------------------------
function MENU1P(num)
	{
	var s,i,j,k,jc,x,found;
	var d1,d2;
	var vtb,vroom;
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	s="<form><div class=size5>��"+num+"�u"+Cards[num].name+"�v�̒n�}�ꗗ�F</div>"+hr();
	WriteLayer("Stage",s);
	if (Cards[num].MapType==0)
		{
		AddKey("Stage",1,"�n�}�����e�i���X","MoveMap("+num+")");
		AddKey("Stage",2,"�n�}�̕ۑ�","SaveMapImages("+num+")");
		AddKey("Stage",3,"�n�}�̕��A","RestoreMapImages("+num+")");
		AddKey("Stage",4,"���S�}�ɋL��","ClipAllArea("+num+",0)");
		}
	AddKey("Stage",0,"���ꗗ�֖߂�","MENU1()");
	Keys[11]="MENU1()";
	x=0;
	ReadBuilding(num);

	s="";
	switch(Cards[num].MapType)
		{
		case 0:		//	�摜�n�}
			s=hr()+"<table border=2 cellpadding=12 cellspacing=0>";
			for(i=1;i<=Cards[num].count;i++)
				{
				CheckImageSet(num,i);
				if (x==0) s+="<tr>";
				s+="<td class=size6>";
				found=fso.FileExists(PNGFile(num,i));
				if (found)
					{
					s+="<img src='"+ThumbFile(num,i)+NoCache()+"' width=320 height=200 style='cursor:pointer' onClick='MENU1PBig("+num+","+i+")'>";
					}
				else{
					s+="<img src='./sys/noimage.jpg' width=320 height=200 style='cursor:pointer' onClick='MENU1CreatePNG("+num+","+i+")'>";
					}
				ch=nums.charAt(i-1);
				s+="<span style='position:relative;top:-170px;left:-320px;color:#0000ff;font-weight:bold;'>"+ch+"</span></td>";
				if (x==1) s+="</tr>";
				x++;
				if (x==2) x=0;
				}
			if (x==1) s+="<td></td></tr>";
			s+="</table>";
			break;
		case 1:		//	�L��n�}
			s=hr()+"<table border=2 cellpadding=12 cellspacing=1>";
			for(i=1;i<=Cards[num].count;i++)
				{
				ch=nums.charAt(i-1);
				s+="<tr style='cursor:pointer;' onclick='MENU1PBig("+num+","+i+")'>";
				s+="<td valign=middle style='font-size:20px;color:#0000ff;font-weight:bold;'>"+ch+"</td>";
				s+="<td valign=middle style='font-size:12px;color:#000000;'>";
				k=0;vroom=0;
				for(j=0;j<Building.building.length;j++)
					{
					if (Building.building[j].map!=i) continue;
					k++;
					s+=Building.building[j].id;
					vtb=SearchCondominium(Building.building[j],num,i);
					if (vtb.floors.length>0) s+="("+vtb.floors.join(",")+")";
					vroom+=vtb.rooms;
					s+="<br>";
					}
				if (vroom!=0) s+="<div style='text-align:right;color:#ff0000;font-size:16px;'>�v�F"+vroom+"����</div>";
				if (k==0) s+="�i�Ώۂ̏W���Z��o�^����Ă��܂���j";
				s+="</td></tr>";
				}
			s+="</table>";
			break;
			}
	s+="</form>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	document.body.focus();
	}
function MENU1CreatePNG(num,seq)
	{
	var s="���̒n�}�̔����f�[�^("+seq+".png)��V�K�쐬���܂��B\n��낵���ł����H";
	var r=confirm(s);
	if (!r) return;
	fso.CopyFile(BlankPNG(),PNGFile(num,seq),true);
	s="("+num+")"+Cards[num].name;
	s+="�A�n�}�ԍ���"+seq;
	MENU1P(num);
	}
//------------------------------------------------------------------------------------
//	�n�}�̊g��\��
//------------------------------------------------------------------------------------
function MENU1PBig(num,seq)
	{
	var s,i,j,x,found,file;
	var d1,d2,cm,cms;
	var r,rmap,Bmap="",sb,sobj;
	var scr="";
	var vml=new Poly();
	var BTB;
	var mapimage;
	var rcolor;
	vml.mapsize=1;
	SetOverflow("");
	if (Cards[num].MapType==0)
		{
		mapimage=PNGFile(num,seq);
		}
	else{
		mapimage=BlankPNG();
		}
	r=GetImageInfo(mapimage);
	ClearKey();
	ClearLayer("Stage");
	MapZoom=false;
	file=fso.FileExists(mapimage);
	s="<div style='width:"+MaxWidth+"px;text-align:center;' class=size5>��"+num+"�u"+Cards[num].name+"�v"+nums.charAt(seq-1)+"</div>";
	WriteLayer("Stage",s);

	s="<form>";
	if (file) s+=AddKeys(1,"���","CloseFloatings();PrintMap("+num+","+seq+");MENU1PBig("+num+","+seq+");");
	if (Cards[num].MapType==0) s+=AddKeys(2,"�摜����荞��","ImportImage("+num+","+seq+")");
	if ((file)&&(Cards[num].MapType==0)) s+=AddKeys(3,"�߲��°قŊJ��","ExecMapEditor("+num+","+seq+")");
	s+=AddKeys(5,"���ʂ̕\��","CloseFloatings();MENU1PRev("+num+","+seq+")");
	s+=AddKeys(6,"���L���̒ǉ�","CloseFloatings();AddRefuses("+num+","+seq+")");
	if (Cards[num].MapType==0) s+=AddKeys(7,"�A�p�[�g�̒ǉ�","AddBuilding("+num+","+seq+")");
	if (Cards[num].MapType==1) s+=AddKeys(7,"�W���Z��̕ҏW","CloseFloatings();EditCondominium("+num+","+seq+")");
	s+=AddKeys(0,"�߂�","CloseFloatings();MENU1P("+num+")");
	s+="</form>";
	FloatingMenu.Title="���j���[";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",20,20,3,240,250);
	Keys[11]="CloseFloatings();MENU1P("+num+")";

	s="";	//	"<div style='position:absolute;top:0px;left:0px;'>";
	if (file)
		{
		s+="<img src='"+mapimage+NoCache()+"' onload='ImageMap.Adjust()'>";
		}
	else s+="�i�摜�f�[�^������܂���j";
//	s+="</div>";
	//	�}�[�J�[���̍���
	Markers=LoadMarker(num);
	if (seq in Markers.Map) s+=DrawMarker(Markers,seq,1,1,0);
	//	�摜�T�C�Y�̎擾
	Imgx=r.x;
	Imgy=r.y;
	vml.width=r.x;
	vml.height=r.y;
	BTB=Cards[num].RTB;
	BTB=CheckRefusesStatus(num,seq,BTB);
	SetRefusesToBuilding(0,BTB,num,true);	//	�r�����ɓ��L���𔽉f������
	SetMarkersToBuilding(0,Markers,0);		//	�r�����Ƀ}�[�J�[�𔽉f������
	RefuseExit=seq;
	for(i in BTB)
		{
		if (BTB[i].Num!=seq) continue;
		//	�Ԋ|���̍���
		if (BTB[i].Position!="")
			{
			rcolor="";
			switch (BTB[i].KBN1)
				{
				case "����":
					rcolor="#ff0000";
					break;
				case "�m�F":
					rcolor="#ffff00";
					break;
				case "�Ԋu":
					rcolor="#00ffff";
					break;
				default:
					rcolor="#88ff88";
					break;
				}
			vcmd="CloseFloatings();PreEditRefuses("+num+","+i+")";
			vtitle=BTB[i].Name+"("+BTB[i].KBN1+")";
			vml.AddObject(BTB[i].Position,vcmd,vtitle,1,1,rcolor);
			}
		if (BTB[i].Writing!="")
			{
			ss=BTB[i].Writing+",,,,";
			rx=ss.split(",");
			wstr=rx[0];
			wsize=parseInt(rx[1],10);
			x1=parseInt(rx[2],10);
			y1=parseInt(rx[3],10);
			
			s+="<div style='cursor:pointer;position:absolute;z-index:6;font-size:"+wsize+"px;white-space:nowrap;color:#0000ff;";
			s+="left:"+x1+"px;top:"+y1+"px;' ";
			s+="onClick='CloseFloatings();PreEditRefuses("+num+","+i+")' title='"+BTB[i].Name+"("+BTB[i].KBN1+")'>"+wstr+"</div>";
			if (rx[4]!="")
				{
				ss=rx[4];
				while(1==1)
					{
					if (ss.indexOf("&",0)==-1) break;
					ss=ss.replace("&",",");
					}
				vml.AddArrow(ss,1,1,false);
				}
			}
		}
	//	�R�����g���̍���
	for(i=0;i<Cards[num].Comments.length;i++)
		{
		cm=Cards[num].Comments[i];
		if (cm.Top==-1) continue;
		s+="<div style='position:absolute;z-index:2;font-size:"+cm.Size+"px;color:#0000ff;";
		s+="left:"+cm.Left+"px;top:"+cm.Top+"px;'>";
		cms=cm.Text;
		while(1==1)
			{
			if (cms.indexOf("@br@",0)==-1) break;
			cms=cms.replace("@br@","<br>");
			}
		s+=cms+"</div>";
		}

	//	�r�������d�˂�
	if (Building!="")
		{
		BuildingNum=num;
		BuildingSeq=seq;
		for(i in Building.building)
			{
			rmap=parseInt(Building.building[i].map,10);
			if (rmap!=seq) continue;
			s+=CreateBuildingImage(num,seq,0,i,"",1,1,0);
			sobj=CreateBuildingImage(num,seq,0,i,"",1,1,4);

			Bmap+="<area shape='poly' nohref onClick='CloseFloatings();";
			Bmap+="BuildingNamesChanged=new Array();EditBuilding("+i+")'";
			Bmap+=" coords='";
			Bmap+=sobj.x+","+sobj.y+","+(sobj.x+sobj.width)+","+sobj.y+",";
			Bmap+=(sobj.x+sobj.width)+","+(sobj.y+sobj.height)+",";
			Bmap+=sobj.x+","+(sobj.y+sobj.height)+","+sobj.x+","+sobj.y;
			Bmap+="' onmouseover='VMLShape_MouseOver(\"���̕�����ҏW���܂�\")'";
			Bmap+=" onmousemove='VMLShape_MouseOver(\"���̕�����ҏW���܂�\")'";
			Bmap+=" onmouseout='VMLShape_MouseOut()'";
			Bmap+="'>";
			}
		}
	ImageMap.Content=SetContent(s,vml,Imgx,Imgy,Bmap);
	ImageMap.Create("MAP",window["Stage"],MaxWidth-40,MaxHeight-50);
	window.scrollTo(0,0);
	document.body.focus();
	SetOverflow("");
	}

function PlaceCondominium(inx)
	{
	ReturntoBuildingFrom="MENU1PBig";
	PlaceBuilding(0,inx);
	}

function SetContent(s,vmlobj,width,height,buildingmap)
	{
	a=vmlobj.Draw(false,true);		//	20180320
	s+=a;
	s+="<div style='position:absolute;top:0px;left:0px;z-index:5;'>";
	s+="<img src='"+BlankGIF()+"' width="+width+" height="+height+" border=0 usemap='#IM' ";
	s+="onmousedown='mapfield_mousedown()' onmouseup='mapfield_mouseup()' onmousemove='mapfield_mousemove()'";
	s+=">";
	s+="<map name='IM'>";
	s+=vmlobj.Imap();
	s+=buildingmap;
	s+="</map></div>";
	return s;
	}

function CloseFloatings()
	{
	FloatingMenu.Close();
	ImageMap.Close();
	ClearLayer("Popup");
	}
function ExecMapEditor(num,seq)
	{
	var s,s1,s2,editorname;
	editorname=ConfigLocal.MapEditor;
	if (editorname=="") editorname=basepath+qt+"azpainter"+qt+"AzPainter2.exe";
	if (!fso.FileExists(editorname))
		{
		alert("�n�}�ҏW�A�v���P�[�V�����̐ݒ肪����������܂���B\n���C�����j���[�������e�i���X�����ݒ�\n����ݒ肵�Ă��������B");
		return;
		}
	s1=fso.GetParentFolderName(editorname);
	s2=fso.GetFileName(editorname);
	WshShell.CurrentDirectory=s1;
	s="\""+s2+"\" "+PNGFile(num,seq);
	WshShell.Run(s,true);
	CloseFloatings();
	alert("�ҏW���I�������OK���N���b�N���Ă��������B\n�摜�������[�h���܂��B");
	s="("+num+")"+Cards[num].name;
	s+="�A�n�}�ԍ���"+seq;
	CheckImageSet(num,seq);
	MENU1PBig(num,seq)
	}
//------------------------------------------------------------------------------------
//	���̗��p�󋵍X�V
//------------------------------------------------------------------------------------
function MENU1E(num)
	{
	var s,a;
	var now=new Date();
	if (Cards[num].Available=="false")
		{
		window.scrollTo(0,0);
		MENU1E_End(num);
		}
	else{
		if (Cards[num].Available=="disable")
			{
			s="�O��̏I������̍Œ�����𖞂����Ă��Ȃ��̂ŁA�g�p�J�n�ł��܂���B\n";
			s+="���[���o�b�N���܂����H";
			a=confirm(s);
			if (!a) return;
			MENU1E_Start_RollBack(num);
			return;
			}
		window.scrollTo(0,0);
		MENU1E_Start(num);
		}
	}

function MENU1E_Start(num)
	{
	var s,ymd;
	var today=new Date();
	if ("spanDays" in Cards[num])		//	�J�[�h���Ƃ̎����I���������ݒ肳��Ă���H
		{
		Menu1_AutoEndSpan=parseInt(Cards[num].spanDays,10);
		}
	else{
		Menu1_AutoEndSpan=parseInt(ConfigAll.AutoEndDefault,10);
		}
	var LimitStartDay=GetAvailableDate(num);	//	���̓��ȍ~���g�p�\�ł�����t���擾
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MENU1EExit()";
	s="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̎g�p�J�n</div>"+hr();
	s+="<div class=size3><form onsubmit='MENU1E_Start_Exec("+num+");return false;'>";
	s+="�g�p�Җ��F"+Field(0,30,true,1)+"<br>";
	s+="�ݏo���F<input type=text size=12 style='ime-mode:disabled;' onfocus='FLDFocus=1' onChange='CalcOverDay(document.forms[0].elements[1].value,true)'><br>";
	FLDATTR[1]=3;
	s+="<div class=size2 id=OVERRAY>�I�������F-</div><br>";
	s+="<input type=button value='�g�p�J�n' onClick='MENU1E_Start_Exec("+num+")'>";
	s+="<input type=button value='���[���o�b�N' onClick='MENU1E_Start_RollBack("+num+")'>";
	s+="<input type=button value='�߂�' onClick='MENU1EExit();'></form>";
	WriteLayer("Stage",s);
	s=DrawCalender(true,LimitStartDay);
	WriteLayer("Stage",s);
	s=MakeLogs(num);
	WriteLayer("Stage",s);
	ymd=(today.getMonth()+1)+"/"+today.getDate();
	document.forms[0].elements[1].value=ymd;
	s=UserPad();
	WriteLayer("Stage",s);
	Focus(0);
	}
function CalcOverDay(date,mode)
	{
	var d,overcampeign,comment="";
	var tbl,yyyy,mm,dd;
	if (date.indexOf("/",0)!=-1)
		{
		tbl=date.split("/");
		if (tbl.length==3)
			{
			if ((!isNaN(tbl[0]))&&(!isNaN(tbl[1]))&&(!isNaN(tbl[2])))
				{
				yyyy=parseInt(tbl[0],10);
				mm=parseInt(tbl[1],10);
				dd=parseInt(tbl[2],10);
				date=(yyyy*10000+mm*100+dd)+"";
				}
			}
		}
	if ((date.length!=8)||(isNaN(date)))
		{
		OVERRAY.innerHTML="�I�������F-";
		}
	if (mode)	//	(1)��O�̋��̏ꍇ
		{
		d=AddDays(date,Menu1_AutoEndSpan);
		// 2018/1/19�ǉ� -----------------------------------
		overcampeign=isOverCampeign(date,d);		//	�I�������L�����y�[�������܂����ł���H
		if (overcampeign ==-1)	comment="(�L�����y�[���O�̐V�K�J�n�֎~���ԁj";
		if (overcampeign > 0)	d=overcampeign;		//	�L�����y�[���O���ŏI������
		// 2018/1/19�ǉ� -----------------------------------
		// 2018/5/21�ǉ� -----------------------------------
		if (isCampeign(date))	d=AddDays(date,ConfigAll.AutoEndCampeign);	//	����߰݊��Ԓ��̎����I������
		// 2018/5/21�ǉ� -----------------------------------
		}
	else{		//	(2)�W���C���^�[�z���̏ꍇ
		d=AddDays(date,ConfigAll.AutoEndApart);
		}
	OVERRAY.innerHTML="�I�������F"+SplitDate(d)+comment;
	}
function CheckUser(str)
	{
	str=str.trim();
	if (str=="")
		{
		alert("�g�p�҂̖��O����͂��Ă��������B");
		return true;
		}
	return false;
	}
function CheckDate(label,b)
	{
	var today=new Date();
	var bcnt,bp,bp2,ymd;
	b=b+"";
	b=b.trim();
	if ((b.indexOf("/",0)==-1)&&(b.length==8))
		{
		if (b.length==8)
			{
			b=b.substring(0,4)+"/"+b.substring(4,6)+"/"+b.substring(6,8);
			}
		}
	if (b.indexOf("/",0)==-1)
		{
		alert(label+"�̓��͂�����������܂���B\n�N�E���E���́u/�v�ŋ�؂��Ă��������B�B");
		return true;
		}
	bcnt=0;bp=0;
	while(1==1)
		{
		if (b.indexOf("/",bp)==-1) break;
		bp=b.indexOf("/",bp);
		bp++;
		bcnt++;
		}
	if (bcnt>2)
		{
		alert(label+"�̓��͂�����������܂���B\n���t�`��������������܂���B");
		return true;
		}
	switch(bcnt)
		{
		case 1:	bp=b.indexOf("/",0);
				mm=b.substring(0,bp);
				dd=b.substring(bp+1,b.length);
				if ((isNaN(mm))||(isNaN(dd))||(mm<1)||(mm>12)||(dd<1)||(dd>31))
					{
					alert(label+"�̓��͂�����������܂���B\n���t�`��������������܂���B");
					return true;
					}
				if ((mm<3)&&((today.getMonth()+1)>=11)) yy=today.getFullYear()+1;
				else if ((mm>=11)&&((today.getMonth()+1)<3)) yy=today.getFullYear()-1;
				else yy=today.getFullYear();
				break;
		case 2:	bp=b.indexOf("/",0);
				yy=b.substring(0,bp);
				bp2=b.indexOf("/",bp+1);
				mm=b.substring(bp+1,bp2);
				dd=b.substring(bp2+1,b.length);
				if ((isNaN(yy))||(isNaN(mm))||(isNaN(dd))||(mm<1)||(mm>12)||(dd<1)||(dd>31))
					{
					alert(label+"�̓��͂�����������܂���B\n���t�`��������������܂���B");
					return true;
					}
				yy=parseInt(yy,10);
				if (yy<100) yy+=2000;
				if (Math.abs(today.getFullYear()-yy)>10)
					{
					alert(label+"�̔N��10�N�ȏ�ߋ��܂��͖����ł��B");
					return true;
					}
				break;
		}
	mm=parseInt(mm,10);
	dd=parseInt(dd,10);
	ymd=yy*10000+mm*100+dd;
	return ymd;
	}

function MENU1E_Start_Exec(num)
	{
	var a,b,ymd;
	var stream,text,s;
	var overday;
	var LimitStartDay=GetAvailableDate(num);	//	���̓��ȍ~���g�p�\�ł�����t���擾
	var cmd,cmf,cmp;

	a=document.forms[0].elements[0].value;	//�@�g�p��
	b=document.forms[0].elements[1].value;	//	�ݏo��

	//	�g�p�҃`�F�b�N
	if (CheckUser(a)) return;

	//	�݂��o�����`�F�b�N
	ymd=CheckDate("�ݏo��",b);
	if (ymd==true) return;
	if (ymd<LimitStartDay)
		{
		alert("���̋���"+SplitDate(LimitStartDay)+"�ȍ~�g�p�\�ł��B");
		return;
		}

	//	�I�����̌v�Z
	overday=AddDays(ymd,Menu1_AutoEndSpan);
	//	2018/1/19 �L�����y�[�����[�����C
	overcampeign=isOverCampeign(ymd,overday);		//	�I�������L�����y�[�������܂����ł���H
	if (overcampeign ==-1)
		{
		alert("�L�����y�[�����Ԃ̂Q�T�ԑO����͐V�K�J�n�ł��܂���B");
		return;
		}

	//	�݂��o�������i�O���v���O�����j
	ClearLayer("Stage");
	WriteLayer("Stage","�������ł��c");
	cmd="rent.wsf "+congnum+" "+num+" "+ymd+" "+a+" "+cmp;
	var objResult=RunWSF(cmd);
	if (objResult!="ok")
		{
		alert("�݂��o���������ɃG���[���������A�ݏo���������s���܂����B");
		LoadCard(num);
		MENU1EExit();
		return;
		}

	//	�������H
	cmf=confirm("��"+num+"�u"+Cards[num].name+"�v�̒n�}�����ׂĈ�����܂����H");
	if (cmf)
		{
		cmd="printpublic.wsf "+congnum+" "+num;
		objResult=RunWSF(cmd);
		}
	LoadCard(num);
	MENU1EExit();
	}


function MENU1E_Start_RollBack(num)
	{
	var a,b,s,cnf,err;
	var i,text,maxlogs,lastdata;
	var obj,l;
	var lines=new Array();
	var logline=new Array();
	cnf=confirm("��"+num+"�u"+Cards[num].name+"�v�̏�Ԃ��A�O��̎g�p�������O�̏�Ԃɖ߂��܂��B��낵���ł����H");
	if (!cnf) return;
	obj=LoadLog(num);
	l=obj.History.length;
	if (l==0)
		{
		alert("����ȏ�O�ɖ߂��܂���B");
		return;
		}
	l--;
	if (obj.History[l].Compress==1)
		{
		alert("�ߋ��̎g�p�󋵂͍ĕҐ��ς݂Ȃ̂ŁA���[���o�b�N�ł��܂���B");
		return;
		}

	RollBackLog(obj,num);
	SaveLog(obj,num);
	s="("+num+")"+Cards[num].name;
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1EExit();
	}

function MENU1E_End(num)
	{
	var i,j,text,maxlogs,seq,obj,l;
	var lines=new Array();
	for(i in sts) delete sts[i];
	obj=LoadLog(num);
	l=obj.History.length;
	if (l==0)
		{
		alert("���O��񂪈ُ�ł��B\n�����ł��܂���B");
		return;
		}
	l--;
	for(i in obj.History[l].Map)
		{
		j=parseInt(obj.History[l].Map[i].Sequence,10);
		sts[j]=new Object();
		sts[j].user=obj.History[l].User;
		sts[j].rent=obj.History[l].Rent;
		sts[j].start=obj.History[l].Map[i].Start;
		sts[j].end=obj.History[l].Map[i].End;
		}
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MENU1EExit()";
	s="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̎g�p��</div>"+hr();
	s+="<div class=size3><form onsubmit='MENU1E_End_Exec("+num+");return false;'>";
	s+="�g�p�Җ��F"+Field(0,30,true,1)+"<br>";
	s+="�ݏo���F"+Field(1,12,false,2)+"<br>";
	s+="�I�������F"+Field(2,12,false,2)+"<br>";
	s+="<table border=1 cellpadding=5 cellspacing=0>";
	s+="<tr><td class=HEAD>�ԍ�</td>";
	s+="<td class=HEAD>�ԗ��J�n��</td>";
	s+="<td class=HEAD>�ԗ��I����</td></tr>";
	for (i in sts)
		{
		i=parseInt(i,10);
		s+="<tr><td align=right>"+i+"</td>";
		s+="<td>"+Field((3+(i-1)*2),12,false,2,"MapNo="+i,"FieldType='Start'")+"</td>";
		s+="<td>"+Field((4+(i-1)*2),12,false,2,"MapNo="+i,"FieldType='End'")+"</td>";
		}
	s+="</table>";
	s+="<input type=button value='�X�V' onClick='MENU1E_End_Exec("+num+")'>";
	s+="<input type=button value='��������' onClick='MENU1E_Complete_Exec("+num+")'>";
	s+="<input type=button value='���[���o�b�N' onClick='MENU1E_End_Cancel("+num+")'>";
	s+="<input type=button value='�߂�' onClick='MENU1EExit()'></form>";
	WriteLayer("Stage",s);
	s=DrawCalender(true,obj.History[l].Rent);
	WriteLayer("Stage",s);

	s="<div style='position:absolute;top:80px;left:360px;z-index:2;'>";
	s+=MakeLogs(num)+"</div>";
	WriteLayer("Stage",s);
	
	document.forms[0].elements[0].value=obj.History[l].User;	//	�g�p��
	document.forms[0].elements[1].value=SplitDate(obj.History[l].Rent);	//	�݂��o����
	document.forms[0].elements[2].value=SplitDate(obj.History[l].Limit);	//	�I������
	for(i in sts)
		{
		i=parseInt(i,10);
		j=3+(i-1)*2;
		if (sts[i].start!=0) document.forms[0].elements[j].value=SplitDate(sts[i].start);
		if (sts[i].end!=0) document.forms[0].elements[j+1].value=SplitDate(sts[i].end);
		}
	Focus(4);
	}

function MENU1E_End_Exec(num)
	{
	var a,b,c,cnf,c1,c2,d1,d2,s,ymd,cnf;
	var i,j,text,maxlogs,seq;
	var obj,l;
	var lines=new Array();
	var sts=new Array();
	var cmpday1,cmpday2;
	cmpday1=99999999;cmpday2=0;

	obj=LoadLog(num);
	l=obj.History.length;
	if (l==0)
		{
		alert("���O��񂪈ُ�ł��B\n�����ł��܂���B");
		return;
		}
	l--;
	a=document.forms[0].elements[0].value;	//	�g�p��
	b=document.forms[0].elements[1].value;	//	�ݏo��
	c=document.forms[0].elements[2].value;	//	�I������
	if (CheckUser(a)) return;
	ymd=CheckDate("�ݏo��",b);
	if (ymd==true) return;
	overday="";
	if (c!="")
		{
		overday=CheckDate("�I������",c);
		if (overday==true) return;
		}
	for(i in obj.History[l].Map)
		{
		j=3+(parseInt(obj.History[l].Map[i].Sequence,10)-1)*2;
		c1=document.forms[0].elements[j].value;
		c2=document.forms[0].elements[j+1].value;
		c1=c1.trim();
		c2=c2.trim();
		if (c1=="")	d1="00000000";
			else	{
					d1=CheckDate("�ԗ��J�n��("+obj.History[l].Map[i].Sequence+")",c1);
					if (d1==true) return;
					if (d1<ymd)
						{
						alert("�ԗ��J�n�����݂��o�������O�ɂȂ��Ă��܂��B");
						return;
						}
					}
		if (c2=="")	d2="00000000";
			else	{
					d2=CheckDate("�ԗ��I����("+obj.History[l].Map[i].Sequence+")",c2);
					if (d2==true) return;
					if (d2<d1)
						{
						alert("�ԗ��I�������ԗ��J�n�����O�ɂȂ��Ă��܂��B");
						return;
						}
					if (d2<ymd)
						{
						alert("�ԗ��I�������݂��o�������O�ɂȂ��Ă��܂��B");
						return;
						}
					}
		if (d1!="00000000")
			{
			if (d1<cmpday1) cmpday1=d1;
			}
		if (d2!="00000000")
			{
			cmp=true;
			if (d2>cmpday2) cmpday2=d2;
			}
		sts[i]=new Object();
		sts[i].day1=d1;
		sts[i].day2=d2;
		}
	for(i in sts)
		{
		obj.History[l].Map[i].Start=sts[i].day1;
		obj.History[l].Map[i].End=sts[i].day2;
		}
	obj.History[l].User=a;
	obj.History[l].Rent=ymd;
	obj.History[l].Limit=overday;
	SetLogSummary(obj);
	SaveLog(obj,num);
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1EExit();
	}

function MENU1E_Complete_Exec(num)
	{
	var i,j,a,b,ymd,cmp,cmpday1,cmpday2;
	var obj,l;
	cmp=false;
	cmpday1=99999999;cmpday2=0;
	a=document.forms[0].elements[0].value;
	b=document.forms[0].elements[1].value;
	if (CheckUser(a)) return;
	ymd=CheckDate("�ݏo��",b);
	if (ymd==true) return;
	for(i=1;i<=Cards[num].count;i++)
		{
		j=2+(i-1)*2+1;
		c1=document.forms[0].elements[j].value;
		c2=document.forms[0].elements[j+1].value;
		c1=c1.trim();
		c2=c2.trim();
		if (c1=="")	d1="00000000";
			else	{
					d1=CheckDate("�ԗ��J�n��("+i+")",c1);
					if (d1==true) return;
					}
		if (c2=="")	d2="00000000";
			else	{
					d2=CheckDate("�ԗ��I����("+i+")",c2);
					if (d2==true) return;
					}
		if (d1!="00000000")
			{
			if (d1<cmpday1) cmpday1=d1;
			}
		if (d2!="00000000")
			{
			cmp=true;
			if (d2>cmpday2) cmpday2=d2;
			}
		sts[i]=new Object();
		sts[i].day1=d1;
		sts[i].day2=d2;
		}
	if (!cmp)
		{
		alert("����������ɂ́A�Œ�P�ӏ��͖ԗ��I��������͂��Ă��������B");
		Focus(3);
		return;
		}
	cnf=confirm("��"+num+"�u"+Cards[num].name+"�v�̎g�p�����̏�ԂŊ������܂��B��낵���ł����H");
	if (!cnf) return;
	obj=LoadLog(num);
	l=obj.History.length;
	if (l==0)
		{
		alert("���O��񂪈ُ�ł��B\n�����ł��܂���B");
		return;
		}
	l--;
	for(i in sts)
		{
		if (sts[i].day1=="00000000")
			{
			if (cmpday1!=99999999) sts[i].day1=cmpday1;
			else sts[i].day1=ymd;
			}
		if (sts[i].day2=="00000000")
			{
			sts[i].day2=cmpday2;
			}
		if (i in obj.History[l].Map)
			{
			obj.History[l].Map[i].Start=sts[i].day1;
			obj.History[l].Map[i].End=sts[i].day2;
			}
		}
	FinishLog(obj,num,true);
	SaveLog(obj,num);
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1EExit();
	}

function MENU1E_End_Cancel(num)
	{
	var a,cmd;
	a=confirm("��"+num+"�u"+Cards[num].name+"�v�̎g�p����Ԃ��������܂��B��낵���ł����H");
	if (!a) return;

	//	�O���v���O�����Ƃ��ČĂяo��
	ClearLayer("Stage");
	WriteLayer("Stage","�������ł��c");
	cmd="cancelpp.wsf "+congnum+" "+num;
	var objResult=RunWSF(cmd);
	if (objResult!="ok")
		{
		alert("���[���o�b�N�������ɃG���[���������A���[���o�b�N���������s���܂����B");
		}

	LoadCard(num);
	CreateSummaryofPerson(num,true);
	MENU1EExit();
	}

function MENU1EExit()
	{
	if (PickFrom=="List") MENU1();
	else All(false);
	}
//--------------------------------------------------------------
//	�T�u���[�`��
//--------------------------------------------------------------
function SplitDate(dat)
	{
	var s;
	dat=dat+"";
	if (dat=="00000000") return "";
	if (dat=="") return "";
	if (dat.indexOf("/",0)!=-1) return dat;
	s=dat.substring(0,4)+"/"+dat.substring(4,6)+"/"+dat.substring(6,8);
	return s;
	}
function CalcDays(ymd1,ymd2)
	{
	var y1,m1,d1;
	var y2,m2,d2;
	var today=new Date();
	if (ymd1==0) return "-1";
	ymd1=ymd1+"";
	y1=parseInt(ymd1.substring(0,4),10);
	m1=parseInt(ymd1.substring(4,6),10)-1;
	d1=parseInt(ymd1.substring(6,8),10);
	if (ymd2!="")
		{
		ymd2=ymd2+"";
		y2=parseInt(ymd2.substring(0,4),10);
		m2=parseInt(ymd2.substring(4,6),10)-1;
		d2=parseInt(ymd2.substring(6,8),10);
		}
	else{
		y2=today.getFullYear();
		m2=today.getMonth();
		d2=today.getDate();
		}
	var day1=new Date(y1,m1,d1);
	var day2=new Date(y2,m2,d2);
	var days=Math.ceil((day2.getTime()-day1.getTime())/(24*60*60*1000));
	return days;
	}
function AddDays(ymd,adds)
	{
	var s;
	var ty,tm,td;
	var tymd=new Array();
	var ds=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	adds=parseInt(adds,10);
	s=ymd+"";
	if (s.indexOf("/",0)!=-1)
		{
		tymd=s.split("/");
		ty=parseInt(tymd[0],10);
		tm=parseInt(tymd[1],10);
		td=parseInt(tymd[2],10);
		}
	else{
		ty=parseInt(s.substring(0,4),10);
		tm=parseInt(s.substring(4,6),10);
		td=parseInt(s.substring(6,8),10);
		}
	td+=adds;
	while (1==1)
		{
		if ((ty % 4)==0) ds[1]=29;else ds[1]=28;
		if (td<=ds[tm-1]) break;
		td-=ds[tm-1];
		tm++;
		if (tm>12) {ty++;tm=1;}
		}
	if (s.indexOf("/",0)!=-1)
		{
		s=ty+"/"+tm+"/"+td;
		}
	else{
		s=ty*10000+tm*100+td;
		}
	s+="";
	return s;
	}

function SaveConfig(num)
	{
	var obj=new Object();
	var i,j;
	obj.name=Cards[num].name;
	obj.count=Cards[num].count;
	obj.kubun=Cards[num].kubun;
	if ("MapType" in Cards[num]) obj.MapType=Cards[num].MapType;
					else	obj.MapType=0;
	if ("HeaderType" in Cards[num]) obj.HeaderType=Cards[num].HeaderType;
					else	obj.HeaderType=0;
	if ("spanDays" in Cards[num]) obj.spanDays=Cards[num].spanDays;
	if ("AllMapPosition" in Cards[num])	obj.AllMapPosition=Cards[num].AllMapPosition;
	if ("AllMapTitle" in Cards[num])	obj.AllMapTitle=Cards[num].AllMapTitle;
	if ("Buildings" in Cards[num])
		{
		obj.Buildings=new Object();
		obj.Buildings.Count=Cards[num].Buildings.Count;
		obj.Buildings.House=Cards[num].Buildings.House;
		}
	if ("Clip" in Cards[num])
		{
		obj.Clip=new Array();
		j=0;
		for(i in Cards[num].Clip)
			{
			obj.Clip[j]=new Object();
			obj.Clip[j].Seq=i;
			obj.Clip[j].Area=Cards[num].Clip[i].Area;
			if ("Zoom" in Cards[num].Clip[i])
				{
				obj.Clip[j].Zoom=Cards[num].Clip[i].Zoom;
				obj.Clip[j].Top=Cards[num].Clip[i].Top;
				obj.Clip[j].Left=Cards[num].Clip[i].Left;
				}
			j++;
			}
		}
	if ("Condominium" in Cards[num])
		{
		obj.Condominium=clone(Cards[num].Condominium);
		}
	if ("Comments" in Cards[num])
		{
		obj.Comments=clone(Cards[num].Comments);
		}
	obj.RTB=clone(Cards[num].RTB);
	WriteXMLFile(obj,ConfigXML(num));
	//	SQlite������ǉ�(2018/11/10)
	var sqobj=CreatePublicList_One(num);
	SQ_Replace("PublicList",sqobj);
	}

function GetUpdate(filename)
	{
	var f,s,ymd,i,mm;
	var mon=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var tbl=new Array(10);
	if (!fso.FileExists(filename)) return "";
	f = fso.GetFile(filename);
	s=f.DateLastModified+"";
	tbl=s.split(" ");
	ymd=tbl[5];
	for(i=0;i<=11;i++) if (tbl[1]==mon[i]) break;
	mm=i+1;
	if (mm<10) ymd+="0"+mm;else ymd+=""+mm;
	if (tbl[2].length==1) ymd+="0"+tbl[2];else ymd+=""+tbl[2];
	ymd+=tbl[3];
	return ymd;
	}

function Focus(num)
	{
	window.blur();
	setTimeout("FocusIt("+num+")",10);
	}

function FocusIt(num)
	{
	window.focus();
	document.forms[0].elements[num].select();
	}

function UserPad()
	{
	var s,i;
	var usrs=new Array();
	UPAD=new Array();
	s="<div style='position:absolute;top:60px;left:620px;z-index:2;'>";
	s+="<table border=1 cellpadding=4 cellspacing=0 bgcolor='#99ffff' width=200>";
	s+="<tr><td><font color=blue><b>�g�p�Җ������F</b></font><br>";
	var usrs=SQ_Read("CWUsers","congnum="+congnum+" and authority='publicservice'","userid");
	if (usrs.length>0)
		{
		s+="<form id='UP1'><select id='UPS1' size=22 style='width:200px;' onchange='i=this.selectedIndex;AutoUser(i);'>";
		for(i=0;i<usrs.length;i++)
			{
			UPAD[i]=usrs[i].userid;
			s+="<option>"+usrs[i].userid+"</option>";
			}
		s+="</select><br>";
		s+="<input type=button value='�폜' onclick='DeleteUPad1()'></form>";
		}
	else{
		s+="�g�p�Җ��̗���������܂���B";
		}
	s+="</td></tr></table></div>";
	return s;
	}

function UserPad2()
	{
	var s,i;
	var usrs=new Array();
	UPAD2=new Array();
	s="<div style='position:absolute;top:60px;left:620px;z-index:2;'>";
	s+="<table border=1 cellpadding=4 cellspacing=0 bgcolor='#99ffff' width=200>";
	s+="<tr><td><font color=blue><b>�g�p�Җ������F</b></font><br>";
	var usrs=SQ_Read("CWUsers","congnum="+congnum+" and authority='personalservice'","userid");
	if (usrs.length>0)
		{
		s+="<form id='UP2'><select id='UPS2' size=22 style='width:200px;' onchange='i=this.selectedIndex;AutoUser2(i);'>";
		for(i=0;i<usrs.length;i++)
			{
			UPAD2[i]=usrs[i].userid;
			s+="<option>"+usrs[i].userid+"</option>";
			}
		s+="</select><br>";
		s+="<input type=button value='�폜' onclick='DeleteUPad2()'></form>";
		}
	else{
		s+="�g�p�Җ��̗���������܂���B";
		}
	s+="</td></tr></table></div>";
	return s;
	}

function DeleteUPad1()
	{
	var select=document.forms["UP1"].UPS1;
	var i=select.selectedIndex;
	SQ_Delete("CWUsers","congnum="+congnum+" and authority='publicservice' and userid='"+UPAD[i]+"';");
	UPAD.splice(i,1);
	select.removeChild(select.options[i]);
	}

function DeleteUPad2()
	{
	var select=document.forms["UP2"].UPS2;
	var i=select.selectedIndex;
	SQ_Delete("CWUsers","congnum="+congnum+" and authority='personalservice' and userid='"+UPAD2[i]+"';");
	UPAD2.splice(i,1);
	select.removeChild(select.options[i]);
	}

function AutoUser(num)
	{
	var f,s;
	f=FLDFocus;
	if (FLDATTR[f]!=1) return;
	s=UPAD[num];
	document.forms[0].elements[f].value=s;
	document.forms[0].elements[f+1].select();
	}

function AutoUser2(num)
	{
	var f,s;
	f=FLDFocus;
	if (FLDATTR[f]!=1) return;
	s=UPAD2[num];
	document.forms[0].elements[f].value=s;
	document.forms[0].elements[f+1].select();
	}

function DrawCalender(mode,startday)
	{
	var s,i,j,yn,mn,x,xs,maxd;
	var ty,tm,td,cld;
	var cpflag=false;
	var today=new Date();
	var yy=today.getFullYear();
	var mm=today.getMonth();
	ty=today.getFullYear();
	tm=today.getMonth();
	td=today.getDate();
	var ds=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	s="<table border=0 cellpadding=0 cellspacing=8 bgcolor='#ccffbb'><tr>";
	for(i=-1;i<=1;i++)
		{
		yn=yy;
		mn=mm+i;
		if (mn<0)	{mn=11;yn--;}
		if (mn>11)	{mn=0;yn++;}
		today.setFullYear(yn);
		today.setMonth(mn);
		today.setDate(1);
		x=today.getDay();
		maxd=ds[mn];
		if (((yn % 4)==0)&&(mn==1))	maxd++;
		s+="<td valign=top><table border=2 cellpadding=2 cellspacing=1 bgcolor='#ffffff'>";
		s+="<tr><td bgcolor='#000000' colspan=7 align=center style='color:#ffffff;font-weight:bold'>"+yn+"�N"+(mn+1)+"��</td></tr>";
		s+="<tr bgcolor='#ffff88' style='cursor:default;'>";
		s+="<td><font color=red>��</td><td>��</td><td>��</td><td>��</td><td>��</td><td>��</td><td>�y</td></tr>";
		if (x!=0)
			{
			s+="<tr><td style='cursor:default;' bgcolor='#cccccc' colspan="+x+">�@</td>";
			}
		for(j=1;j<=maxd;j++)
			{
			if (x==0) s+="<tr>";
			cld=parseInt(yn,10)*10000+(parseInt(mn,10)+1)*100+parseInt(j,10);
			cpflag=isBeforeCampeign(cld);	//	�L�����y�[���O�̂Q�T�ԂɊY���H

			s+="<td align=right style='";

			//	�Z���̐F�������̐F
			if ((mn==tm)&&(j==td))	s+="color:#ffffff;font-weight:bold;background-color:#009900;";
			else{
				if (isCampeign(cld))
					{
					s+="background-color:#00ffff;color:";
					if (cld<startday)	s+="#77aaaa";else s+="#000000";
					}
				else if (cpflag)
					{
					s+="background-color:#ff0000;color:";
					if (cld<startday)	s+="#aa0000";else s+="#ffffff";
					}
				else{
					s+="background-color:#ffffff;color:";
					if (cld<startday)	s+="#777777";else s+="#000000";
					}
				s+=";"
				}

			//	�J�[�\�����N���b�N����
			if (cld<startday)	s+="cursor:no-drop;'";
			else{
				if (cpflag)	s+="cursor:no-drop;' onClick='DateError()'";
					else	s+="cursor:pointer;' onClick='AutoInput(\""+cld+"\","+mode+")'";
				}

			s+=">"+j+"</td>";
			x++;
			if (x>6)
				{
				s+="</tr>";
				x=0;
				}
			}
		if (x!=0)
			{
			s+="<td bgcolor='#cccccc' style='cursor:default;' colspan="+(7-x)+">�@</td></tr>";
			}
		s+="</table></td>";
		}
	s+="</tr></table>";
	return s;
	}

function AutoInput(days,mode)
	{
	var f,d,dx;
	f=FLDFocus;
	if ((FLDATTR[f]!=2)&&(FLDATTR[f]!=3)) return;
	dx=days+"";
	d=SplitDate(dx);
	document.forms[0].elements[f].value=d;
	if (FLDATTR[f]==3) CalcOverDay(days,mode);
	document.forms[0].elements[f+1].select();
	}
function DateError()
	{
	alert("�L�����y�[�����ԑO�̂Q�T�Ԃ͐V�K���݂̑��o���͂ł��܂���B");
	}

function MakeLogs(num)
	{
	var logs=new Array();
	var logcnt=0;
	var obj,l;
	var s;
	obj=LoadLog(num);
	l=obj.History.length;
	if (l>0)
		{
		for(i in obj.History)
			{
			if (obj.History[i].Status=="Using") continue;
			logcnt++;
			logs[logcnt]=new Object();
			logs[logcnt].USR=obj.History[i].User;
			logs[logcnt].STR=obj.History[i].Rent;
			logs[logcnt].END=obj.History[i].End;
			}
		}
	s="<div style='width:400px;height:120px;background-color:#ffaaff;overflow-y:scroll;border:ridge 2px black;padding:4px;'>";
	s+="<font color=blue><b>�g�p�����F</b></font><br><span style='font-size:14px'>";
	for(i=logcnt;i>=1;i--)
		{
		s+=logs[i].USR+"("+SplitDate(logs[i].STR)+"�`"+SplitDate(logs[i].END)+")<br>";
		}
	s+="</span></div>";
	return s;
	}

function ForceEnd()
	{
	var i,s,ss,Id,num,fld,stream,text,maxlogs;
	var obj,l;
	var lines=new Array();
	var logs=new Array();
	var today=new Date();
	var	y2=today.getFullYear();
	var	m2=today.getMonth()+1;
	var	d2=today.getDate();
	var ymd2=(y2*10000+m2*100+d2)+"";

	//	�ʏ���̋����I��
	var ctbl=SQ_Read("PublicList","congnum="+congnum,"num");
	for(i=0;i<ctbl.length;i++)
		{
		num=ctbl[i].num;
		if (ctbl[i].inuse=="false") continue;		//	�g�p���łȂ�
		if (ymd2<ctbl[i].limitday) continue;		//	�I���������Ă��Ȃ�
		obj=LoadLog(num);
		FinishLog(obj,num,false);
		SaveLog(obj,num);
		}

	//	�W�������݂̎����I��
	if (fso.FolderExists(ApartFolder()))
		{
		dir=fso.GetFolder(ApartFolder());
		files=new Enumerator(dir.Files);
		for(; !files.atEnd(); files.moveNext())
			{
			file=files.item().Name+"";
			Id=fso.GetBaseName(file);
			ss=GetApartmentStatus(Id);
			if (ss=="") continue;
			logs=ss.split(",");
			if (logs[2]!="") continue;
			if (ymd2<logs[3]) continue;
			text=ReadFile(ApartFile(Id));
			lines=text.split(/\r\n/);
			maxlogs=lines.length;
			var stream = fso.CreateTextFile(ApartFile(Id),true);
			for(i=0;i<maxlogs;i++)
				{
				if (lines[i]=="") break;
				logs=lines[i].split(",");
				if (logs[2]!="")
					{
					stream.WriteLine(lines[i]);
					continue;
					}
				s=logs[0]+","+logs[1]+","+logs[3]+","+logs[3];
				stream.WriteLine(s);
				}
			stream.close();
			}
		}
	}

var MMPnum;
var MMP;

function MoveMap(num)
	{
	if (Cards[num].NowUsing)
		{
		alert("�n�}�̃����e�i���X�́A���̗��p���ɂ͂ł��܂���B\n���̎g�p���I�����Ă���g�p���Ă��������B");
		return;
		}
	MMPnum=num;
	MMP=new Array();
	DrawMoveMap();
	window.scrollTo(0,0);
	}

function PushMoveMap(i)
	{
	if (MMP[i]) MMP[i]=false;
	else MMP[i]=true;
	DrawMoveMap();
	}

function DrawMoveMap()
	{
	var s,i,x,found;
	var d1,d2;
	var num=MMPnum;
	ClearKey();
	ClearLayer("Stage");
	s="<div class=size5>��"+num+"�u"+Cards[num].name+"�v�̒n�}�����e�i���X�F</div>"+hr();
	WriteLayer("Stage",s);
	s="�����e�i���X�������n�}���N���b�N���Ĕ��]�����Ă���A�ȉ��̂����ꂩ�̃{�^�����N���b�N���Ă��������B<br><br>";
	WriteLayer("Stage",s);
	AddKey("Stage",1,"�n�}�ԍ��̓���ւ�","ExecChangeMap()");
	AddKey("Stage",2,"�n�}��ʂ̋��ɕύX","ExecMoveMap()");
	AddKey("Stage",3,"�n�}�̍폜","ExecDeleteMap()");
	AddKey("Stage",0,"�L�����Z��","MENU1P("+num+")");
	Keys[11]="MENU1P("+num+")";
	s=hr()+"<table border=2 cellpadding=12 cellspacing=0>";
	x=0;
	for(i=1;i<=Cards[num].count;i++)
		{
		if (!(i in MMP))
			{
			MMP[i]=false;
			}
		CheckImageSet(num,i);
		found=fso.FileExists(PNGFile(num,i));
		if (x==0) s+="<tr>";
		s+="<td class=size6>";
		
		if (found)
			{
			s+="<img src='"+ThumbFile(num,i)+"' width=320 height=200 onClick='PushMoveMap("+i+")' ";
			}
		else{
			s+="<img src='./sys/noimage.jpg' width=320 height=200 style='cursor:pointer' onClick='PushMoveMap("+i+")' ";
			}
		s+="style='cursor:pointer;";
		if (MMP[i]) s+="filter:invert();";
		s+="'>";
		ch=nums.charAt(i-1);
		s+="<span style='position:relative;top:-170px;left:-320px;color:#";
		if (MMP[i]) s+="ff0000";else s+="0000ff";
		s+=";font-weight:bold;'>"+ch+"</span></td>";
		if (x==1) s+="</tr>";
		x++;
		if (x==2) x=0;
		}
	if (x==1) s+="<td></td></tr>";
	s+="</table>";
	WriteLayer("Stage",s);
	}
//-------------�n�}��ʂ̋��ɕύX--------------------------------------------
function ExecMoveMap()
	{
	var a,b,bc,copy1,copy2,c1,c2;
	var en=0,enc=0;
	var src,dst,BTB;
	var i,j,j1,j2,num,num2;
	var obj,l;
	var newmap=new Array();
	var renames=new Array();

	var p1,p2,p3,a1,a2,a3,a2p;
	var dir,files,obj,file,file2,ext,fh,dpath,cpath;
	num=MMPnum;
	dpath=NumFolder(num);

	for(i in MMP)	if (MMP[i]) enc++;
	if (enc==0)
		{
		alert("�ύX�������n�}���N���b�N���đI�����Ă��������B");
		return;
		}
	a=prompt("�I�������n�}���ړ����������ԍ�����͂��Ă��������B","");
	if (a==null) return;
	if ((isNaN(a))||(a==""))
		{
		alert("���ԍ��̎w�肪����������܂���B");
		return;
		}
	num2=parseInt(a,10);
	if (num2==0)
		{
		alert("���ԍ��̎w�肪����������܂���B");
		return;
		}
	if (!fso.FolderExists(NumFolder(num2)))
		{
		alert("���ԍ�"+num2+"�͑��݂��܂���B\n�V�������̒ǉ������Ă�����s���Ă��������B");
		return;
		}
	if (num2==num)
		{
		alert("�ړ���̋��ԍ������݂Ɠ����ł��B\n�ړ��ł��܂���B");
		return;
		}
	if (Cards[num2].NowUsing)
		{
		alert("�ړ���̋��́A���ݎg�p���ł��B\n�ړ���̋��̎g�p���I�����Ă���ړ����Ă��������B");
		return;
		}
	cpath=NumFolder(num2);

	//	�ړ���̋�文���𑝂₷
	bc=parseInt(Cards[num2].count,10);
	Cards[num2].count=bc+enc;
	j1=0;j2=0;
	for(i=1;i<=Cards[num].count;i++)
		{
		newmap[i]=new Object();
		if (MMP[i])
			{
			j1++;
			newmap[i].move=true;
			newmap[i].changeto=bc+j1;
			continue;
			}
		j2++;
		newmap[i].move=false;
		newmap[i].changeto=j2;
		}

	/*	�摜�̈ړ�	*/
	dir=fso.GetFolder(dpath);
	files=new Enumerator(dir.Files);

	j=0;
	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		ext=fso.GetExtensionName(file).toLowerCase();
		if ((ext!="jpg")&&(ext!="png")) continue;

		//	�T���l�C���̏ꍇ
		if ((ext=="jpg")&&(file.indexOf("thumb",0)==0))
			{
			p1=5;
			p3=file.indexOf(".jpg",p1);
			if (p3==-1) continue;
			a2=file.substring(p1,p3);
			if (isNaN(a2)) continue;
			a2=parseInt(a2,10);
			if (!a2 in newmap) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="thumb#"+a2+".jpg";
			if (newmap[a2].move)
				{
				obj.dstname="thumb"+newmap[a2].changeto+".jpg";
				fso.CopyFile(dpath+obj.srcname,cpath+obj.dstname,true);
				fso.DeleteFile(dpath+obj.srcname,true);
				continue;
				}
			obj.dstname="thumb"+newmap[a2].changeto+".jpg";
			if (newmap[a2].changeto==a2) continue;
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}���{�̏ꍇ
		if (ext=="png")
			{
			p2=file.indexOf(".png",0);
			if (p2==-1) p2=file.indexOf(".PNG",0);
			if (p2==-1) continue;
			a2=file.substring(0,p2);
			if (isNaN(a2)) continue;
			a2=parseInt(a2,10);
			if (!a2 in newmap) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="#"+a2+".png";
			if (newmap[a2].move)
				{
				obj.dstname=newmap[a2].changeto+".png";
				fso.CopyFile(dpath+obj.srcname,cpath+obj.dstname,true);
				fso.DeleteFile(dpath+obj.srcname,true);
				continue;
				}
			obj.dstname=newmap[a2].changeto+".png";
			if (newmap[a2].changeto==a2) continue;
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}Jpeg�̏ꍇ
		if (ext=="jpg")
			{
			p2=file.indexOf(".jpg",0);
			if (p2==-1) p2=file.indexOf(".JPG",0);
			if (p2==-1) continue;
			a2=file.substring(0,p2);
			if (a2.indexOf("r",0)==-1)
				{
				a2p="";
				a3=a2;
				}
			else{
				a2p="r";
				a3=a2.substring(0,a2.length-1);
				}
			if (isNaN(a3)) continue;
			a3=parseInt(a3,10);
			if (!a3 in newmap) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="#"+a3+a2p+".jpg";
			if (newmap[a3].move)
				{
				obj.dstname=newmap[a3].changeto+a2p+".jpg";
				fso.CopyFile(dpath+obj.srcname,cpath+obj.dstname,true);
				fso.DeleteFile(dpath+obj.srcname,true);
				continue;
				}
			obj.dstname=newmap[a3].changeto+a2p+".jpg";
			if (newmap[a3].changeto==a3) continue;
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}
		}
	//	�摜���l�[���̎��s
	for(i in renames)
		{
		obj=renames[i];
		fh=fso.GetFile(dpath+obj.tempname);
		fh.Name=obj.dstname;
		}
	/*	���L���̈ړ�	*/
	BTB=Cards[num].RTB;
	var BRTB=new Array();
	var br=0;
	for(i in BTB)
		{
		a1=BTB[i].Num;
		a2=newmap[a1].changeto;
		BTB[i].Num=a2;
		if (newmap[a1].move)
			{
			BRTB[br]=clone(BTB[i]);
			delete BTB[i];
			br++;
			}
		}
	SaveConfig(num);
	BTB=Cards[num2].RTB;
	for(i=0;i<br;i++)
		{
		j1=BTB.length;
		BTB[j1]=clone(BRTB[i]);
		}
	SaveConfig(num2);
	/*	�}�[�J�[�̈ړ� */
	Markers=LoadMarker(num);
	if (Markers.Count>0)
		{
		copy1=new Array();
		copy2=new Array();
		c2=0;
		for(i in Markers.Map)
			{
			a2=newmap[i].changeto;
			if (newmap[i].move)	//	�ʂ̋��ֈړ�����n�}
				{
				copy2[a2]=clone(Markers.Map[i]);
				c2++;
				}
			else{
				copy1[a2]=clone(Markers.Map[i]);
				}
			}
		Markers.Map=new Array();
		for(i in copy1)	Markers.Map[i]=clone(copy1[i]);
		SaveMarker(num,Markers);
		if (c2>0)
			{
			Markers=LoadMarker(num2);
			for(i in copy2)
				{
				Markers.Map[i]=clone(copy2[i]);
				}
			SaveMarker(num2,Markers);
			}
		}
	/*	�����̈ړ�	*/
	var B1=ReadXMLFile(BuildingFile(num),true);
	if (B1!="")
		{
		var B2=ReadXMLFile(BuildingFile(num2),true);
		if (B2=="")
			{
			B2=new Object();
			B2.building=new Array();
			}
		j=B2.building.length;
		for(i in B1.building)
			{
			a1=parseInt(B1.building[i].map,10);
			a2=newmap[a1].changeto;
			if (newmap[a1].move)	//	����ړ�����
				{
				B2.building[j]=clone(B1.building[i]);
				B2.building[j].map=newmap[a1].changeto;
				j++;
				delete B1.building[i];
				}
			else{
				B1.building[i].map=newmap[a1].changeto;
				}
			}
		WriteXMLFile(B1,BuildingFile(num));
		WriteXMLFile(B2,BuildingFile(num2));
		Cards[num].Buildings=GetBuildingSummeryInfo(num);
		Cards[num2].Buildings=GetBuildingSummeryInfo(num2);
		SaveConfig(num);
		SaveConfig(num2);
		Building=ReadXMLFile(BuildingFile(num),true);
		}

	var str="�n�}�i";
	s="";
	enc=0;
	for(i in MMP)
		{
		if (MMP[i])
			{
			if (enc>0) {str+=",";s+=",";}
			str+=i;
			s+=i;
			enc++;
			}
		}
	str+="�j�����"+num2+"�Ɉړ����܂����B";
	s="���"+num+"-"+s+"�����"+num2+"��";
	LoadCard(num);
	LoadCard(num2);
	CreateSummaryofPerson(num,true);
	CreateSummaryofPerson(num2,true);

	Cards[num].count-=enc;
	if (Cards[num].count>0)
		{
		SaveConfig(num);
		MENU1P(num);
		alert(str);
		}
	else{
		var fdir=NumFolderPath(num);
		fso.DeleteFolder(fdir,true);
		s="("+num+")"+Cards[num].name;
		s+="�A��������"+Cards[num].count+"�A�敪��"+Cards[num].kubun;
		delete Cards[num];
		MENU1();
		str+="\n�i���ԍ�"+num+"�͒n�}�������Ȃ����̂ŁA�폜����܂����B�j";
		alert(str);
		}
	}
//-------------�n�}���폜--------------------------------------------
function ExecDeleteMap()
	{
	var a,b;
	var en=0,enc=0;
	var src,dst,copy;
	var i,j,num,BTB;
	var newmap=new Array();
	var renames=new Array();

	var p1,p2,p3,a1,a2,a3,a1p;
	var dir,files,obj,file,file2,ext,fh,dpath;
	num=MMPnum;
	dpath=NumFolder(num);

	for(i in MMP)
		{
		if (MMP[i])
			{
			enc++;
			}
		}
	if (enc==0)
		{
		alert("�폜�������n�}���N���b�N���đI�����Ă��������B");
		return;
		}
	a=confirm("�I������"+enc+"���̒n�}���폜���܂��B\n�폜����n�}�ɂ�����L������g�p�����A�n�}�f�[�^�͑S�č폜����܂��B\n��낵���ł����H");
	if (!a) return;
	j=0;
	for(i=1;i<=Cards[num].count;i++)
		{
		newmap[i]=new Object();
		if (MMP[i])
			{
			newmap[i].del=true;	//	������폜����
			continue;
			}
		newmap[i].del=false;	//	�폜���Ȃ�
		newmap[i].changeto=j+1;	//	�ύX��n�}�ԍ�
		j++;
		}

	/*	�摜�̍폜	*/
	dir=fso.GetFolder(dpath);
	files=new Enumerator(dir.Files);

	j=0;
	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		ext=fso.GetExtensionName(file).toLowerCase();
		if ((ext!="jpg")&&(ext!="png")) continue;

		//	�T���l�C���̏ꍇ
		if ((ext=="jpg")&&(file.indexOf("thumb",0)==0))
			{
			p2=file.indexOf(".jpg",5);
			if (p2==-1) continue;
			a1=file.substring(5,p2);
			if (isNaN(a1)) continue;
			a1=parseInt(a1,10);
			if (!a1 in newmap) continue;
			if (newmap[a1].del)
				{
				fso.DeleteFile(dpath+file,true);
				continue;
				}
			if (newmap[a1].changeto==a1) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="thumb#"+a1+".jpg";
			obj.dstname="thumb"+newmap[a1].changeto+".jpg";
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}���{�̏ꍇ
		if (ext=="png")
			{
			p2=file.indexOf(".png",0);
			if (p2==-1) p2=file.indexOf(".PNG",0);
			if (p2==-1) continue;
			a1=file.substring(0,p2);
			if (isNaN(a1)) continue;
			a1=parseInt(a1,10);
			if (!a1 in newmap) continue;
			if (newmap[a1].del)
				{
				fso.DeleteFile(dpath+file,true);
				continue;
				}
			if (newmap[a1].changeto==a1) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="#"+a1+".png";
			obj.dstname=newmap[a1].changeto+".png";
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}Jpeg�̏ꍇ
		if (ext=="jpg")
			{
			p2=file.indexOf(".jpg",0);
			if (p2==-1) p2=file.indexOf(".JPG",0);
			if (p2==-1) continue;
			a1=file.substring(0,p2);
			if (a1.indexOf("r",0)==-1)
				{
				a1p="";
				a3=a1;
				}
			else{
				a1p="r";
				a3=a1.substring(0,a1.length-1);
				}
			if (isNaN(a3)) continue;
			a3=parseInt(a3,10);
			if (!a3 in newmap) continue;
			if (newmap[a3].del)
				{
				fso.DeleteFile(dpath+file,true);
				continue;
				}
			if (newmap[a3].changeto==a3) continue;
			obj=new Object();
			obj.srcname=file;
			obj.tempname="#"+a3+a1p+".jpg";
			obj.dstname=newmap[a3].changeto+a1p+".jpg";
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		}
	//	�摜���l�[���̎��s
	for(i in renames)
		{
		obj=renames[i];
		fh=fso.GetFile(dpath+obj.tempname);
		fh.Name=obj.dstname;
		}
	/*	���L���̓���ւ�	*/
	BTB=Cards[num].RTB;
	for(i in BTB)
		{
		a1=BTB[i].Num;
		if (newmap[a1].del)
			{
			delete BTB[i];
			continue;
			}
		BTB[i].Num=newmap[a1].changeto;
		}
	SaveConfig(num);
	/*	�}�[�J�[�̍폜 */
	Markers=LoadMarker(num);
	if (Markers.Count>0)
		{
		j=0;
		copy=new Array();
		for(i in Markers.Map)
			{
			if (newmap[i].del)
				{
				delete Markers.Map[i];
				continue;
				}
			a1=newmap[i].changeto;
			copy[a1]=clone(Markers.Map[i]);
			}
		Markers.Map=new Array();
		for(i in copy) Markers.Map[i]=clone(copy[i]);
		SaveMarker(num,Markers);
		}
	/*	�����̍폜	*/
	var B1=ReadXMLFile(BuildingFile(num),true);
	if (B1!="")
		{
		for(i in B1.building)
			{
			a1=parseInt(B1.building[i].map,10);
			a2=newmap[a1].changeto;
			if (newmap[a1].del)	//	����폜����
				{
				delete B1.building[i];
				}
			}
		WriteXMLFile(B1,BuildingFile(num));
		Cards[num].Buildings=GetBuildingSummeryInfo(num);
		SaveConfig(num);
		Building=ReadXMLFile(BuildingFile(num),true);
		}

	var str="�n�}�i";
	enc=0;s="";
	for(i in MMP)
		{
		if (MMP[i])
			{
			if (enc>0) {str+=",";s+=",";}
			str+=i;s+=i;
			enc++;
			}
		}
	str+="�j���폜���܂����B";
	s="���ԍ���"+num+"�A�n�}�ԍ���"+s;
	LoadCard(num);
	CreateSummaryofPerson(num,true);
	Cards[num].count-=enc;
	if (Cards[num].count>0)
		{
		SaveConfig(num);
		MENU1P(num);
		alert(str);
		}
	else{
		var fdir=NumFolderPath(num);
		fso.DeleteFolder(fdir,true);
		s="("+num+")"+Cards[num].name;
		s+="�A��������"+Cards[num].count+"�A�敪��"+Cards[num].kubun;
		delete Cards[num];
		MENU1();
		str+="\n�i���ԍ�"+num+"�͒n�}�������Ȃ����̂ŁA�폜����܂����B�j";
		alert(str);
		}
	}
//-------------�n�}�����ւ�--------------------------------------------
function ExecChangeMap()
	{
	var en=0,enc=0;
	var src,dst,copy;
	var i,BTB;
	for(i in MMP)
		{
		if (MMP[i])
			{
			enc++;
			if (enc==1) src=i;
			if (enc==2) dst=i;
			}
		}
	if (enc<2)
		{
		alert("�ԍ������ւ���n�}���Q�I�����Ă��������B");
		return;
		}

	var renames=new Array();
	var p1,p2,p3,a1,a2,a3,a2p;
	var dir,files,obj,file,file2,ext,fh,dpath;
	dpath=NumFolder(MMPnum);

	/*	�摜���̓���ւ�	*/
	dir=fso.GetFolder(dpath);
	files=new Enumerator(dir.Files);

	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		ext=fso.GetExtensionName(file).toLowerCase();
		if ((ext!="jpg")&&(ext!="png")) continue;

		//	�T���l�C���̏ꍇ
		if ((ext=="jpg")&&(file.indexOf("thumb",0)==0))
			{
			p1=5;
			p3=file.indexOf(".jpg",p1);
			if (p3==-1) continue;
			a2=file.substring(p1,p3);
			if (isNaN(a2)) continue;
			a2=parseInt(a2,10);
			if ((a2!=src)&&(a2!=dst)) continue;
			if (a2==src)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="thumb#"+src+".jpg";
				obj.dstname="thumb"+dst+".jpg";
				}
			if (a2==dst)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="thumb#"+dst+".jpg";
				obj.dstname="thumb"+src+".jpg";
				}
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}���{�̏ꍇ
		if (ext=="png")
			{
			p2=file.indexOf(".png",0);
			if (p2==-1) p2=file.indexOf(".PNG",0);
			if (p2==-1) continue;
			a2=file.substring(0,p2);
			if (isNaN(a2)) continue;
			a2=parseInt(a2,10);
			if ((a2!=src)&&(a2!=dst)) continue;
			if (a2==src)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="#"+src+".png";
				obj.dstname=dst+".png";
				}
			if (a2==dst)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="#"+dst+".png";
				obj.dstname=src+".png";
				}
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}

		//	�n�}Jpeg�̏ꍇ
		if (ext=="jpg")
			{
			p2=file.indexOf(".jpg",0);
			if (p2==-1) p2=file.indexOf(".JPG",0);
			if (p2==-1) continue;
			a2=file.substring(0,p2);
			if (a2.indexOf("r",0)==-1)
				{
				a2p="";
				a3=a2;
				}
			else{
				a2p="r";
				a3=a2.substring(0,a2.length-1);
				}
			if (isNaN(a3)) continue;
			a3=parseInt(a3,10);
			if ((a3!=src)&&(a3!=dst)) continue;
			if (a3==src)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="#"+src+a2p+".jpg";
				obj.dstname=dst+a2p+".jpg";
				}
			if (a3==dst)
				{
				obj=new Object();
				obj.srcname=file;
				obj.tempname="#"+dst+a2p+".jpg";
				obj.dstname=src+a2p+".jpg";
				}
			fh=fso.GetFile(dpath+obj.srcname);
			fh.Name=obj.tempname;
			renames.push(obj);
			continue;
			}
		}
	//	�摜���l�[���̎��s
	for(i in renames)
		{
		obj=renames[i];
		fh=fso.GetFile(dpath+obj.tempname);
		fh.Name=obj.dstname;
		}
	/*	���L���̓���ւ�	*/
	BTB=Cards[MMPnum].RTB;
	for(i in BTB)
		{
		if ((BTB[i].Num!=src)&&(BTB[i].Num!=dst)) continue;
		if (BTB[i].Num==src)	BTB[i].Num=dst;
						else	BTB[i].Num=src;
		}
	SaveConfig(MMPnum);
	/*	�}�[�J�[�̓���ւ� */
	Markers=LoadMarker(MMPnum);
	if (Markers.Count>0)
		{
		if ((src in Markers.Map)&&(dst in Markers.Map))
			{
			copy=clone(Markers.Map[src]);
			Markers.Map[src]=clone(Markers.Map[dst]);
			Markers.Map[dst]=clone(copy);
			}
		else{
			if (src in Markers.Map)
				{
				Markers.Map[dst]=clone(Markers.Map[src]);
				delete Markers.Map[src];
				}
			else{
				if (dst in Markers.Map)
					{
					Markers.Map[src]=clone(Markers.Map[dst]);
					delete Markers.Map[dst];
					}
				}
			}
		SaveMarker(MMPnum,Markers);
		}
	/*	�����̓���ւ�	*/
	var B1=ReadXMLFile(BuildingFile(MMPnum),true);
	if (B1!="")
		{
		for(i in B1.building)
			{
			a1=parseInt(B1.building[i].map,10);
			if ((a1!=src)&&(a1!=dst)) continue;
			if (a1==src) B1.building[i].map=dst;
			if (a1==dst) B1.building[i].map=src;
			}
		WriteXMLFile(B1,BuildingFile(MMPnum));
		Building=ReadXMLFile(BuildingFile(MMPnum),true);
		}

	MENU1P(MMPnum);
	s="���ԍ���"+MMPnum+"�A�n�}�ԍ���"+src+"����"+dst;
	alert("�n�}("+src+")�ƒn�}("+dst+")�����ւ��܂����B");
	}
function NoCache()
	{
	var d=new Date();
	var t=d.getTime();
	return "?"+t+"";
	}
//--------------------------------------------------------------------------
function SaveMapImages(num)
	{
	var s,s0,s1,s2,i;
	objFolder=Shell.BrowseForFolder(0,"���̋��̒n�}�f�[�^�iPNG�̂݁j��ۑ����܂��B\n�ۑ�����w�肵�Ă�������",1,17);
	if (objFolder==null) return;
	s=objFolder.Items().Item().Path;
	if (s.charAt(s.length-1)!=qt) s+=qt;
	if (!fso.FolderExists(s))
		{
		alert("�����ɂ͕ۑ��ł��܂���B\n�t�@�C�����������݂ł���t�H���_���w�肵�Ă��������B");
		return;
		}
	if (!fso.FolderExists(s+"quicky"))	fso.CreateFolder(s+"quicky");
	s1=s+"quicky"+qt;
	if (!fso.FolderExists(s1+"data"))	fso.CreateFolder(s1+"data");
	s1+="data"+qt;
	if (!fso.FolderExists(s1+num))	fso.CreateFolder(s1+num);
	s1+=num+qt;
	s0=NumFolder(num);
	for(i=1;i<=Cards[num].count;i++)
		{
		s2=num+"-"+i+".png";
		if (fso.FileExists(PNGFile(num,i)))	fso.CopyFile(PNGFile(num,i),s1+s2,true);
		}
	s="���ԍ���"+num+"�A�ۑ��恁"+s1;
	alert(s+"\n�ɂ��̒n�}�f�[�^��ۑ����܂����B");
	}

function RestoreMapImages(num)
	{
	var s,s0,s1,s2,i,err,r;
	objFolder=Shell.BrowseForFolder(0,"���̋��̒n�}�f�[�^�iPNG�̂݁j�𕜋A���܂��B\n���A�����w�肵�Ă�������",1,17);
	if (objFolder==null) return;
	s=objFolder.Items().Item().Path;
	if (s.charAt(s.length-1)!=qt) s+=qt;
	s0=s+"quicky"+qt+"data"+qt+num+qt;
	if (!fso.FolderExists(s0))
		{
		alert("�w�肳�ꂽ�ꏊ�ɂ͕ۑ����ꂽ�n�}�f�[�^������܂���B");
		return;
		}
	err=true;
	r=confirm(s+"\n����n�}�f�[�^�𕜋A���Ă���낵���ł����H");
	if (!r) return;
	s1=NumFolder(num);
	for(i=1;i<=Cards[num].count;i++)
		{
		s2=num+"-"+i+".png";
		if (fso.FileExists(s0+s2))
			{
			fso.CopyFile(s0+s2,PNGFile(num,i),true);err=false;
			}
		}
	if (err)
		{
		alert("�w�肳�ꂽ�ꏊ�ɂ͕ۑ����ꂽ�n�}�f�[�^������܂���B");
		return;
		}
	s="���ԍ���"+num+"�A���A����"+s0;
	alert(s+"\n�ɕۑ�����Ă����n�}�f�[�^�𕜋A���܂����B");
	MENU1P(num);
	}

//	����̃J�[�h�̎g�p�󋵂��X�V����------------------------------------------
function CheckCardLog(num)
	{
	var text,f,lines,i,luse,nowstatus;
	var maxlogs,lastuse,lastuser,nowusing,avail;
	var obj,l;
	obj=LoadLog(num);
	l=obj.History.length;

	// 2018/1/19�ǉ� -----------------------------------
	var now=new Date();
	var today=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate();
	// 2018/1/19�ǉ� -----------------------------------

	if (obj.Status=="Using")
		{
		nowusing=true;
		lastuse=obj.Latest.Rent;
		}
	else{
		nowusing=false;
		lastuse=obj.Latest.End;
		}
	lastuser=obj.Latest.User;
	luse=CalcDays(lastuse,"");
	if (!nowusing)
		{
		// 2018/1/19�ǉ� -----------------------------------
		if (isCampeign(today))		//	�L�����y�[�����Ԓ�
			{
			if (luse<ConfigAll.BlankCampeign) avail="disable";else avail="true";
			}
		else{
			if (isAfterCampeign(today))	//	����߰݊��Ԍ�30��
				{
				if (luse<ConfigAll.BlankAfterCampeign) avail="disable";else avail="true";
				}
			else{						//	�ʏ�̊���
				if ((luse<ConfigAll.BlankMin)&&(luse!=-1)) avail="disable";else avail="true";
				}
			}
		nowstatus="���g�p("+luse+"���O)";
		if (isBeforeCampeign(today))
			{
			nowstatus="����߰ݏ�������("+luse+"���O)";
			}
		// 2018/1/19�ǉ� -----------------------------------
		}
	else{
		avail="false";
		nowstatus="�g�p��("+lastuser+"�F"+lastuse.substring(4,6)+"/"+lastuse.substring(6,8)+"�`�j";
		}
	Cards[num].status=nowstatus;
	Cards[num].lastuse=lastuse;
	Cards[num].Available=avail;
	Cards[num].Blank=luse;
	Cards[num].NowUsing=nowusing;
	Cards[num].LastUser=lastuser;
	}
//-----------------------------------------------------------------
function LoadCard(num)
	{
	var text,p1,p2,count,name,kubun;
	var i,j,f,lines,obj,almap,o,s,ovr;
	Cards[num]=new Object();
	obj=new Object();
	obj=ReadXMLFile(ConfigXML(num),false)
	Cards[num].name=obj.name;
	Cards[num].count=obj.count;
	Cards[num].kubun=obj.kubun;
	if ("MapType" in obj) Cards[num].MapType=parseInt(obj.MapType,10);else Cards[num].MapType=0;
	if ("HeaderType" in obj) Cards[num].HeaderType=parseInt(obj.HeaderType,10);else Cards[num].HeaderType=1;
	if ("spanDays" in obj) Cards[num].spanDays=parseInt(obj.spanDays,10);
	if ("AllMapPosition" in obj) Cards[num].AllMapPosition=obj.AllMapPosition;
	if ("AllMapTitle" in obj) Cards[num].AllMapTitle=obj.AllMapTitle;
	if ("RTB" in obj)	Cards[num].RTB=clone(obj.RTB);
				else	Cards[num].RTB=new Array();
	Cards[num].refuses=Cards[num].RTB.length;
	if ("Buildings" in obj)
		{
		Cards[num].Buildings=new Object();
		Cards[num].Buildings.Count=parseInt(obj.Buildings.Count,10);
		Cards[num].Buildings.House=parseInt(obj.Buildings.House,10);
		}
	else{
		Cards[num].Buildings=GetBuildingSummeryInfo(num);
		SaveConfig(num);
		}
	if (Cards[num].MapType==1)	//	�W���Z��̏ꍇ
		{
		Cards[num].Buildings.Count=Condominiums[num].Buildings;
		Cards[num].Buildings.House=Condominiums[num].Rooms;
		}
	Cards[num].Clip=new Array();
	if ("Clip" in obj)
		{
		for(i=0;i<obj.Clip.length;i++)
			{
			j=parseInt(obj.Clip[i].Seq,10);
			Cards[num].Clip[j]=new Object();
			Cards[num].Clip[j].Area=obj.Clip[i].Area;
			if ("Zoom" in obj.Clip[i])
				{
				Cards[num].Clip[j].Zoom=obj.Clip[i].Zoom;
				Cards[num].Clip[j].Top=obj.Clip[i].Top;
				Cards[num].Clip[j].Left=obj.Clip[i].Left;
				}
			}
		}
	if ("Condominium" in obj)
		{
		Cards[num].Condominium=clone(obj.Condominium);
		}
	else{
		Cards[num].Condominium=new Array();
		}
	if ("Comments" in obj)
		{
		Cards[num].Comments=clone(obj.Comments);
		}
	else{
		Cards[num].Comments=new Array();
		}
	CheckCardLog(num);
	}

function LoadAllCards()
	{
	Cards=new Array();
	var dir,folders,obj,num;
	dir=fso.GetFolder(DataFolder());
	folders=new Enumerator(dir.SubFolders);
	for(; !folders.atEnd(); folders.moveNext())
		{
		obj=folders.item();
		if (isNaN(obj.Name)) continue;
		num=fso.GetBaseName(obj.Name);
		num=parseInt(num,10);
		LoadCard(num);
		}
	CreateSummaryofAllPerson();
	}
//-------------------------------------------------------------------
// 2018/5/23�ǉ��@�w�肳�ꂽ���܂��̓A�p�[�g�̍ŒZ�g�p�\�����擾
//-------------------------------------------------------------------
function GetAvailableDate(num)
	{
	var str,sts,atbl,d,i;
	var d0,nisu;
	if (isNaN(num))	//	�A�p�[�g�̏ꍇ
		{
		sts=GetApartmentStatus(num);
		if (sts=="")	return "00000000";
		atbl=sts.split(",");
		d=AddDays(atbl[2],ConfigAll.BlankMin);
		return d;
		}

	//	�ʏ�̋��̏ꍇ
	CheckCardLog(num);
	d=Cards[num].lastuse;				//	�ŏI�g�p��
	if (Cards[num].NowUsing) return d;	//	�g�p���̏ꍇ�͊J�n����Ԃ�
	d0=d;
	nisu=0;
	while(1==1)
		{
		d0=AddDays(d0,1);
		nisu++;
		if (isBeforeCampeign(d0)) continue;
		if (isCampeign(d0))
			{
			if (nisu>=ConfigAll.BlankCampeign) break;
			continue;
			}
		if (isAfterCampeign(d0))
			{
			if (nisu>=ConfigAll.BlankAfterCampeign) break;
			continue;
			}
		if (nisu>=ConfigAll.BlankMin) break;
		}
	return d0;
	}

