//----------------------------------------------------------------
// �n�}����Q�F�l�p��������n�}�̈��
//----------------------------------------------------------------
function MapGen_Person(congnum,num,seq,outfilename)
	{
	var html="";
	var i;
	LoadSpots(congnum);
	SetMarkersToBuilding(2);	//	�r�����Ɍl�p�n�}�̃}�[�J�[���f

	//	�\��
	html+="\n<div style='position:relative;width:210mm;height:250mm;page-break-after:always;'>";
	html+=MapGen_Person_Exec(congnum,num,seq);
	html+="</div>\n";
	//	����
	html+="\n<div style='position:relative;width:210mm;height:250mm;page-break-after:avoid;'>";
	html+=CreateRMAP(congnum,num,seq,2);
	html+="</div>\n";
	PublishPDF(html,outfilename);
	}
//----------------------------------------------------------------
function MapGen_Person_Exec(congnum,num,seq)
	{
	var cmd;
	var r,s;
	var x1,y1,x2,y2,wx,wy,zoomx,zoomy,resx,resy,cmd,ix,iy;
	var rx=new Array();
	var base,BTB;
	var myDate=new Date();
	var ytbl=new Array("��","��","��","��","��","��","�y");
	var yobi="";
	var mapsize=0;
	var vml=new Poly();
	var s="";
	var i,j,mcount,vhist;
	var mapimage;
	var ifile="";
	var html="";

	if (Cards[num].MapType==0)	mapimage="./data/"+congnum+"/"+num+"/"+seq+".png";
					else		mapimage="./sys/blank.png";

	//	�}�[�J�[�̌����J�E���g
	mcount=0;
	if (seq in Markers.Map)
		{
		for(j=0;j<Markers.Map[seq].Points.length;j++)
			{
			vhist=parseInt(Markers.Map[seq].Points[j].History,10);
			if (vhist!=2) continue;
			mcount++;
			}
		}

	//	�I����������j�����擾
	s=Cards[num].Limit+"";
	myDate.setFullYear(s.substring(0,4));
	myDate.setMonth(parseInt(s.substring(4,6),10)-1);
	myDate.setDate(s.substring(6,8));
	yobi=ytbl[myDate.getDay()];

	html="<div style='position:absolute;top:0px;left:0px;z-index:0;'>";
	marginx=38;		//	10mm;
	marginy=113;	//	30mm;
	html+="<div style='position:absolute;top:30mm;left:10mm;z-index:1;'>";
	html+="<img src='"+mapimage+"' style='width:180mm;height:200mm;'>";		//	680x756px
	html+="</div>";
	html+="<div style='position:absolute;top:15mm;left:0mm;z-index:2;font-family:HG�ۺ޼��M-PRO;font-size:22px;white-space:nowrap;'>";
	html+="��"+num+"-"+nums.charAt(seq-1)+"�@"+Cards[num].name+"�i���������j"+mcount+"��</div>";

	html+="<div style='position:absolute;top:230mm;left:10mm;z-index:2;' align=left>";
	html+="<hr style='border-width:1px 0px 0px 0px;height:1px;border-color:black;border-style:dashed;width:175mm;'></div>";
	html+="<div style='position:absolute;top:235mm;left:1cm;z-index:2;font-family:HG�ۺ޼��M-PRO;width:20cm;white-space:nowrap;'>";
	html+="<span style='font-size:20px;'>���̂����Ƃ�����K�₵�Ă��������B</span></div>";
	html+="</div>";

	vml.mapsize=1;
	vml.width=2126;
	vml.height=2362;

	html+="<div style='position:absolute;top:0mm;left:0cm;z-index:2;font-family:Arial Black;font-size:26px;'>";
	html+="�L�������F"+SplitDate(Cards[num].Limit)+"("+yobi+")�܂�</div>";

	//	�x�[�X�����̔z�u
	base=html;

	//	�摜�T�C�Y�̎擾
	Imgx=680;
	Imgy=756;
	zoomx=Imgx/2126;
	zoomy=Imgy/2362;

	//	�r�������d�˂�
	if (Building!="")
		{
		sb="<div style='position:absolute;top:30mm;left:10mm;z-index:3;'>";
		for(i in Building.building)
			{
			rmap=parseInt(Building.building[i].map,10);
			if (rmap!=seq) continue;
			sb+=CreateBuildingImage(Building.building[i],congnum,num,seq,zoomx,zoomy);
			}
		sb+="</div>";
		html+=sb;
		}

	//	�}�[�J�[���̍���
	v="<div style='position:absolute;top:30mm;left:10mm;z-index:5;'>";
	v+=DrawMarker(Markers,seq,zoomx,zoomy,3);
	v+="</div>";
	html+=v;
	return html;
	}
