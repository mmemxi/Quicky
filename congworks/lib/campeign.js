//------------------------------------------------------------------------------------
// 2018/01/19�쐬�@�����L�����y�[���ƕ�����O�ɂ܂��Ή����Ă��Ȃ��o�[�W����
// 2018/05/08�C���@�����L�����y�[���ɑΉ�
//------------------------------------------------------------------------------------
//	�L�����y�[�����Ԓ����ǂ����̔���
//------------------------------------------------------------------------------------
function isCampeign(day)
	{
	var i,r=false;
	if (!("Campeigns" in ConfigAll)) return false;
	if (ConfigAll.Campeigns.length<1) return false;
	for(i=0;i<ConfigAll.Campeigns.length;i++)
		{
		if ((ConfigAll.Campeigns[i].Start<=day)&&(ConfigAll.Campeigns[i].End>=day)){r=true;break;}
		}
	return r;
	}
//------------------------------------------------------------------------------------
//	�L�����y�[���Q�T�ԑO���ǂ����̔���
//------------------------------------------------------------------------------------
function isBeforeCampeign(today)
	{
	var i,r=false,nisu;
	if (!("Campeigns" in ConfigAll)) return false;
	if (ConfigAll.Campeigns.length<1) return false;
	for(i=0;i<ConfigAll.Campeigns.length;i++)
		{
		if (today>=ConfigAll.Campeigns[i].Start) continue;
		nisu=CalcDays(today,ConfigAll.Campeigns[i].Start);
		if ((nisu>0)&&(nisu<=14)) {r=true;break;}
		}
	return r;
	}
//------------------------------------------------------------------------------------
//	���I�����L�����y�[���J�n�����܂����邩�ǂ����̔���
//------------------------------------------------------------------------------------
function isOverCampeign(startday,endday)
	{
	var i,s,r=0,tymd,ty,tm,td;
	var cd;
	if (!("Campeigns" in ConfigAll)) return false;
	if (ConfigAll.Campeigns.length<1) return r;
	s=startday+"";
	if (s.indexOf("/",0)!=-1)
		{
		tymd=s.split("/");
		ty=parseInt(tymd[0],10);
		tm=parseInt(tymd[1],10);
		td=parseInt(tymd[2],10);
		startday=ty*10000+tm*100+td;
		}
	s=endday+"";
	if (s.indexOf("/",0)!=-1)
		{
		tymd=s.split("/");
		ty=parseInt(tymd[0],10);
		tm=parseInt(tymd[1],10);
		td=parseInt(tymd[2],10);
		endday=ty*10000+tm*100+td;
		}
	for(i=0;i<ConfigAll.Campeigns.length;i++)
		{
		if (startday>=ConfigAll.Campeigns[i].Start) continue;	//	�L�����y�[���J�n��͏���
		cd=CalcDays(startday,ConfigAll.Campeigns[i].Start);
		if (cd<15){r=-1;break;}
		if (endday>=ConfigAll.Campeigns[i].Start)
			{
			r=AddDays(ConfigAll.Campeigns[i].Start,-1);
			break;
			}
		}
	return r;
	}

//------------------------------------------------------------------------------------
//	�L�����y�[����30�����ǂ����̔���
//------------------------------------------------------------------------------------
function isAfterCampeign(today)
	{
	var i,r=false,nisu;
	if (!("Campeigns" in ConfigAll)) return false;
	if (ConfigAll.Campeigns.length<1) return false;
	for(i=0;i<ConfigAll.Campeigns.length;i++)
		{
		if (today<=ConfigAll.Campeigns[i].End) continue;
		nisu=CalcDays(ConfigAll.Campeigns[i].End,today);
		if ((nisu>0)&&(nisu<=30)) {r=true;break;}
		}
	return r;
	}

//-------------------------------------------------------------------------
// 2018/5/25�ǉ��@�w�肳�ꂽ���̍ŒZ�g�p�\�����擾
//-------------------------------------------------------------------
function GetAvailableDate(congnum,num)
	{
	var str,sts,atbl,d,i;
	var d0,nisu;

	//	���̋��̎g�p�󋵂��擾
	var card=new Object();
	var log=ReadXMLFile(NumFolder(congnum,num)+"log.xml",false);
	if (log!="")
		{
		if ("Status" in log)
			{
			if (log.Status=="Using")
				{
				card.NowUsing=true;
				card.lastuse=log.Latest.Rent;
				}
			else{
				card.NowUsing=false;
				card.lastuse=log.Latest.End;
				}
			}
		}
	else{
		card.NowUsing=false;
		card.lastuse="20000101";
		}

	d=card.lastuse;					//	�ŏI�g�p��
	if (card.NowUsing) return d;	//	�g�p���̏ꍇ�͊J�n����Ԃ�
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

