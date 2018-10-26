//------------------------------------------------------------------------------------
// 全クライアント共通の設定
//------------------------------------------------------------------------------------
var ConfigAll=new Object();
ConfigAll.CongName="";
ConfigAll.AutoEndDefault=60;
ConfigAll.AutoEndApart=30;
ConfigAll.BlankMin=21;
ConfigAll.Campeigns=new Array();
ConfigAll.Remote=new Object();
ConfigAll.Remote.Host="";
ConfigAll.Remote.User="";
ConfigAll.Remote.Password="";
ConfigAll.Remote.Directory="";
//------------------------------------------------------------------------------------
// クライアント別の設定
//------------------------------------------------------------------------------------
var ConfigLocal=new Object();
ConfigLocal.MapEditor="";
//------------------------------------------------------------------------------------
function OpenConfig()
	{
	var s=ReadXMLFile(IniXML("all"),false);
	var tmpobj=new Object();
	if (s!="") ConfigAll=clone(s);
	if (!("Campeigns" in ConfigAll))
		{
		ConfigAll.Campeigns=new Array();
		}
	if (!("Remote" in ConfigAll))
		{
		ConfigAll.Remote=new Object();
		ConfigAll.Remote.Host="";
		ConfigAll.Remote.User="";
		ConfigAll.Remote.Password="";
		ConfigAll.Remote.Directory="";
		}
	s=ReadXMLFile(IniXML("local"),false);
	if (s!="") ConfigLocal=clone(s);
	}
function CloseConfig()
	{
	WriteXMLFile(ConfigAll,IniXML("all"));
	WriteXMLFile(ConfigLocal,IniXML("local"));
	}
