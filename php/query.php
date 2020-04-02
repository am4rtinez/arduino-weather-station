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
			case last_temp:
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
			case last_hum:
			    $statement=$pdo->prepare("SELECT humidity, date from humidity ORDER BY id DESC LIMIT 0,1");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break; 
			// Hace query de todos los datos.
			case humidity:
				$statement=$pdo->prepare("SELECT humidity, date from humidity LIMIT 20");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			case preasure:
				$statement=$pdo->prepare("SELECT preasure, date from preasure LIMIT 20");
				$statement->execute();
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				$json=json_encode($results);
				echo $json;
			break;
			default:
				$statement=$pdo->prepare("SELECT temperature, date from temperature LIMIT 20");
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