// =======================================================
function CreateRMAP(congnum,num,seq,rmode)
	{
	var s,x,y,z,i,j,v,lbl;
	var ax,ay,x1,x2,y1,y2;
	var ix,iy,ixf,py1,py2,px1,px2;
	var sp1="",sp2="";
	var obj=new Array();
	var Rvml=new Poly();
	var novml=false;

	if (!("Clip" in Cards[num]))
		{
		return "";
		}
	if (!(seq in Cards[num].Clip))
		{
		return "";
		}
	if (!("Area" in Cards[num].Clip[seq]))
		{
		return "";
		}
	var vml=Cards[num].Clip[seq].Area;		//	�n�}�͈͕̔\��
	var ContainCondominium=new Array();
	var BTB;								//	���L���
	var rck="";								//	�v�m�F���̓��e
	var wx1,wx2,wy1,wy2;					//	�\���E�B���h�D�̎l���̃O���[�o�����W
	var vt,vr,vx,vy,vz;

	Rvml.mapsize=1;
	Rvml.width=RMAP_VX;
	Rvml.height=RMAP_VY;

	//	�\���E�B���h�D�̈ʒu�i�o�^�l�j
	x=parseInt(Cards[num].Clip[seq].Left,10);
	y=parseInt(Cards[num].Clip[seq].Top,10);
	z=parseInt(Cards[num].Clip[seq].Zoom,10);
	vz=z/100;

	//	�\���E�B���h�D�̕\���͈́i�O���[�o�����W�j
	wx1=Math.floor(x/vz);
	wx2=wx1+Math.floor(RMAP_Width/vz)-1;
	wy1=Math.floor(y/vz);
	wy2=wy1+Math.floor(RMAP_Height/vz)-1;

	//	�n�}��̃G���A�\���i���W��ϊ��j
	if (vml.indexOf("vml:",0)==-1) novml=true;
	else
		{
		s=vml.replace("vml:","");
		vt=s.split(" ");
		for(i=0;i<vt.length;i++)
			{
			vr=vt[i].split(",");
			vx=parseInt(vr[0],10);
			vy=parseInt(vr[1],10);
			vx-=wx1;vx=Math.floor(vx*vz*0.7);
			vy-=wy1;vy=Math.floor(vy*vz*0.7);
			vt[i]=vx+","+vy;
			}
		vml="vml:"+vt.join(" ");
		Rvml.AddObject(vml,"","",1,1,"");
		}

	//	���ꂪ�W���Z��̋��ł���΁A�����Ɋ܂܂�Ă���W���Z���ێ����Ă���
	if (Cards[num].MapType==1)
		{
		for(i=0;i<Cards[num].Condominium.length;i++)
			{
			if (Cards[num].Condominium[i].Seq!=seq) continue;
			s=Cards[num].Condominium[i].Name;
			ContainCondominium[s]=true;
			}
		}

	//	�X�|�b�g������̍쐬(sp1=�����\�� sp2=�X�|�b�g����)
 	j=0;
	for(i=0;i<Spots.length;i++)
		{
		s=Spots[i].name;
		if (fso.FileExists(ApartFolder(congnum)+s+".xml"))				//	�X�|�b�g���͏W���Z��ł���
			{
			if (Cards[num].MapType!=1) continue;		//	�ʏ�n�}�ɂ͏W���Z���\�L���Ȃ�
			if (!(s in ContainCondominium)) continue;	//	���̒n�}�ɂ͊܂܂�Ȃ��W���Z��͔�΂�
			}
		else{
			if (Cards[num].MapType==1) continue;		//	�W���Z��n�}�ɂ͒ʏ�X�|�b�g���󎚂��Ȃ�
			}
		ax=Spots[i].x;
		ay=Spots[i].y;
		if ((ax<wx1)||(ax>wx2)||(ay<wy1)||(ay>wy2)) continue;
		obj[j]=new Object();
		obj[j].seq=i;
		obj[j].x=Math.floor((ax-wx1)*(z/100))-10;
		obj[j].y=Math.floor((ay-wy1)*(z/100))-6;
		obj[j].name=Spots[i].name;
		j++;
		}
	obj.sort(SortSpots);
	sp1="<table border=0 cellpadding=2 cellspacing=0>";
	for(i=0;i<obj.length;i++)
		{
		if (i>15) break;	//	�X�|�b�g�͂P�T�܂�
		j=obj[i].seq;
		lbl=obj[i].name;
		sp1+="<tr><td style='width:58mm;font-size:14px;'>";
		if (i<20) sp1+=nums.charAt(i);else sp1+=(i+1)+"";
		sp1+=":</span>"+lbl+"</td></tr>";
		if (((i+1) % 15)==0) sp1+="</table></td>";
		sp2+="<div style='position:absolute;left:"+obj[i].x+"px;top:"+obj[i].y+"px;";
		if (lbl in ContainCondominium)
			{
			sp2+="font-weight:bold;";
			sp2+="color:#ff0000;";
			}
		sp2+="margin:0px;padding:0px;border:0px;font-size:20px;filter:glow(color=#ffffff,strength=3);'>";
		if (i<20) sp2+=nums.charAt(i);else sp2+=(i+1)+"";
		sp2+="</div>";
		}
	sp1+="</table>";

	//	���ʃ^�C�g��
	s="\n<div style='font-size:26px;font-family:HG�ۺ޼��M-PRO;width:180mm;' align=center>��"+num+"�u"+Cards[num].name+"�v"+nums.charAt(seq-1)+"�̎��Ӓn�}</div>\n\n";

	//	���ʒn�}�̘g
	s+="<div style='position:absolute;z-index:1;top:10mm;left:0mm;";
	s+="width:"+RMAP_Width+"px;height:"+RMAP_Height+"px;border:5px ridge black;";
	s+="overflow:hidden;background-color:#aaaaaa;zoom:70%;'>\n\n";

	//	�X�|�b�g����
	s+="<div id='SPOT' style='position:absolute;z-index:3;top:0px;left:0px;'>";
	s+=sp2+"</div>\n\n";

	//	�}�b�v���\�z
	s+="<div id='FRAME' style='zoom:"+z+"%;position:absolute;left:0px;top:0px;z-index:2;width:"+RMAP_VX+"px;height:"+RMAP_VY+"px;'>\n";
	for(iy=0;iy<=15;iy++)
		{
		py1=iy*511;py2=(iy+1)*511-1;
		if ((py1>wy2)||(py2<wy1)) continue;
		for(ix=0;ix<=05;ix++)
			{
			px1=ix*540;px2=(ix+1)*540-1;
			if ((px1>wx2)||(px2<wx1)) continue;
			s+="<img src='./data/"+congnum+"/all/monofull/"+FixValue(ix,2)+"-"+FixValue(iy,2)+".jpg'";
			s+=" style='position:absolute;left:"+(px1-wx1)+"px;top:"+(py1-wy1)+"px;'>\n";
			}
		}
	s+="</div>\n</div>\n\n";

	//	�}�b�v�G���A�r�u�f��\��
	if (!novml)
		{
		s+="<div style='position:absolute;z-index:6;top:8mm;left:1mm;border:0px;";
		s+="width:"+RMAP_Width+"px;height:"+RMAP_Height+"px;overflow:hidden;'>\n";
		s+="<div style='position:absolute;top:0px;left:0px;'>\n";
		s+=Rvml.Draw(false);
		s+="\n</div>\n</div>\n";
		}

	//	�X�|�b�g��������ǉ�
	s+="<div style='position:absolute;z-index:4;top:10mm;left:128mm;'>";
	s+=sp1+"</div>\n\n";

	//	�v�m�F���(rmode:0=�󎚂��Ȃ� 1=�v�m�F 2=������)
	s+="<div style='position:absolute;z-index:4;top:128mm;left:0mm;border:3px black dashed;'>\n";
	s+="<img src='sys/blank.gif' style='width:186mm;height:130mm;'></div>\n";
	if (rmode==1)
		{
		s+="<div style='position:absolute;z-index:4;top:131mm;left:3mm;font-size:20px;font-family:HG�ۺ޼��M-PRO;'>�v�m�F�̏ڍׁF</div>\n";
		}
	if (rmode==2)
		{
		s+="<div style='position:absolute;z-index:4;top:131mm;left:3mm;font-size:20px;font-family:HG�ۺ޼��M-PRO;'>�����F</div>\n";
		}
	//	�v�m�F����ǉ�
	if (rmode==1)
		{
		rchk="<div style='position:absolute;z-index:5;top:138mm;left:3mm;font-size:14px;width:160mm;'>";
		BTB=Cards[num].RTB;
		for(i=0;i<BTB.length;i++)
			{
			if (BTB[i].Num!=seq) continue;
			if ((BTB[i].KBN1!="�m�F")&&(BTB[i].KBN1!="�Ԋu")) continue;
			rchk+="��"+BTB[i].Name;
			if (BTB[i].Person!="") rchk+="[����F"+BTB[i].Person+"]";
			rchk+="(�ŏI�m�F�F";
			if ("LastConfirm" in BTB[i])
				{
				if (BTB[i].LastConfirm<BTB[i].Date) rchk+=SplitDate(BTB[i].Date);
				else rchk+=SplitDate(BTB[i].LastConfirm);
				}
			else 	{
					if (BTB[i].Date!="20100101") rchk+=SplitDate(BTB[i].Date);
					else rchk+="�s��";
					}
			rchk+=")";
			if ("Frequency" in BTB[i])
				{
				if (BTB[i].Frequency!=0)
					{
					rchk+="�K��p�x�F"+BTB[i].Frequency+"���1��";
					}
				}
			rchk+="<br>";
			rchk+=BTB[i].Reason+"<br>";
			if (BTB[i].Confirm!="") rchk+="�ǋL�F"+BTB[i].Confirm+"<br>";
			rchk+="<br>";
			}
		rchk+="</div>\n";
		s+=rchk;
		}
	return s;
	}

function SortSpots(a,b)
	{
	if (a.y<b.y) return -1;
	if (a.y>b.y) return 1;
	if (a.x<b.x) return -1;
	if (a.x>b.x) return 1;
	return 0;
	}
