//------------------------------------------------------------------------------------
//	�����e�i���X���j���[
//------------------------------------------------------------------------------------
function MENU3()
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
	WriteLayer("Stage","<span class=size3>���C�����j���[�������e�i���X</span><br>"+hr());
	
	AddKey("Stage",1,"���ݒ�","MENU3E()");
	AddKey("Stage",2,"�ĕҐ�","MENU3F()");
	AddKey("Stage",0,"���C�����j���[�֖߂�","MainMenu()");
	window.scrollTo(0,0);
	document.body.focus();
	}

//------------------------------------------------------------------------------------
//	Quicky�ݒ胁�j���[
//------------------------------------------------------------------------------------
function MENU3E()
	{
	var s="";
	ClearKey();
	ClearLayer("Stage");
	WriteLayer("Stage",SysImage("cwministry.png")+"<br>");
	s+="<span class=size3>���C�����j���[�������e�i���X�����ݒ�</span><br>"+hr();
	s+="<form onsubmit='MENU3E_Exec();return false;'>";

	s+="<div class=size4>�P�D��O�ݒ�</div>";
	s+="<span class=size3><ul>";
	s+="<li>��O���F<input name='CongName' size=40 value='"+ConfigAll.CongName+"'><br>";
	s+="</li></ul></span>";

	s+="<div class=size4>�Q�D�����Ԋu</div>";
	s+="<span class=size3>";
	s+="���J�n���玩���I���܂ł̓���<br>";
	s+="<ul>";
	s+="<li>�ʏ�̋��F<input name='Auto1' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.AutoEndDefault+"'>��</li>";
	s+="<li>�W�������݁F<input name='Auto2' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.AutoEndApart+"'>��</li>";
	s+="<li>����߰݊��Ԓ��F<input name='Auto3' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.AutoEndCampeign+"'>��</li>";
	s+="</ul>";
	s+="���I�����玟�̊J�n�܂ł̓���<br>";
	s+="<ul>";
	s+="<li>�ʏ�̊��ԁF<input name='Blank1' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.BlankMin+"'>��</li>";
	s+="<li>����߰݊��Ԓ��F<input name='Blank2' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.BlankCampeign+"'>��</li>";
	s+="<li>����߰݌�30���F<input name='Blank3' type=text size=6 style='text-align:rignt;ime-mode:disabled;' value='"+ConfigAll.BlankAfterCampeign+"'>��</li>";
	s+="</ul></span>";

	s+="<div class=size4>�R�D�O���A�v���P�[�V����</div>";
	s+="<span class=size3><ul>";
	s+="<li>�n�}�ҏW�p�A�v���P�[�V�����̏ꏊ�F<input name='Apps1'  type=text size=40 value='"+ConfigLocal.MapEditor+"'><input type=button value='�Q�Ɓc' onclick='BrowseExe()'>";
	s+="<span style='visibility:hidden;'><input name='AppFile' type=file onchange='BrowseExe2()'></span></li></ul></span>";

/*	2018/5/8	���v���O�������R�����g���A�V�v���O������ǉ�		*/
/*
	s+="<div class=size4>�S�D�L�����y�[���ݒ�</div>";
	s+="<span class=size3><ul>";
	s+="<li>�L�����y�[�����ԁF<input name='CampeignStart' size=20 value='"+SplitDate(ConfigAll.Campeign.Start)+"'>";
	s+="�`<input name='CampeignEnd' size=20 value='"+SplitDate(ConfigAll.Campeign.End)+"'>";
	s+="</li></ul>";
*/
//	2018/5/8	�V�L�����y�[�W���ԃt�H�[����ǉ�-----------------------------------------------------
	s+="<div class=size4>�S�D�L�����y�[���ݒ�</div>";
	s+="<span class=size3><ul>";
	s+="<li>�ݒ�ϊ��ԁF<input type=button value='�V�K�ǉ�' onclick='MENU3E_AddCampeign()'><br><select size=5 name='CampeignList' style='width:200px;'>";
	for(i=0;i<ConfigAll.Campeigns.length;i++)
		{
		s+="<option value='"+i+"'>"+ConfigAll.Campeigns[i].Start+"�`"+ConfigAll.Campeigns[i].End+"</option>";
		}
	if (ConfigAll.Campeigns.length==0)
		{
		s+="<option value='-1'>�i���Ԗ��ݒ�j</option>";
		}
	s+="</select><br>";
	s+="<input type=button value='�I�������L�����y�[�����폜' onclick='MENU3E_DeleteCampeign()'><br></li></ul>";
//	2018/5/8	�V�L�����y�[�W���ԃt�H�[����ǉ�-----------------------------------------------------

	s+="<div class=size4>�T�D�����[�g�ݒ�</div>";
	s+="<span class=size3><ul>";
	s+="<li>�z�X�g���F<input name='RemoteHost' size=40 value='"+ConfigAll.Remote.Host+"'></li>";
	s+="<li>���[�U�[���F<input name='RemoteUser' size=40 value='"+ConfigAll.Remote.User+"'></li>";
	s+="<li>�p�X���[�h�F<input name='RemotePassword' size=40 value='"+ConfigAll.Remote.Password+"'></li>";
	s+="<li>�f�B���N�g���F<input name='RemoteDirectory' size=40 value='"+ConfigAll.Remote.Directory+"'></li>";
	s+="</ul>";

	s+="<br><input type=button value='���̂o�b���`�[�t�N���C�A���g�ɂ���' onClick='MENU3E_SetChief()'";
	if ("ChiefClient" in ConfigAll)
		{
		if (GetDriveSerialNumber("c")==ConfigAll.ChiefClient) s+=" disabled";
		}
	s+="><br>";
	s+="</span></form>";
	s+=hr();
	WriteLayer("Stage",s);
	Keys[11]="MENU3()";
	AddKey("Stage",1,"�ݒ蔽�f","MENU3E_Exec()");
	AddKey("Stage",0,"�߂�","MENU3()");
	}

