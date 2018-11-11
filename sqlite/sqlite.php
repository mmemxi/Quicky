<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<?php
try {

    // 接続
    $pdo = new PDO('sqlite:mydb.db');
    // SQL実行時にもエラーの代わりに例外を投げるように設定
    // (毎回if文を書く必要がなくなる)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    // デフォルトのフェッチモードを連想配列形式に設定 
    // (毎回PDO::FETCH_ASSOCを指定する必要が無くなる)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // テーブル作成
    $pdo->exec("CREATE TABLE IF NOT EXISTS fruit(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(10),
        price INTEGER
    )");

    // 挿入 (生SQL)
    $pdo->exec("INSERT INTO fruit(name, price) VALUES ('orange', '100')");
    // 挿入（プリペアドステートメント）
    $stmt = $pdo->prepare("INSERT INTO fruit(name, price) VALUES (?, ?)");
    foreach ([['apple', '200'], ['banana', '200']] as $params) {
        $stmt->execute($params);
    }

    // 選択 (生SQL)
    $r1 = $pdo->query("SELECT * FROM fruit WHERE price = '200'")->fetchAll();
    // 選択 (プリペアドステートメント)
    $stmt = $pdo->prepare("SELECT * FROM fruit WHERE price = ?");
    $stmt->execute(['200']);
    $r2 = $stmt->fetchAll();
	} catch (Exception $e)
		{
	    echo $e->getMessage() . PHP_EOL;
		}

    // 結果を確認
    var_dump($r1);
?>
<hr>
<?php
    var_dump($r2);
?>
<hr>
</body>
</html>
