//------------------------------------------------------------------------------------
//	���������j���[
//------------------------------------------------------------------------------------
var Menu6_Filter_kubun="";
var Menu6_Filter_kubuncount=0;
var Menu6_Filter_status=0;	//	0=���ׂ� 1=���g�p 2=�g�p��
var Menu6_Filter_Edited="";
var Menu6_SelectedUser;
var Menu6_SelectedClass;
var Menu6_SelectedDrive;
var Menu6_SelectedSerial;
//------------------------------------------------------------------------------------
function MENU6()
	{
	if (ConfigAll.Remote.Host!="") 
		{
		ClearKey();
		ClearLayer("Stage");
		SetOverflow("y");
		Keys[11]="MainMenu()";
		WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
		WriteLayer("Stage","<span class=size3>���C�����j���[���}�[�J�[�Ǘ�</span><br>"+hr());
		AddKey("Stage",1,"�}�[�J�[�̍�ƈ˗�","MENU6C_Output()");
		AddKey("Stage",2,"�����[�g��ƌ��ʎ擾","MENU6C_Remote()");
		AddKey("Stage",3,"�}�[�J�[�̕ҏW","MENU6B()");
		AddKey("Stage",0,"���C�����j���[�֖߂�","MainMenu()");
		window.scrollTo(0,0);
		document.body.focus();
		}
	else{
		MENU6B();
		}
	}
//------------------------------------------------------------------------------------
function MENU6A()
	{
	var s,obj,i,cells,l,num,seq,trfunc;
	var kubun,mmap,mapnum,m,vhist,vchar,dchar;
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MainMenu()";
	for(i in kbn) delete kbn[i];
	kbn["���ׂ�"]=0;
	kubuncount=1;
	Menu6_Filter_kubuncount=0;
	WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
	WriteLayer("Stage","<span class=size3>���C�����j���[�����������</span><br>"+hr());
	AddKey("Stage",0,"���C�����j���[�֖߂�","MainMenu()");

	for(num in Cards)
		{
		kubun=Cards[num].kubun;
		if (!(kubun in kbn))
			{
			Menu6_Filter_kubuncount++;
			kbn[kubun]=Menu6_Filter_kubuncount;
			}
		}

	//	���o��---------------------------------------------------------------------
	s="<table border=1 cellpadding=5 cellspacing=0><tr class=HEAD>";
	s+="<td align=center class=size2 width=50>���ԍ�</td>";
	s+="<td align=center class=size2 width=200>��於</td>";
	s+="<td align=center class=size2 width=100>�敪<br>";
	s+="<select size=1 onChange='MENU6_kubun_Change(this.selectedIndex);MENU6A()'>";
	for(i in kbn)
		{
		if (i=="���ׂ�")
			{
			if (Menu6_Filter_kubun=="") s+="<option selected>";else s+="<option>";
			s+="���ׂ�</option>";
			}
		else{
			if (Menu6_Filter_kubun==i) s+="<option selected>";else s+="<option>";
			s+=i+"</option>";
			}
		}
	s+="</select></td>";
	s+="<td align=center class=size2 width=50>�n�}�ԍ�</td>";
	s+="<td align=center class=size2 width=50>����</td>";
	s+="<td align=center class=size2 width=100>�I������</td>";
	s+="<td align=center class=size2 width=200>�g�p��<br>";
	s+="<select size=1 onChange='MENU6_status_Change(this.selectedIndex);MENU6A()'>";

	if (Menu6_Filter_status==0) s+="<option selected>";else s+="<option>";
	s+="���ׂ�</option>";
	if (Menu6_Filter_status==1) s+="<option selected>";else s+="<option>";
	s+="���g�p�̂�</option>";
	if (Menu6_Filter_status==2) s+="<option selected>";else s+="<option>";
	s+="�g�p���̂�</option>";
	s+="</select></td>";
	s+="</tr>";
	//	�ꗗ�\---------------------------------------------------------------------
	for(num in Cards)
		{
		if (!Cards[num].NowUsing) continue;				//	�g�p���łȂ����͏���
		if (isCampeign(Cards[num].lastuse)) continue;	//	�L�����y�[�����ɊJ�n�������͑ΏۊO
		if ((Menu6_Filter_kubun!="")&&(Cards[num].kubun!=Menu6_Filter_kubun)) continue;
		Markers=LoadMarker(num);
		if (Markers.Count<1) continue;
		mapnum=parseInt(Cards[num].count,10);
		mmap=new Array();
		for(i=1;i<=mapnum;i++)
			{
			mmap[i]=new Object();
			mmap[i].Count=0;
			mmap[i].Using=false;
			mmap[i].User="";
			}
		for(i in Markers.Map)
			{
			for(j=0;j<Markers.Map[i].Points.length;j++)
				{
				vhist=parseInt(Markers.Map[i].Points[j].History,10);
				if (vhist!=2) continue;
				mmap[i].Count++;
				if (Markers.Map[i].User!="")
					{
					mmap[i].Using=true;
					mmap[i].User=Markers.Map[i].User;
					}
				}
			}
		for(j=1;j<=mapnum;j++)
			{
			if (mmap[j].Count==0) continue;
			if ((Menu6_Filter_status==1)&&(mmap[j].Using)) continue;
			if ((Menu6_Filter_status==2)&&(!mmap[j].Using)) continue;
			trfunc="";
			if (!mmap[j].Using)
				{
				trfunc=" style='cursor:pointer;' onclick='MENU6Big("+num+","+j+")' title='���̒n�}��ݏo���܂�'";
				}
			else{
				trfunc=" style='cursor:pointer;' onclick='MENU6Return("+num+","+j+",\""+mmap[j].User+"\")' title='���̒n�}�̑ݏo���������܂�'";
				}
			s+="<tr>";
			s+="<td align=right"+trfunc+">"+num+"</td>";				//	���ԍ�
			s+="<td"+trfunc+">"+Cards[num].name+"</td>";				//	��於
			s+="<td"+trfunc+">"+Cards[num].kubun+"</td>";				//	�敪��
			s+="<td align=right"+trfunc+">"+j+"</td>";				//	�n�}�ԍ�
			s+="<td align=right"+trfunc+">"+mmap[j].Count+"</td>";	//	������
			s+="<td align=center"+trfunc+">"+SplitDate(GetOverDay(num))+"</td>";
			if (mmap[j].Using)
				{
				s+="<td"+trfunc+" bgcolor='#ffff00'>�g�p���i"+mmap[j].User+"�j</td>";
				}
			else{
				s+="<td"+trfunc+" bgcolor='#00ffff'>���g�p</td>";
				}
			s+="</tr>";
			}
		}
	s+="</table>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	document.body.focus();
	}

