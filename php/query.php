<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$host = 'localhost';
$db = 'w_station';
$username = 'arduino';
$password = '1234';
$charset ='utf8';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    //PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    //PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    //PDO::ATTR_EMULATE_PREPARES   => false,
];

try 
    {
        $pdo = new PDO($dsn, $username, $password, $opt);
		switch($_GET['query']){
			// Hace el query del dato más reciente de temperatura.
			case last_temperature:
			    $statement=$pdo->prepare("SELECT temperature, date from temperature ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			// Hace el query del dato más reciente de preasure.
			case last_preasure:
			    $statement=$pdo->prepare("SELECT preasure, date from preasure ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			// Hace el query del dato más reciente de temperatura.
			case last_humidity:
			    $statement=$pdo->prepare("SELECT humidity, date from humidity ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			case last_brightness:
			    $statement=$pdo->prepare("SELECT brightness, date from brightness ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;  
			// Hace query de todos los datos.
			case humidity:
				$statement=$pdo->prepare("SELECT * FROM (SELECT humidity, date from humidity ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			case preasure:
				$statement=$pdo->prepare("SELECT * FROM (SELECT preasure, date from preasure ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			case brightness:
				$statement=$pdo->prepare("SELECT * FROM (SELECT brightness, date from brightness ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			default:
				$statement=$pdo->prepare("SELECT * FROM (SELECT temperature, date from temperature ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC");
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