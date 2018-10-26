function SetRefusesToBuilding(Bobj,ref,congnum,num)
	{
	var i,j,bs,bs1,bs2,tbl,seq,room;
	var p1,p2,lbl,obj,tobj;
	var s1,s2,s3,s4;
	if (Building=="") return;
	if (ref.length==0) return;
	for(i in Building.building)
		{
		Building.building[i].Temp=new Object();
		Building.building[i].Temp.Caption="";
		Building.building[i].Temp.Refuse=-1;
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
		for(j in Building.building)
			{
			if (Building.building[j].id!=obj.id) continue;
			tobj=Building.building[j].sequence[obj.sequence].stair[obj.stair].floor[obj.floor].room[obj.room];
			tobj.Temp=new Object();
			tobj.Temp.num=num;
			tobj.Temp.seq=i;
			tobj.Temp.KBN1=ref[i].KBN1;
			tobj.Temp.KBN2=ref[i].KBN2;
			tobj.Temp.Date=ref[i].Date;
			room=tobj.Text;
			if (Building.building[j].sequences>1)
				{
				lbl+=Building.building[j].sequence[obj.sequence].id+room;
				}
			else{
				lbl+=room;
				}
			if (Building.building[j].Temp.Caption=="")
				{
				Building.building[j].Temp.Caption+="��";
				}
			else Building.building[j].Temp.Caption+=",";
			Building.building[j].Temp.Caption+=lbl;
			break;
			}
		}
	}
//---------------------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------------------
function CreateBuildingImage(obj,congnum,mapnum,mapseq,zoomx,zoomy)
	{
	var CondMode=false;
	var i,j,k,s,seq;
	var ix,iy,ist,floors,rooms,ifl,iro;
	var x,y,mr,tobj;
	var refstring="";
	var SizeObj=new Object();
	var pix=new Array();
	for(i=1;i<=64;i++) pix[i]=Math.floor(i*zoomy*10)/10;

	if (("Condominium" in obj)) CondMode=true;	//	�W���Z��[�h
	s="<div align=center style='width:auto;overflow:visible;";
	s+="border:"+pix[8]+"px outset;text-align:center;background-color:#dddddd;";
	x=parseInt(obj.left,10);
	y=parseInt(obj.top,10);
	x=Math.floor(x*zoomx);
	y=Math.floor(y*zoomy);
	s+="z-index:5;";
	s+="position:absolute;";
	s+="left:"+x+"px;top:"+y+"px;";
	s+="'";
	s+="><div align=center style='width:auto;overflow:visible;border:inset "+pix[8]+"px;";
	s+="background-color:#0000ff;";
	s+="font-size:"+pix[48]+"px;color:#ffffff;padding:"+pix[4]+"px;font-weight:bold;white-space:nowrap;";
	s+="'";
	s+=">"+obj.id+"</div>";

	var tdisp=true;
	if (!("Temp" in obj)) tdisp=false;
	if (("Comment" in obj)&&(obj.Comment=="no")) tdisp=false;
	if (tdisp)
		{
		s+="<div align=left style='white-space:nowrap;color:#000000;font-size:"+pix[30]+"px;'>";
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
				if ("id" in obj.sequence[seq])
					{
					if (obj.sequence[seq].id!="") s+=obj.sequence[seq].id;
					}
				s+="<table border=0 cellpadding=0 cellspacing=0><tr>";
				for(ist in obj.sequence[seq].stair)
					{
					s+="<td align=center valign=bottom style='font-size:"+pix[fsize]+"px;color:#000000;white-space:nowrap;'>";
					if ("id" in obj.sequence[seq].stair[ist])	//	�K�i��
						{
						if (obj.sequence[seq].stair[ist].id!="") s+=obj.sequence[seq].stair[ist].id;
						}
					s+="<table border=0 cellpadding="+pix[4]+" cellspacing=0>";
					var ffl=true;
					for(ifl in obj.sequence[seq].stair[ist].floor)
						{
						var moved=false,detected=true;
						s+="<tr>";
						if (CondMode)	//	�W���Z��[�h�ł́A��d�Ώۂ̊K�ȊO�̓O���[�A�E�g
							{
							if (!("moved" in obj.sequence[seq].stair[ist].floor[ifl])) detected=false;
							else{
								if (obj.sequence[seq].stair[ist].floor[ifl].moved!=(mapnum+"-"+mapseq)) detected=false;
								}
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
							s+=obj.sequence[seq].stair[ist].floor[ifl].id;
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
							if ("Mark" in obj.sequence[seq].stair[ist].floor[ifl].room[iro])	//	�}�[�N�L��̃Z��
								{
								to=obj.sequence[seq].stair[ist].floor[ifl].room[iro].Mark;
								s+="background-repeat:no-repeat;background-position:center;background-size:contain;";
								switch (to.char)
									{
									case "��":
										s+="background-image:url(\"./sys/marks/redO"+fsize+".png\");";
										break;
									case "��":
										s+="background-image:url(\"./sys/marks/redOO"+fsize+".png\");";
										break;
									case "��":
										s+="background-image:url(\"./sys/marks/star"+fsize+".png\");";
										break;
									case "��*":
										s+="background-image:url(\"./img/marks/star"+fsize+".png\");";
										break;
									}
								}

							s+="'>";
							s+=obj.sequence[seq].stair[ist].floor[ifl].room[iro].Text+"</td>";
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
	s+="</table></div>";
	return s;
	}
