//----------------------------------------------------------
// PDF Print Server (For Congworks)
// �풓����PDF���������X�N���v�g
// �Ď��t�H���_��PDF�t�@�C�������݂���ƁA�����������ď����σt�H���_�Ɉړ�����
// �Ď��t�H���_  ��c:\temp\quicky\pdfque
// �����σt�H���_��c:\temp\quicky\pdfque\done
// ���쒆�Ȃ�c:\temp\quicky\pdfque��waiting.txt�����݂���
// waiting.txt���폜����Ə풓��������
//----------------------------------------------------------
var WshShell = new ActiveXObject("WScript.Shell");
var Shell = new ActiveXObject("Shell.Application");
var fso=new ActiveXObject("Scripting.FileSystemObject");
var path1="c:\\temp\\quicky\\pdfque";
var path2="c:\\temp\\quicky\\pdfque\\done";
var f,result;
//	��d�N�����֎~����--------------------------------------
var dup=CheckDuplicate();
if (dup=="") WScript.quit();
//----------------------------------------------------------
if (!fso.FolderExists("c:\\temp"))	fso.CreateFolder("c:\\temp");
if (!fso.FolderExists("c:\\temp\\quicky"))	fso.CreateFolder("c:\\temp\\quicky");
if (!fso.FolderExists("c:\\temp\\quicky\\pdfque"))	fso.CreateFolder("c:\\temp\\quicky\\pdfque");
if (!fso.FolderExists("c:\\temp\\quicky\\pdfque\\done"))	fso.CreateFolder("c:\\temp\\quicky\\pdfque\\done");
f=fso.CreateTextFile("c:\\temp\\quicky\\pdfque\\waiting.txt",true);f.close();
WshShell.CurrentDirectory="C:\\Program Files\\Tracker Software\\PDF Viewer";
//----------------------------------------------------------
while(1==1)
	{
	result=CheckDirectory();
	if (result) break;
	WScript.Sleep(2500);
	}
if (fso.FileExists("c:\\temp\\quicky\\pdfque\\waiting.txt"))	fso.DeleteFile("c:\\temp\\quicky\\pdfque\\waiting.txt",true);
WScript.quit();
//----------------------------------------------------------
function CheckDirectory()
	{
	var dir,files,file,ext,cmd,result;
	result=false;
	if (!fso.FileExists("c:\\temp\\quicky\\pdfque\\waiting.txt")) return true;
	dir=fso.GetFolder(path1);
	files=new Enumerator(dir.Files);
	for(; !files.atEnd(); files.moveNext())
		{
		file=files.item().Name+"";
		ext=fso.GetExtensionName(file).toLowerCase();
		if (ext!="pdf") continue;
		cmd="PDFXCview.exe /print \""+path1+"\\"+file+"\"";
		WshShell.Run(cmd,0,true);
		fso.CopyFile(path1+"\\"+file,path2+"\\",true);
		try	{
			fso.DeleteFile(path1+"\\"+file,true);
			}
		catch(e){}
		}
	return result;
	}
//----------------------------------------------------------
function CheckDuplicate()
	{
	var env = WshShell.Environment("Process");
	var windir = env("SystemRoot");
	var wmiObj = GetObject("WinMgmts:Root\\Cimv2");
	var processes = wmiObj.ExecQuery("Select * From Win32_Process");
	var processenum = new Enumerator(processes);
	var flag = 0;
	var pid;
	for(; !processenum.atEnd(); processenum.moveNext())
		{
		var item = processenum.item();
		if(item.CommandLine != null && item.CommandLine.toLowerCase().indexOf("\"" + windir.toLowerCase() + "\\system32\\wscript.exe") == 0 && item.CommandLine.indexOf(WScript.ScriptFullName) > 0 )
			{
			flag++;
			pid = item.ProcessId;
			}
		}
	if(flag > 1) return "";
	else if(typeof pid === "undefined")
		{
		WScript.Echo("���d�N������Ɏ��s���܂����B");
		return "";
		}
	else{
		return pid;
		}
	}