function MENU6_kubun_Change(num)
	{
	var i;
	if (num==0) Menu6_Filter_kubun="";
	else{
		for (i in kbn)
			{
			if (kbn[i]==num) break;
			}
		Menu6_Filter_kubun=i;
		}
	}

function MENU6_status_Change(num)
	{
	Menu6_Filter_status=num;
	}

function MENU6Big(num,seq)
	{
	var s,i,x,found,file;
	var d1,d2;
	var r,rmap,Bmap="",sb,sobj;
	var scr="";
	var vml=new Poly();
	var BTB;
	vml.mapsize=1;

	r=GetImageInfo(PNGFile(num,seq));
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("");
	MapZoom=false;

	file=fso.FileExists(PNGFile(num,seq));
	s="<div class=size5 align=center>��"+num+"�u"+Cards[num].name+"�v"+nums.charAt(seq-1)+"</div>";
	WriteLayer("Stage",s);

	s="";
	s+=AddKeys(1,"���̒n�}��݂��o��","MENU6_Start("+num+","+seq+")");
	s+=AddKeys(0,"�߂�","CloseFloatings();MENU6A()");
	FloatingMenu.Title="���j���[";
	FloatingMenu.Content=s;
	FloatingMenu.Create("MENU",20,20,3,240,100);
	Keys[11]="CloseFloatings();MENU6A()";
	s="";
	if (file)
		{
		s+="<img src='"+PNGFile(num,seq)+NoCache()+"' onload='ImageMap.Adjust()'>";
		}
	else s+="�i�摜�f�[�^������܂���j";

	//	�r�����̓Ǎ�
	ReadBuilding(num);

	//	�}�[�J�[���̍���
	Markers=LoadMarker(num);
	SetMarkersToBuilding(0,Markers,1);		//	�r�����Ƀ}�[�J�[�𔽉f������
	s+=DrawMarker(Markers,seq,1,1,2);

	//	�r�������d�˂�
	if (Building!="")
		{
		for(i in Building.building)
			{
			rmap=parseInt(Building.building[i].map,10);
			if (rmap!=seq) continue;
			s+=CreateBuildingImage(num,seq,0,i,"",1,1,0);
			}
		}
	ImageMap.Content=s;
	ImageMap.Create("MAP",window["Stage"],MaxWidth-40,MaxHeight-100);
	window.scrollTo(0,0);
	document.body.focus();
	}
