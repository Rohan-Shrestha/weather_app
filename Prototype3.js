/*
    Name: Rohan Shrestha
*/

// api key from open weather map
const api = "ba13e3f53f6fe9ddfccc203bea64961b";

// Accessing DOM elements and changing their values

// returning image element and storing into variable
const imgIcon = document.getElementById('weatherIcon');

// returning element of location (hash sigh for id) and storing into variable
const loc = document.querySelector('#location')

const feel = document.querySelector('.feel')

// returning element of temperature in celsius (dot sign for class)
// and storing into varible
const tempCel = document.querySelector('.c');

// returning temperature in fahrenheit and storing into variable
const tempFar = document.querySelector('.f');

// returning weather description and storing into variable
const desc = document.querySelector('.desc');

// returning humidity element using humidity selector
const humid = document.querySelector('.humidity');

// class attribute with value pressure
const pres = document.querySelector('.pressure');

// class attribute with value wind
const wind = document.querySelector('.wind');

// returning element of sunrise time and storing into variable
const rise = document.querySelector('.sunrise');

// returning element of sunset time and storing into variable
const set = document.querySelector('.sunset');

const timeNow = document.querySelector('.time');

// At first, checking broswer cache (local storage) for weather data,
// if found data less than 10 seconds display in the web page else retrieve from the database server.
if(localStorage.when != null
    && parseInt(localStorage.when) + 10000 > Date.now()) {
    let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s) ago";
    loc.innerHTML = localStorage.location;
    imgIcon.src = localStorage.weatherIcon;
    feel.innerHTML = localStorage.feel;
    desc.innerHTML = localStorage.desc;
    tempCel.innerHTML = localStorage.c;
    tempFar.innerHTML = localStorage.f;
    humid.innerHTML = localStorage.humidity;
    pres.innerHTML = localStorage.pressure;
    wind.innerHTML = localStorage.wind;
    rise.innerHTML = localStorage.rise;
    set.innerHTML = localStorage.set;
    document.getElementById("myLastUpdated").innerHTML = freshness;
    // No local cache, access network
    } else {
        // API call from php file stored into a variable
        const base = `http://localhost/weather/Prototype3.php?city=Kathmandu`;

        // fetching the API to get data from API service(open weather map)
        fetch(base)
            .then((response) => {
                return response.json();  // converting response to a JSON object
            })
            .then((data) => {
                // showing data fetched from API in console
                console.log(data);

                // using javaScript Object destructing to extract different weather values

                const feels_like = data.weather_feel;

                // storing temperature as temp into variable from main object
                const  temp  = data.weather_temperature;

                // storing humidity by the same name into variable from main object
                const  humidity  = data.weather_humidity;

                // storing pressure into variable of the same name from main object
                const  pressure  = data.weather_pressure;

                // storing speed into variable from wind object
                const  speed  = data.weather_wind;

                // storing place into variable from the "name" key of the object
                const place = data.city;

                // storing name of the country into variable from sys object
                const  country  = data.country;

                // storing description and icon into variable of their same name respectively
                // from weather array
                const  description  = data.weather_description;

                // storing sunrise and sunset into variables respectively
                // from sys object
                const  sunrise  = data.weather_sunrise;

                const  sunset  = data.weather_sunset;

                // getting the icon of the current weather from open weather API
                const urlIcon = `http://openweathermap.org/img/wn/${data.weather_icon}@2x.png`;

                // converting celsius stored as variable temp into farhenheit and 
                // also storing it into variable by the same name
                const fahrenheit = (temp * 9) / 5 + 32;

                // API returns time in unix time (epoch format).
                // so, converting unix time into GMT
                // also creating date objects then storing them into variables.
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                // DOM INTERACTION

                // changing the imgage source tag using the ID 'weather-icon'
                imgIcon.src = urlIcon;

                // changing name of place and country by the name fetched from API.
                loc.innerHTML = `${place}, ${country}`;

                feel.innerHTML = `${feels_like} °C`;

                desc.innerHTML = `${description}`;

                // using 'toFixed' method to show the degree value up to two decimal places only
                tempCel.innerHTML = `${parseFloat(temp).toFixed(2)} °C`;
                tempFar.innerHTML = `${fahrenheit.toFixed(2)} °F`;

                // humidity from API server
                humid.innerHTML = `${humidity} %`;

                //pressure from API server
                pres.innerHTML = `${pressure} hPa`;

                //changing wind speed by speed value from API server
                wind.innerHTML = `${speed} m/s`;

                // converting GMT date and time into local date and time
                rise.innerHTML = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                set.innerHTML = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                
                // Fresh weather data with a new timestamp is saved to browser from local storage and
                // same data is displayed in the weather app webpage.
                localStorage.location = data.city + ', ' + data.country;
                localStorage.weatherIcon = urlIcon;
                localStorage.imgIcon = data.weather_icon;
                localStorage.feel = data.weather_feel;
                localStorage.desc = data.weather_description;
                localStorage.c = data.weather_temperature + ' °C';
                localStorage.f = (temp * 9) / 5 + 32 + ' °F';
                localStorage.humidity = data.weather_humidity + ' %';
                localStorage.pressure = data.weather_pressure + ' hPa';
                localStorage.wind = data.weather_wind + ' m/s';
                localStorage.rise = `${(new Date(data.weather_sunrise * 1000)).toLocaleDateString()}, ${(new Date(data.weather_sunrise * 1000)).toLocaleTimeString()}`;
                localStorage.set = `${(new Date(data.weather_sunset * 1000)).toLocaleDateString()}, ${(new Date(data.weather_sunset * 1000)).toLocaleTimeString()}`;
                localStorage.when = Date.now(); // milliseconds since January 1 1970
            })
            .catch(err => {
                console.log(err);  // reports error to the console if any.
            });
}