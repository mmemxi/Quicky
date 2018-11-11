<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<script type="text/javascript">
var jsobj=new Array();
jsobj[0]=new Object();
jsobj[1]=new Object();
jsobj[2]=new Object();
for(i=0;i<=2;i++)
	{
	jsobj[i].name="apple"+i;
	jsobj[i].price=(i+1)*100;
	}
sql=MakeObjtoSQL("fruit",jsobj);
alert(sql);
function MakeObjtoSQL(table,obj)
	{
	var i,j,k,l;
	var sql="REPLACE INTO "+table+"(";
	k=false;
	for(j in obj[0])
		{
		if (k) sql+=",";
		sql+=j;
		k=true;
		}
	sql+=") VALUES";
	k=false;
	for(i=0;i<obj.length;i++)
		{
		if (k) sql+=",";
		sql+="(";
		l=false;
		for(j in obj[i])
			{
			if (l) sql+=",";
			sql+="'"+obj[i][j]+"'";
			l=true;
			}
		sql+=")";
		k=true;
		}
	return sql;
	}
</script>
<hr>
</body>
</html>