//---------------------------------------------------------------------------
function MENU6_Start(num,seq)
	{
	var s;
	CloseFloatings();
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MENU6Big("+num+","+seq+")";
	window.scrollTo(0,0);
	s="<div class=size5>�i���������j��"+num+"�u"+Cards[num].name+"�v�|"+nums.charAt(seq-1)+"�̑ݏo</div>"+hr();
	s+="<div class=size3><form onsubmit='MENU6_Start_Exec("+num+","+seq+");return false;'>";
	s+="�g�p�Җ��F"+Field(0,30,true,1)+"<br>";
	s+="<input type=button value='�g�p�J�n' onClick='MENU6_Start_Exec("+num+","+seq+")'>";
	s+="<input type=button value='�߂�' onClick='MENU6Big("+num+","+seq+")'></form>";
	WriteLayer("Stage",s);
	s=UserPad2();
	WriteLayer("Stage",s);
	Focus(0);
	}
//---------------------------------------------------------------------------
function MENU6_Start_Exec(num,seq)
	{
	var a,b,bcnt,bp,bp2,cmf;
	var ymd,maxlogs,text;
	var stream,text,s;
	var today=new Date();
	var lines=new Array();
	var logline=new Array();
	var lastdata;
	var overday,counts;
	var num,seq,inx;
	var i,j,vhist;

	a=document.forms[0].elements[0].value;
	if (CheckUser(a)) return;

	if (!isAvailable("B",num,seq,a))
		{
		alert("�ݏo�������ɁA���̃��[�U�[�ɂ���đݏo�����s����܂����B\n�����ɂ��Ȃ����ԓx�������A�i��ŏ���܂��傤�B");
		ClearLayer("Stage");
		MENU6A();
		return;
		}

	//	�O���v���O�����Ƃ��ČĂяo��
	ClearLayer("Stage");
	WriteLayer("Stage","�������ł��c");
	cmd="rentB.wsf "+congnum+":"+a+":"+num+":"+seq;
	var objResult=RunWSF(cmd);
	if (objResult!="ok")
		{
		alert("���������݂��o���������ɃG���[���������A���������s���܂����B");
		}

	var pdffile=GetMyMap(num,seq,"",a);
	if (pdffile=="")
		{
		alert("�݂��o���n�}�̈���Ɏ��s���܂����B");
		}
	else{
		PrintMarkerMap(num,seq,pdffile);
		}
	MENU6A();
	}

function MENU6Return(num,seq,userid)
	{
	var cmf,userid,pdffile;
	cmf=confirm("��"+num+"�u"+Cards[num].name+"�v�|"+nums.charAt(seq-1)+"�̑ݏo���������܂����H");
	if (!cmf) return;

	//	PDF�t�@�C�������擾����
	pdffile=GetMyMap(num,seq,"",userid);
	pdffile=fso.GetFileName(pdffile);

	//	�O���v���O�����Ƃ��ČĂяo��
	ClearLayer("Stage");
	WriteLayer("Stage","�������ł��c");
	cmd="cancel.wsf "+congnum+" "+userid+" "+pdffile;
	var objResult=RunWSF(cmd);
	if (objResult.indexOf("NO=",0)!=-1)
		{
		alert("���������ԋp�������ɃG���[���������A���������s���܂����B");
		}
	MENU6A();
	}
