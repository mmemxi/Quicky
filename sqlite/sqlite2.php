<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<?php
try {

    // Ú‘±
    $pdo = new PDO('sqlite:mydb.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // ƒe[ƒuƒ‹ì¬
    $pdo->exec("CREATE TABLE IF NOT EXISTS fruit(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(10),
        price INTEGER
    )");

    $pdo->exec("INSERT INTO fruit(name, price) VALUES ('orange', '100')");

    $r1 = $pdo->query("SELECT * FROM fruit WHERE price = '200'")->fetchAll();
	} catch (Exception $e){echo $e->getMessage() . PHP_EOL;}

	echo "<script type='text/javascript'>";
	echo "jstxt='" . json_encode($r1) . "';";
	echo "</script>";
?>
<hr>
<script type="text/javascript">
var jsobj=JSON.parse(jstxt);
alert(jstxt);
alert(jsobj[0].name+"/"+jsobj[0].price);
</script>
</body>
</html>
