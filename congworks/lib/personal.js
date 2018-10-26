//----------------------------------------------------------------
// �l�̋��֌W�̊֐�
//----------------------------------------------------------------
function AddMyMap(userid,kbn,congnum,num,seq,id,counts,finish)
	{
	var obj,bak,i,j,k,p,result;
	var card=ReadXMLFile(ConfigXML(congnum,num),true);
	var BTB=card.RTB;
	var personalpath=PersonalFolder(congnum);
	var mypath=personalpath+userid;
	var mybook=mypath+qt+"mybook.xml";
	var today=new Date();
	var today8=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();

	if (!fso.FolderExists(personalpath)) fso.CreateFolder(personalpath);
	if (!fso.FolderExists(mypath)) fso.CreateFolder(mypath);
	if (fso.FileExists(mybook))
		{
		obj=ReadXMLFile(mybook);
		if (!("Map" in obj)) obj.Map=new Array();
		bak=new Object();
		bak.Counter=obj.Counter;
		bak.Map=new Array();
		k=0;
		for(j=0;j<obj.Map.length;j++)
			{
			if (obj.Map[j].finish>=today8)
				{
				bak.Map[k]=clone(obj.Map[j]);
				k++;
				}
			else{
				if (fso.FileExists(mypath+qt+obj.Map[j].pdf)) fso.DeleteFile(mypath+qt+obj.Map[j].pdf);
				}
			}
		obj.Map=clone(bak.Map);
		}
	else{
		obj=new Object();
		obj.Counter=0;
		obj.Map=new Array();
		}
	i=parseInt(obj.Counter,10);
	p=obj.Map.length;
	obj.Map[p]=new Object();
	obj.Map[p].kbn=kbn;						//	A=�W���C���^�[�z�� B:���������
	obj.Map[p].num=num;						//	���ԍ�
	obj.Map[p].seq=seq;						//	�n�}�ԍ�
	obj.Map[p].id=id;						//	A:�����ԍ� B:�[���Œ�
	if (kbn=="A")
		{
		obj.Map[p].name=BTB[id].Name;		//	A:������
		}
	else{
		obj.Map[p].name=card.name;			//	B:��於
		}
	obj.Map[p].counts=counts;				//	����
	obj.Map[p].finish=finish;				//	�I�����i����W���j
	obj.Map[p].pdf=FixValue(i,6)+".pdf";	//	PDF�t�@�C����
	result=mypath+qt+obj.Map[p].pdf;
	i++;
	obj.Counter=i;
	WriteXMLFile(obj,mybook);
	return result;
	}

//----------------------------------------------------------------
function RemoveMyMap(userid,kbn,congnum,num,seq,name)
	{
	var obj,i,j,k,s,result;
	var personalpath=PersonalFolder(congnum);
	var mypath=personalpath+userid;
	var mybook=mypath+qt+"mybook.xml";

	if (!fso.FolderExists(personalpath)) fso.CreateFolder(personalpath);
	if (!fso.FolderExists(mypath)) fso.CreateFolder(mypath);
	if (!fso.FileExists(mybook)) return;

	obj=ReadXMLFile(mybook);

	for(j=0;j<obj.Map.length;j++)
		{
		if (kbn=="A")
			{
			if (obj.Map[j].name!=name) continue;
			}
		else{
			if (obj.Map[j].num!=num) continue;
			if (obj.Map[j].seq!=seq) continue;
			}
		if (fso.FileExists(mypath+qt+obj.Map[j].pdf)) fso.DeleteFile(mypath+qt+obj.Map[j].pdf);
		obj.Map.splice(j,1);
		break;
		}
	WriteXMLFile(obj,mybook);
	}
//----------------------------------------------------------------
// �w�肳�ꂽ��悪�g�p�\���ǂ�����Ԃ�isAvailable
// kbn=A:�W���C���^�[�z�� B:���������
// num,seq=���ԍ��A�n�}�ԍ�
// id=�W���C���^�[�z���̏ꍇ�A������
//----------------------------------------------------------------
function isAvailable(kbn,congnum,num,seq,id)
	{
	var sts,tbl,tmk;
	if (kbn=="A")
		{
		id=id.replace("_"," ");
		sts=GetApartmentStatus(id);
		if (sts=="") return true;
		tbl=sts.split(",");
		if (tbl[2]=="") return false;
		return true;
		}
	if (kbn=="B")
		{
		tmk=LoadMarker(congnum,num);
		if (tmk.Count==0) return false;
		if ((tmk.Map[seq].User!="")&&(tmk.Map[seq].User!=id)) return false;
		return true;
		}
	return false;
	}
//----------------------------------------------------------------
// �w�肵���A�p�[�g�̎g�p�󋵂�Ԃ�
//----------------------------------------------------------------
function GetApartmentStatus(id)
	{
	var s,i,j;
	var ary=new Array();
	var alogs=new Array();
	s=ReadFile(ApartFolder(congnum)+id+".txt");
	if (s=="") return s;
	ary=s.split(/\r\n/);
	j=ary.length-1;
	if (ary[j]=="") j--;
	return ary[j];
	}