//------------------------------------------------------------------------------------
function MENU6B()
	{
	var s,obj,i,cells,l,num,seq,trfunc,ctr,edited;
	var kubun,mmap,mapnum,m,vhist,vchar,dchar;
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MENU6()";
	for(i in kbn) delete kbn[i];
	kbn["���ׂ�"]=0;
	kubuncount=1;
	Menu6_Filter_kubuncount=0;
	WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
	WriteLayer("Stage","<span class=size3>���C�����j���[���}�[�J�[�Ǘ����}�[�J�[�̕ҏW</span><br>"+hr());
	AddKey("Stage",0,"�߂�","MENU6()");

	for(num in Cards)
		{
		kubun=Cards[num].kubun;
		if (!(kubun in kbn))
			{
			Menu6_Filter_kubuncount++;
			kbn[kubun]=Menu6_Filter_kubuncount;
			}
		}

	//	���o��---------------------------------------------------------------------
	s="<table border=1 cellpadding=5 cellspacing=0><tr class=HEAD>";
	s+="<td align=center class=size2 width=50>���ԍ�</td>";
	s+="<td align=center class=size2 width=200>��於</td>";
	s+="<td align=center class=size2 width=100>�敪<br>";
	s+="<select size=1 onChange='MENU6_kubun_Change(this.selectedIndex);MENU6B()'>";
	for(i in kbn)
		{
		if (i=="���ׂ�")
			{
			if (Menu6_Filter_kubun=="") s+="<option selected>";else s+="<option>";
			s+="���ׂ�</option>";
			}
		else{
			if (Menu6_Filter_kubun==i) s+="<option selected>";else s+="<option>";
			s+=i+"</option>";
			}
		}
	s+="</select></td>";
	s+="<td align=center class=size2 width=50>�n�}�ԍ�</td>";
	s+="<td align=center class=size2 width=50>����</td>";
	s+="<td align=center class=size2 width=200>�L����";
	s+="<select size=1 onChange='MENU6_Edited_Change(this.selectedIndex);MENU6B()'>";
	s+="<option";if (Menu6_Filter_Edited=="") s+=" selected";
	s+=">���ׂ�</option>";
	s+="<option";if (Menu6_Filter_Edited=="���ҏW") s+=" selected";
	s+=">���ҏW</option>";
	s+="<option";if (Menu6_Filter_Edited=="��ƈ˗���") s+=" selected";
	s+=">��ƈ˗���</option>";
	s+="<option";if (Menu6_Filter_Edited=="�ҏW��") s+=" selected";
	s+=">�ҏW��</option>";
	s+="</select></td></tr>";
	//	�ꗗ�\---------------------------------------------------------------------
	for(num in Cards)
		{
		if ((Menu6_Filter_kubun!="")&&(Cards[num].kubun!=Menu6_Filter_kubun)) continue;
		if (Cards[num].status.indexOf("�g�p��",0)!=-1) continue;
		mapnum=parseInt(Cards[num].count,10);
		Markers=LoadMarker(num);
		for(j=1;j<=mapnum;j++)
			{
			edited=0;
			if (j in Markers.Map)
				{
				if (Markers.Map[j].Edited=="Working")
					{
					edited=1;
					}
				if (Markers.Map[j].Edited=="True")
					{
					edited=2;
					}
				}
			if (Menu6_Filter_Edited!="")
				{
				if ((edited==0)&&(Menu6_Filter_Edited!="���ҏW")) continue;
				if ((edited==1)&&(Menu6_Filter_Edited!="��ƈ˗���")) continue;
				if ((edited==2)&&(Menu6_Filter_Edited!="�ҏW��")) continue;
				}
			trfunc=" style='cursor:pointer;' onclick='MENU6B_Edit("+num+","+j+")' title='���̒n�}�̃}�[�J�[��ҏW���܂�'";
			if (edited==1)
				{
				trfunc=" style='cursor:pointer;' onclick='MENU6B_WorkingCancel("+num+","+j+")' title='���̒n�}�̍�ƈ˗����L�����Z�����܂�'";
				}
			s+="<tr>";
			s+="<td align=right"+trfunc+">"+num+"</td>";				//	���ԍ�
			s+="<td"+trfunc+">"+Cards[num].name+"</td>";				//	��於
			s+="<td"+trfunc+">"+Cards[num].kubun+"</td>";				//	�敪��
			s+="<td align=right"+trfunc+">"+j+"</td>";					//	�n�}�ԍ�
			ctr=0;
			if (j in Markers.Map)
				{
				ctr=Markers.Map[j].Points.length;
				}
			s+="<td align=right"+trfunc+">"+ctr+"</td>";				//	������
			if (j in Markers.Map)
				{
				if (Markers.Map[j].Edited=="True")
					{
					s+="<td"+trfunc+" bgcolor='#ffff00'>�ҏW�ρi"+Markers.Map[j].Editor+"�j</td></tr>";
					continue;
					}
				if (Markers.Map[j].Edited=="Working")
					{
					s+="<td"+trfunc+" bgcolor='#ff66bb'>��ƈ˗����i"+Markers.Map[j].Editor+"�j</td></tr>";
					continue;
					}
				}
			s+="<td"+trfunc+" bgcolor='#00ffff'>���ҏW</td></tr>";
			}
		}
	s+="</table>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	document.body.focus();
	}

