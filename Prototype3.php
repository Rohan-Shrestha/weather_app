<?php
// Name: Rohan Shrestha


  // if error from CORS policy
header("Access-Control-Allow-Origin: *");
// mysqli connection parameters stored in variables
$hostname = "localhost";
$username = "root";
$password = "";
$database = "dbweather";

// Connect to database
$connection = mysqli_connect($hostname, $username, $password);
// To report connection error
if (!$connection) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit();
}

// $q = "create database $database;";  // SQL statement to create database
// mysqli_query($connection, $q);  // Executing query to create database
mysqli_select_db($connection, $database);  // Executing query to select the created database

// SQL statement to create table, stored in a variable
$table = "create table weather
(city varchar(50),
country varchar(50),
weather_icon varchar(50),
weather_feel varchar(50),
weather_description varchar(50),
weather_temperature varchar(50),
weather_humidity varchar(50),
weather_pressure varchar(50),
weather_wind varchar(50),
weather_when datetime,
weather_sunrise varchar(50),
weather_sunset varchar(50));";

// Executing query to create table
// mysqli_query($connection, $table);

// Checking if requested data is present and fresh
include('dataImport.php');

// SQL query execution
$sql = "SELECT *
FROM weather
WHERE city = '{$_GET['city']}'
AND weather_when >= DATE_SUB(NOW(), INTERVAL 3600 SECOND)
ORDER BY weather_when DESC limit 1";
$result = mysqli_query($connection, $sql);

// Get data, convert to JSON and print
$row = mysqli_fetch_assoc($result);
print json_encode($row);

// setting Free result and closing the connection
mysqli_free_result($result);
mysqli_close($connection);
?>