function MENU3E_Exec()
	{
	var s;
	var app;
	var auto1,auto2,auto3,blank1,blank2,blank3;
	var cmstart,cmend;
	var remotehost,remoteuser,remotepassword,remotedirectory;

	auto1=document.forms[0].Auto1.value;
	auto2=document.forms[0].Auto2.value;
	auto3=document.forms[0].Auto3.value;
	blank1=document.forms[0].Blank1.value;
	blank2=document.forms[0].Blank2.value;
	blank3=document.forms[0].Blank3.value;
	app=document.forms[0].Apps1.value;
	remotehost=document.forms[0].RemoteHost.value;
	remoteuser=document.forms[0].RemoteUser.value;
	remotepassword=document.forms[0].RemotePassword.value;
	remotedirectory=document.forms[0].RemoteDirectory.value;
	congname=document.forms[0].CongName.value;

	auto1=auto1.trim();
	auto2=auto2.trim();
	auto3=auto3.trim();
	blank1=blank1.trim();
	blank2=blank2.trim();
	blank3=blank3.trim();
	app=app.trim();

	if (isNaN(auto1)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Auto1.focus();return;}
	if (isNaN(auto2)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Auto2.focus();return;}
	if (isNaN(auto3)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Auto3.focus();return;}
	if (isNaN(blank1)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Blank1.focus();return;}
	if (isNaN(blank2)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Blank2.focus();return;}
	if (isNaN(blank3)){alert("�����͐����Ŏw�肵�Ă��������B");document.forms[0].Blank3.focus();return;}
	if ((app!="")&&(!fso.FileExists(app)))
		{
		s=confirm("�n�}�ҏW�p�A�v���P�[�V������������܂���B\n���̂܂܋��s���܂����H");
		if (!s) return;
		}
	congname=congname.trim();

	//	�ݒ荀�ڂփZ�b�g
	ConfigAll.AutoEndDefault=parseInt(auto1,10);
	ConfigAll.AutoEndApart=parseInt(auto2,10);
	ConfigAll.AutoEndCampeign=parseInt(auto3,10);
	ConfigAll.BlankMin=parseInt(blank1,10);
	ConfigAll.BlankCampeign=parseInt(blank2,10);
	ConfigAll.BlankAfterCampeign=parseInt(blank3,10);
	ConfigLocal.MapEditor=app;
	ConfigAll.Remote.Host=remotehost.trim();
	ConfigAll.Remote.User=remoteuser.trim();
	ConfigAll.Remote.Password=remotepassword.trim();
	ConfigAll.Remote.Directory=remotedirectory.trim();
	ConfigAll.CongName=congname;

	//	�L�����y�[���ݒ�̏����o��
	var t0,t1;
	ConfigAll.Campeigns=new Array();
	if (document.forms[0].CampeignList.options[0].text!="�i���Ԗ��ݒ�j")
		{
		for(i=0;i<document.forms[0].CampeignList.length;i++)
			{
			t0=document.forms[0].CampeignList.options[i].text;
			t1=t0.split("�`");
			ConfigAll.Campeigns[i]=new Object();
			ConfigAll.Campeigns[i].Start=t1[0];
			ConfigAll.Campeigns[i].End=t1[1];
			}
		}

	CloseConfig();
	document.title="Congworks for Ministry "+Version+"("+congnum+":"+congname+")";
	LoadAllCards();
	MENU3();
	}