function MENU6B_WorkingCancel(num,seq)
	{
	var remote=false;
	var a=confirm("���̒n�}�̍�ƈ˗����������܂����H");
	if (!a) return;
	Markers=LoadMarker(num);
	if (seq in Markers.Map)
		{
		if (Markers.Map[seq].Editor=="�����[�g���[�U�[") remote=true;
		Markers.Map[seq].Editor="";
		Markers.Map[seq].Edited="False";
		SaveMarker(num,Markers);
		}
	//	�����[�g���[�U�[�̍�Ǝ��
	if (remote)
		{
		var remotedir1=ConfigAll.Remote.Directory+"/mapeditor/input";
		var ftpsrc=fso.CreateTextFile(LocalFolder()+"ftp.src",true);
		ftpsrc.WriteLine("open "+ConfigAll.Remote.Host);
		ftpsrc.WriteLine(ConfigAll.Remote.User);
		ftpsrc.WriteLine(ConfigAll.Remote.Password);
		ftpsrc.WriteLine("cd "+remotedir1);
		ftpsrc.WriteLine("delete "+num+"-"+seq+".xml");
		ftpsrc.WriteLine("bye");
		ftpsrc.close();
		WshShell.CurrentDirectory=LocalFolder();
		var cmd="ftp -s:ftp.src";
		WshShell.Run(cmd,0,false);
		WshShell.CurrentDirectory=basepath;
		}
	MENU6B();
	}

function MENU6_Edited_Change(num)
	{
	var i;
	if (num==0) Menu6_Filter_Edited="";
	if (num==1) Menu6_Filter_Edited="���ҏW";
	if (num==2) Menu6_Filter_Edited="��ƈ˗���";
	if (num==3) Menu6_Filter_Edited="�ҏW��";
	}

function MENU6B_Edit(num,seq)
	{
	StartNewMapEditor(num,seq);
//	EditMarker(num,seq,"MasterClient");
	}
