<?php
// Name: Rohan Shrestha
// University ID: 2059641
// Prototype 3

// Setting time zone
date_default_timezone_set('Asia/Kathmandu');
// Select weather data for given parameters
$sql = "SELECT *
FROM weather
WHERE city = '{$_GET['city']}'
AND weather_when >= DATE_SUB(NOW(), INTERVAL 3600 SECOND)
ORDER BY weather_when DESC limit 1";
$result = mysqli_query($connection, $sql);

// If no records found
if (mysqli_num_rows($result) == 0) {
    // Make API call
    $url = 'https://api.openweathermap.org/data/2.5/weather?q=' . $_GET['city'] . '&appid=ba13e3f53f6fe9ddfccc203bea64961b&units=metric';
    // Getting weather data from openweathermap and storing it in JSON object
    $data = file_get_contents($url);
    $json = json_decode($data, true);
    // Fetching required weather fields
    $country = $json['sys']['country'];
    $weather_icon = $json['weather'][0]['icon'];
    $weather_feel = $json['main']['feels_like'];
    $weather_description = $json['weather'][0]['description'];
    $weather_temperature = $json['main']['temp'];
    $weather_humidity = $json['main']['humidity'];
    $weather_pressure = $json['main']['pressure'];
    $weather_wind = $json['wind']['speed'];
    $weather_when = date("Y-m-d H:i:s"); // present time
    $city = $json['name'];
    $weather_sunrise = $json['sys']['sunrise'];
    $weather_sunset = $json['sys']['sunset'];
    
    // Inserting weather fields data into SQL database
    $sql = "INSERT INTO weather (city, country, weather_icon, weather_feel, weather_description, weather_temperature, weather_humidity, weather_pressure, weather_wind, weather_when, weather_sunrise, weather_sunset)
    VALUES('{$city}', '{$country}', '{$weather_icon}', {$weather_feel}, '{$weather_description}', {$weather_temperature}, {$weather_humidity}, {$weather_pressure}, {$weather_wind}, '{$weather_when}', '{$weather_sunrise}', '{$weather_sunset}');";
    
    // For reporting errors in SQL statements
    if (!mysqli_query($connection, $sql)) {
        echo("<h4>SQL error description: " . mysqli_connect_error() . "</h4>");
    }

}
?>