function BrowseExe()
	{
	document.forms[0].AppFile.click();
	}
function BrowseExe2()
	{
	var a=document.forms[0].AppFile.value;
	document.forms[0].Apps1.value=a;
	}
function MENU3E_SetChief()
	{
	var a=confirm("���̂o�b���`�[�t�N���C�A���g�ɐݒ肵�܂����H");
	if (!a) return;
	ConfigAll.ChiefClient=GetDriveSerialNumber("c");
	CloseConfig();
	MENU3E();
	}

//------------------------------------------------------------------------------------
//	�ĕҐ����j���[
//------------------------------------------------------------------------------------
function MENU3F()
	{
	var i,j,k,s,ss,Id,num,stream,text,p1,p2,p3,count,lines,maxlogs,logline;
	var dir,files,file,ext,need,a1,a2,refclip,logreg,stream,fullpath,fc,tmk;
	var a1,a2;
	var obj,l;
	var newpoints,newpoint,vh;
	var a=confirm("�s�v�f�[�^�̍ĕҐ����s���܂��B\n��낵���ł����H");
	if (!a) return;

	var dir=fso.GetFolder(DataFolder());
	var folders=new Enumerator(dir.SubFolders);
	for(; !folders.atEnd(); folders.moveNext())
		{
		obj=folders.item();
		if (isNaN(obj.Name)) continue;	//	�������̃t�H���_�����ĕҐ����Ȃ�
		num=fso.GetBaseName(obj.Name);
		if (isNaN(num)) continue;
		num=parseInt(num,10);
		count=Cards[num].count;

		/*	���O�t�@�C���̐���	*/
		obj=LoadLog(num);
		for(i in obj.History)
			{
			if (obj.History[i].Status=="Using") continue;
			if (obj.History[i].Compress==1) continue;
			obj.History[i].Compress=1;
			obj.History[i].Map=new Array();
			obj.History[i].Map[0]=new Object();
			obj.History[i].Map[0].Start=obj.History[i].Rent;
			obj.History[i].Map[0].End=obj.History[i].End;
			}
		SetLogSummary(obj);
		SaveLog(obj,num);
		//	���������̍ĕҐ�------------------------------------
		if (fso.FileExists(MarkerFile(num)))
			{
			k=0;kremain=0;
			tmk=LoadMarker(num);
			for(i in tmk.Map)
				{
				j=tmk.Map[i].Points.length;
				newpoints=new Array();
				for(j=0;j<tmk.Map[i].Points.length;j++)
					{
					kremain++;
					vh=parseInt(tmk.Map[i].Points[j].History,10);
					if (vh<=4)
						{
						newpoint=clone(tmk.Map[i].Points[j]);
						newpoints.push(newpoint);
						}
					else{
						k++;
						kremain--;
						}
					}
				tmk.Map[i].Points=clone(newpoints);
				}
			if (k>0)
				{
				SaveMarker(num,tmk);
				}
			}
		}
	//	�W���C���^�[�z���̍ĕҐ� --------------------------------
	dir=fso.GetFolder(ApartFolder());
	files=new Enumerator(dir.Files);
	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		fullpath=ApartFolder()+file;
		ext=fso.GetExtensionName(file).toLowerCase();
		if (ext!="txt") continue;
		var ApLog=ReadFile(fullpath);
		if (ApLog=="") continue;
		var ApLines=ApLog.split(/\r\n/);
		s="";a1="";
		for(i=0;i<ApLines.length;i++)
			{
			a2=ApLines[i];
			if (a1!=a2)
				{
				a1=a2;
				s+=a2+"\r\n";
				}
			}
		f=fso.CreateTextFile(fullpath,true);
		f.Write(s);
		f.close();
		}

	//	�q�X�g���[�̍ĕҐ�------------------------------------
	dir=fso.GetFolder(HistoryFolder());
	files=new Enumerator(dir.Files);
	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		fullpath=HistoryFolder()+file;
		ext=fso.GetExtensionName(file).toLowerCase();
		if (ext=="hs0")
			{
			fso.Deletefile(fullpath,true);
			}
		}
	alert("�ĕҐ����I�����܂����B");
	}