//------------------------------------------------------------------------------------
var ClientUsers;
var SelectedClientUser;
//------------------------------------------------------------------------------------
var TaskList;
function MENU6C_Output()
	{
	var s,obj,i,cells,l,num,seq,trfunc,ctr,edited;
	var kubun,mmap,mapnum,m,vhist,vchar,dchar;
	TaskList=new Array();
	ClearKey();
	ClearLayer("Stage");
	SetOverflow("y");
	Keys[11]="MENU6()";
	WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
	WriteLayer("Stage","<span class=size3>���C�����j���[�����������}�[�J�[�̍�ƈ˗�</span><br>"+hr());
	AddKey("Stage",1,"��Ƃ��˗�����","MENU6C_Publish()");
	AddKey("Stage",0,"�߂�","MENU6()");
	//	���o��---------------------------------------------------------------------
	s="<table border=1 cellpadding=5 cellspacing=0><tr class=HEAD>";
	s+="<td align=center class=size2 width=50>�˗�</td>";
	s+="<td align=center class=size2 width=50>���ԍ�</td>";
	s+="<td align=center class=size2 width=240>��於</td>";
	s+="<td align=center class=size2 width=100>�敪</td></tr>";
	//	�ꗗ�\---------------------------------------------------------------------
	ctr=0;
	for(num in Cards)
		{
		if (Cards[num].status.indexOf("�g�p��",0)!=-1) continue;
		mapnum=parseInt(Cards[num].count,10);
		Markers=LoadMarker(num);
		for(j=1;j<=mapnum;j++)
			{
			edited=0;
			if (j in Markers.Map)
				{
				if (Markers.Map[j].Edited=="Working")
					{
					edited=1;
					}
				if (Markers.Map[j].Edited=="True")
					{
					edited=2;
					}
				}
			if (edited!=0) continue;
			s+="<tr><td bgcolor='#ffffcc' align=center><input type=checkbox style='width:26px;height:26px;' onclick='AddTaskList("+num+","+j+")'>";
			s+="<td align=right>"+num+"-"+j+"</td>";		//	���ԍ�
			s+="<td>"+Cards[num].name+"</td>";				//	��於
			s+="<td>"+Cards[num].kubun+"</td></tr>";		//	�敪��
			ctr++;
			}
		}
	if (ctr==0)
		{
		s+="<tr><td colspan=4 align=center class=size3>�˗��ł����Ƃ�����܂���B</td></tr>";
		}
	s+="</table>";
	WriteLayer("Stage",s);
	window.scrollTo(0,0);
	document.body.focus();
	}

function AddTaskList(num,seq)
	{
	var key=num+"-"+seq;
	if (key in TaskList)
		{
		delete TaskList[key];
		return;
		}
	TaskList[key]=new Object();
	TaskList[key].num=num;
	TaskList[key].seq=seq;
	}
