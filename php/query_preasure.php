<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'w_station';
$username = 'arduino';
$password = '1234';
$charset ='utf8';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try 
    {
        $pdo = new PDO($dsn, $username, $password, $opt);
		switch($_GET['query']){
			// Hace el query del dato más reciente.
			case last:
			    $statement=$pdo->prepare("SELECT * from preasure ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break; 
			// Hace query de todos los datos.
			default:
				$statement=$pdo->prepare("SELECT * from preasure");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
		}     
    }
    catch (PDOException $e) 
    {
        echo $e->getMessage();

    }      
?>