//---------------------------------------------------------------------------------------------
//	2018/5/8	�L�����y�[�����ԕ����Ή��̂��߈ȉ��̕�����ǉ�
//---------------------------------------------------------------------------------------------
function MENU3E_AddCampeign()
	{
	var i,j;
	var t0,t1,t2;
	var r1=prompt("�L�����y�[���̊J�n������͂��Ă�������\n��F2017/9/1","");
	if ((r1==null)||(r1=="")) return;
	r1=CheckDate("�L�����y�[���J�n��",r1);
	if (r1==true) return;
	var r2=prompt("�L�����y�[���̏I��������͂��Ă�������\n��F2017/9/30","");
	if ((r2==null)||(r2=="")) return;
	r2=CheckDate("�L�����y�[���I����",r2);
	if (r2==true) return;
	if (r2<r1){alert("�I�������J�n�����O�ł��B");return;}
	if (document.forms[0].CampeignList.options[0].text!="�i���Ԗ��ݒ�j")
		{
		t2=false;
		for(i=0;i<document.forms[0].CampeignList.length;i++)
			{
			t0=document.forms[0].CampeignList.options[i].text;
			t1=t0.split("�`");
			if ((r2<t1[0])||(r1>t1[1])) continue;
			t2=true;break;
			}
		if (t2)
			{
			alert("���͂��ꂽ���ԁi"+r1+"�`"+r2+"�j�����̃L�����y�[�����ԂƏd�����܂��B");
			return;
			}
		}
	i=document.forms[0].CampeignList.length;
	if ((i==1)&&(document.forms[0].CampeignList.options[0].text=="�i���Ԗ��ݒ�j"))
		{
		document.forms[0].CampeignList.options[0].value=0;
		document.forms[0].CampeignList.options[0].text=r1+"�`"+r2;
		return;
		}
	i++;
	document.forms[0].CampeignList.length=i;
	document.forms[0].CampeignList.options[i-1].value=0;
	document.forms[0].CampeignList.options[i-1].text=r1+"�`"+r2;
	}
//---------------------------------------------------------------------------------------------
function MENU3E_DeleteCampeign()
	{
	var tbl=new Array();
	var p=document.forms[0].CampeignList.selectedIndex;
	if (p==-1) return;
	if (document.forms[0].CampeignList.value==-1) return;
	for(i=0;i<document.forms[0].CampeignList.length;i++)
		{
		tbl[i]=document.forms[0].CampeignList.options[i].text;
		}
	tbl.splice(p,1);
	document.forms[0].CampeignList.length=i-1;
	for(i=0;i<tbl.length;i++)
		{
		document.forms[0].CampeignList.options[i].value=i;
		document.forms[0].CampeignList.options[i].text=tbl[i];
		}
	if (tbl.length==0)
		{
		document.forms[0].CampeignList.length=1;
		document.forms[0].CampeignList.options[0].value=-1;
		document.forms[0].CampeignList.options[0].text="�i���Ԗ��ݒ�j";
		}
	}