//---------------------------------------------------------------------
function MENU6C_Publish()
	{
	var i,j,num,seq,p,r,cmd;
	var c=0;
	var obj,taskinp;
	var InputFolder;

	//	�����Ώےn�}�����̃J�E���g
	for(i in TaskList) c++;
	if (c==0)
		{
		alert("��ƈ˗�����n�}�ɍŒ�P�`�F�b�N�����Ă��������B");
		return;
		}

	//	���t�̍쐬
	var date=new Date();
	var yy=date.getFullYear();
	var mm=date.getMonth()+1;
	var dd=date.getDate();
	var h=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var ymd=yy+"/"+mm+"/"+dd;
	if (mm<10) mm="0"+mm;else mm+="";
	if (dd<10) dd="0"+dd;else dd+="";
	if (h<10) h="0"+h;else h+="";
	if (m<10) m="0"+m;else m+="";
	if (s<10) s="0"+s;else s+="";
	var ymd1="job"+yy+mm+dd+"-"+h+m+s;

	//	�����[�g���[�U�[�̏��� --------------------------------
	r=confirm("�����[�g���[�U�[�p�T�[�o�[�ɍ�ƈ˗��f�[�^�𑗐M���܂��B\n��낵���ł����H");
	if (!r) return;
	//	FTP�\�[�X�̍쐬
	var localdir1=LocalFolder()+"mapinput";
	var localdir2=LocalFolder()+"mapimage";
	var remotedir1=ConfigAll.Remote.Directory+"/mapeditor/input";
	var remotedir2=ConfigAll.Remote.Directory+"/mapeditor/image";
	var ftpsrc=fso.CreateTextFile(LocalFolder()+"ftp.src",true);
	if (fso.FolderExists(localdir1)) fso.DeleteFolder(localdir1);
	if (fso.FolderExists(localdir2)) fso.DeleteFolder(localdir2);
	fso.CreateFolder(localdir1);
	fso.CreateFolder(localdir2);
	ftpsrc.WriteLine("open "+ConfigAll.Remote.Host);
	ftpsrc.WriteLine(ConfigAll.Remote.User);
	ftpsrc.WriteLine(ConfigAll.Remote.Password);
	ftpsrc.WriteLine("prompt");
	ftpsrc.WriteLine("binary");
	ftpsrc.WriteLine("lcd "+localdir1);
	ftpsrc.WriteLine("cd "+remotedir1);
	ftpsrc.WriteLine("mput *.xml");
	ftpsrc.WriteLine("lcd "+localdir2);
	ftpsrc.WriteLine("cd "+remotedir2);
	ftpsrc.WriteLine("mput *.jpg");
	ftpsrc.WriteLine("bye");
	ftpsrc.close();

	//	����XML�̍쐬
	for(i in TaskList)
		{
		num=TaskList[i].num;
		seq=TaskList[i].seq;
		r=GetImageInfo(PNGFile(num,seq));
		Markers=LoadMarker(num);
		if (!(seq in Markers.Map))
			{
			Markers.Map[seq]=new Object();
			Markers.Map[seq].User="";
			Markers.Map[seq].Points=new Array();
			}
		Markers.Map[seq].Editor="�����[�g���[�U�[";
		Markers.Map[seq].Edited="Working";
		SaveMarker(num,Markers);
		if (fso.FileExists(PNGFile(num,seq)))
			{
			try	{
				Irfan(PNGFile(num,seq)+" /gray /jpgq=50 /convert="+localdir2+qt+num+"-"+seq+".jpg");
				fso.CopyFile(ThumbFile(num,seq),localdir2+qt+"thumb"+num+"-"+seq+".jpg",true);
				}
			catch(e){}
			}
		taskinp=new Object();
		taskinp.Job=new Array();
		taskinp.Job[0]=new Object();
		taskinp.Job[0].Num=num;
		taskinp.Job[0].Seq=seq;
		taskinp.Job[0].Name=Cards[num].name;
		taskinp.Job[0].StartDate=ymd;
		taskinp.Job[0].LimitDate=AddDays(ymd,14);
		taskinp.Job[0].JobDate="";
		taskinp.Job[0].Editor="";
		taskinp.Job[0].width=r.x;
		taskinp.Job[0].height=r.y;
		taskinp.Job[0].Points=new Array();
		taskinp.Job[0].Points=clone(Markers.Map[seq].Points);
		WriteXMLtoUTF8(taskinp,localdir1+qt+num+"-"+seq+".xml");
		if (!fso.FileExists(localdir1+qt+"build"+num+".xml"))
			{
			var bbody=ReadXMLFile(BuildingFile(num),true);
			WriteXMLtoUTF8(bbody,localdir1+qt+"build"+num+".xml");
			}
		}
	ClearKey();
	ClearLayer("Stage");
	WriteLayer("Stage","��ƈ˗��������[�g���[�U�[�p�T�[�o�[�ɓ]�����Ă��܂��B���΂炭���҂����������B");
	setTimeout("RemoteFTP_Send()",50);
	}

function RemoteFTP_Send()
	{
	WshShell.CurrentDirectory=LocalFolder();
	cmd="ftp -s:ftp.src";
	WshShell.Run(cmd,1,true);
	WshShell.CurrentDirectory=basepath;
	alert("��ƈ˗��������[�g���[�U�[�p�T�[�o�[�ɓ]�����܂����B");
	MENU6C_Output();
	}

//	��ƌ��ʂ̎���(�����[�g�j----------------------------------------------------------
function MENU6C_Remote()
	{
	var r=confirm("�����[�g���[�U�[�p�T�[�o�[�ɐڑ����A��ƌ��ʂ���荞�݂܂��B\n��낵���ł����H");
	if (!r) return;
	setTimeout("RemoteFTP_Receive()",50);
	MENU6();
	}

