function PrintMap(num,seq)
	{
	WshShell.CurrentDirectory=basepath;
	var sfile=LocalFolder()+"que.pdf";
	var cmd="cscript.exe \""+CWFolder()+"mapgen.wsf\" "+congnum+" "+num+" "+seq+" public \""+sfile+"\"";
	WshShell.Run(cmd,0,true);
	PDFPrint("");
	}

function PrintApart(num,seq,name,pdffile)
	{
	WshShell.CurrentDirectory=basepath;
	var cmd="cscript.exe \""+CWFolder()+"mapgen.wsf\" "+congnum+" "+num+" "+seq+" \""+name+"\" \""+pdffile+"\"";
	var msg="�o�͕��@��I�����Ă��������B\n[�͂�]�c���̒n�}��������܂��B\n[������]�c�摜�f�[�^���o�͂��܂��B";
	var r=WshShell.Popup(msg,0,"�o�͕��@�̑I��",4);
	WshShell.Run(cmd,0,true);	//	PDF�͕K���쐬����
	if (r==7)	return;			//	������Ȃ�
	PDFPrint(pdffile);			//	�������(r==1)
	}

function PrintMarkerMap(num,seq,pdffile)
	{
	WshShell.CurrentDirectory=basepath;
	var cmd="cscript.exe \""+CWFolder()+"mapgen.wsf\" "+congnum+" "+num+" "+seq+" \"person\" \""+pdffile+"\" & PAUSE";
	var msg="�o�͕��@��I�����Ă��������B\n[�͂�]�c���̒n�}��������܂��B\n[������]�c�摜�f�[�^���o�͂��܂��B";
	var r=WshShell.Popup(msg,0,"�o�͕��@�̑I��",4);
	WshShell.Run(cmd,0,true);	//	PDF�͕K���쐬����
	if (r==7)	return;			//	������Ȃ�
	PDFPrint(pdffile);			//	�������(r==1)
	}
// HTMLtoPDF�̑�p---------------------------------------------------------
function HTMLtoPDF(html,outfilename)
	{
	var infile=basepath+qt+"qtemp.html";
	var PrintForm="<html>\n<head>\n<meta http-equiv=\"content-type\" content=\"text/html;charset=UTF-8\">\n</head>\n";
	PrintForm+="<body style='font-family:�l�r �o�S�V�b�N;font-size:12px;'>\nPRINTBODY\n</body>\n</html>";
	PrintForm=PrintForm.replace("PRINTBODY",html);
	WriteUTF8(infile,PrintForm);
	WshShell.CurrentDirectory=basepath;
	var cmd="\""+SysFolder()+"webkit"+qt+"wkhtmltopdf\" --quiet --encoding UTF-8 --disable-smart-shrinking qtemp.html \""+outfilename+"\"";
	WshShell.Run(cmd,0,true);
	}
//�@���|�[�g�̈�� --------------------------------------------------------
// num=-1�Ȃ�S�y�[�W�A����ȊO�Ȃ�w��y�[�W
//-------------------------------------------------------------------------
function PrintReport(num)
	{
	var i,frompage,topage,html;

	FloatingMenu.Hide();

	if (num==-1)
		{
		frompage=0;
		topage=ReportMax;
		}
	else{
		frompage=ReportPage;
		topage=ReportPage;
		}

	html="";
	for(i=frompage;i<=topage;i++)
		{
		if (ReportBody[i]=="") continue;
		if (i==topage)
			{
			html+="<div style='position:relative;top:0px;left:-150px;zoom:30%;page-break-after:avoid;'>";
			}
		else{
			html+="<div style='position:relative;top:0px;left:-150px;zoom:30%;page-break-after:always;'>";
			}
		html+="<img src=\""+SysFolder()+"s13a.jpg\">";
		html+=ReportBody[i]+"</div></div>\n";
		}
	HTMLtoPDF(html,LocalFolder()+"que.pdf");
	PDFPrint("");

	FloatingMenu.Show();
	}

//�@���|�[�g(S13�p���̂�)�̈�� --------------------------------------------------------
function PrintS13_Exec()
	{
	var cmd,i,j,q,s;
	q="<div style='position:absolute;top:0px;left:0px;zoom:100%;page-break-after:avoid;'>";
	q+="<img src='"+SysFolder()+"s13a.jpg' style='width:190mm;height:277mm;'></div>";
	HTMLtoPDF(q,LocalFolder()+"que.pdf");
	PDFPrint("");
	MENU2();
	}
//------------------------------------------------------------------------------------
function FixValue(num,len)
	{
	var s=num+"";
	if (s.length==len) return s;
	if (s.length>len)
		{
		s=s.substring(s.length-len,s.length);
		return s;
		}
	while(s.length<len)
		{
		s="0"+s;
		}
	return s;
	}
//---------------------------------------------------------------------------------
function GetOverDay(num)
	{
	var obj=LoadLog(num);
	if (obj.Status=="Using")
		{
		return obj.Latest.Limit;
		}
	return "";
	}

//---------------------------------------------------------------
function PDFPrint(pdffile)
	{
	var now=new Date();
	var sfile,dfile,pfile;
	var PDFPrintSys=fso.FileExists(QueFolder()+"waiting.txt");
	if (pdffile=="")
		{
		sfile=LocalFolder()+"que.pdf";
		dfile=LocalFolder()+"que"+(now.getMinutes()*100000+now.getSeconds()*1000+now.getMilliseconds())+".pdf";
		try	{
			fso.CopyFile(sfile,dfile,true);
			}
		catch(e)
			{
			dfile=sfile;
			}
		}
	else dfile=pdffile;

	if (fso.FolderExists(PDFXCFolder()))
		{
		if (PDFPrintSys)
			{
			pfile=QueFolder();
			fso.CopyFile(dfile,pfile);
			}
		else{
			WshShell.CurrentDirectory=PDFXCFolder();
			cmd="PDFXCview.exe /print \""+dfile+"\"";
			WshShell.Run(cmd,0,false);
			}
		}
	else{
		cmd="\""+dfile+"\"";
		WshShell.Run(cmd,0,false);
		}
	WshShell.CurrentDirectory=basepath;
	}
