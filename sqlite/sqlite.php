<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<?php
try {

    // �ڑ�
    $pdo = new PDO('sqlite:mydb.db');
    // SQL���s���ɂ��G���[�̑���ɗ�O�𓊂���悤�ɐݒ�
    // (����if���������K�v���Ȃ��Ȃ�)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    // �f�t�H���g�̃t�F�b�`���[�h��A�z�z��`���ɐݒ� 
    // (����PDO::FETCH_ASSOC���w�肷��K�v�������Ȃ�)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // �e�[�u���쐬
    $pdo->exec("CREATE TABLE IF NOT EXISTS fruit(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(10),
        price INTEGER
    )");

    // �}�� (��SQL)
    $pdo->exec("INSERT INTO fruit(name, price) VALUES ('orange', '100')");
    // �}���i�v���y�A�h�X�e�[�g�����g�j
    $stmt = $pdo->prepare("INSERT INTO fruit(name, price) VALUES (?, ?)");
    foreach ([['apple', '200'], ['banana', '200']] as $params) {
        $stmt->execute($params);
    }

    // �I�� (��SQL)
    $r1 = $pdo->query("SELECT * FROM fruit WHERE price = '200'")->fetchAll();
    // �I�� (�v���y�A�h�X�e�[�g�����g)
    $stmt = $pdo->prepare("SELECT * FROM fruit WHERE price = ?");
    $stmt->execute(['200']);
    $r2 = $stmt->fetchAll();
	} catch (Exception $e)
		{
	    echo $e->getMessage() . PHP_EOL;
		}

    // ���ʂ��m�F
    var_dump($r1);
?>
<hr>
<?php
    var_dump($r2);
?>
<hr>
</body>
</html>