function RemoteFTP_Receive()
	{
	var success=new Array();
	var result;
	var i,j;

	//	FTP�\�[�X�̍쐬
	var localdir=LocalFolder()+"mapoutput";
	var remotedir=ConfigAll.Remote.Directory+"/mapeditor/output";
	var ftpsrc=fso.CreateTextFile(LocalFolder()+"ftp.src",true);
	if (fso.FolderExists(localdir)) fso.DeleteFolder(localdir);
	fso.CreateFolder(localdir);
	ftpsrc.WriteLine("open "+ConfigAll.Remote.Host);
	ftpsrc.WriteLine(ConfigAll.Remote.User);
	ftpsrc.WriteLine(ConfigAll.Remote.Password);
	ftpsrc.WriteLine("prompt");
	ftpsrc.WriteLine("binary");
	ftpsrc.WriteLine("lcd "+localdir);
	ftpsrc.WriteLine("cd "+remotedir);
	ftpsrc.WriteLine("mget *.xml");
	ftpsrc.WriteLine("bye");
	ftpsrc.close();

	//	FTP�̎��s
	WshShell.CurrentDirectory=LocalFolder();
	cmd="ftp -s:ftp.src";
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=basepath;

	//	�t�@�C���ꗗ�̎擾
	var dir,files,obj,file;
	dir=fso.GetFolder(localdir);
	files=new Enumerator(dir.Files);
	for(; !files.atEnd();files.moveNext())
		{
		obj=files.item();
		file=obj.Name;
		if (file.indexOf(".xml",0)==-1) continue;
		result=GetRemoteWorks(localdir+qt+file);
		if (result)
			{
			success.push(file);
			}
		}

	if (success.length==0)
		{
		alert("�����[�g���[�U�[����̍�ƌ��ʂ͂���܂���ł����B");
		return;
		}

	//	����������ƌ��ʂ́A�����σf�B���N�g������폜����
	ftpsrc=fso.CreateTextFile(LocalFolder()+"ftp.src",true);
	ftpsrc.WriteLine("open "+ConfigAll.Remote.Host);
	ftpsrc.WriteLine(ConfigAll.Remote.User);
	ftpsrc.WriteLine(ConfigAll.Remote.Password);
	ftpsrc.WriteLine("prompt");
	ftpsrc.WriteLine("cd "+remotedir);
	for(i=0;i<success.length;i++)
		{
		ftpsrc.WriteLine("delete "+success[i]);
		}
	ftpsrc.WriteLine("bye");
	ftpsrc.close();
	WshShell.CurrentDirectory=LocalFolder();
	cmd="ftp -s:ftp.src";
	WshShell.Run(cmd,0,true);
	WshShell.CurrentDirectory=basepath;

	alert("�����[�g���[�U�[�����"+success.length+"���̍�ƌ��ʂ��󂯕t���܂����B");
	}

function GetRemoteWorks(filename)
	{
	var res,i,j,s;
	var num,seq,f;

	res=ReadXMLfromUTF8(filename,true);
	if (res=="") return false;
	if (!("Job" in res)) return false;

	for(i in res.Job)
		{
		num=parseInt(res.Job[i].Num,10);
		seq=parseInt(res.Job[i].Seq,10);
		if (!(num in Cards)) continue;								//	���݂��Ȃ��n�}�͖���
		if (Cards[num].status.indexOf("�g�p��",0)!=-1) continue;	//	������d�J�n����
		Markers=LoadMarker(num);
		if (!(seq in Markers.Map)) continue;				//	�n�}�}�[�J�[������
		if (Markers.Map[seq].Edited!="Working")	continue;	//	�ҏW���łȂ�
		//	��Ǝ�t�n�j
		Markers.Map[seq].Edited="True";						//	�ҏW�ς݂�
		if ("Points" in res.Job[i])
			{
			for(j=0;j<res.Job[i].Points.length;j++)
				{
				if (res.Job[i].Points[j].char!="��")
					{
					res.Job[i].Points.splice(j,1);
					j--;
					}
				}
			Markers.Map[seq].Points=clone(res.Job[i].Points);	//	�ҏW�_���R�s�[
			}
		else{
			Markers.Map[seq].Points=new Array();
			}
		SaveMarker(num,Markers);
		}
	return true;
	}

