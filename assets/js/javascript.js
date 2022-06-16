// variables
var APIKey = "7ca476433c6847053eeda25ceac28740";
var submit = document.querySelector("#submit-btn");
var cityNameButtons = document.querySelector(".city-name-section");
var currentCity = document.querySelector("#currentCity");
var currentTemp = document.querySelector("#temp");
var currentWind = document.querySelector("#wind");
var currentHumid = document.querySelector("#humid");
var currentUV = document.querySelector("#uv");


// get the date of current day
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;


// get city name from input
var citySearch = function() {
    var searchInputVal = document.getElementById("search-input").value;
    apiCall(searchInputVal);

    document.getElementById("search-input").value = "";
}

// call to api
var apiCall = function(city) {
    var api = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    fetch(api).then(function(response) {
      // request was successful
      if (response.ok) {
          console.log(response);
        response.json().then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name;
            
            weatherCall(lat, lon, cityName);
            sideButtons(cityName);
        });
      }
      
      else {
        alert('Please Type a City Name');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to API");
    });

}

// call to get weather info
var weatherCall = function(lat, lon, cityName) {
    var api = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + APIKey;

    fetch(api).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            currentWeather(data, cityName);
            fiveDay(data);
        })
    })
}


// functions to create html 

// city name side buttons
var sideButtons = function(name) {
    var newButton = document.createElement("button");
    newButton.classList = "btn btn-secondary";
    newButton.setAttribute("type", "button");
    newButton.textContent = name;

    cityNameButtons.appendChild(newButton);
}

// current day weather info
var currentWeather = function(data, cityName) {
    currentCity.textContent = cityName + " (" + today + ")";

    var iconCode = data.current.weather[0].icon;
    var icon = document.createElement("img");
    icon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
    currentCity.appendChild(icon);

    currentTemp.textContent = data.current.temp + " \u00B0" +"F";

    currentWind.textContent = data.current.wind_speed + " MPH";

    currentHumid.textContent = data.current.humidity + " %";

    currentUV.textContent = data.current.uvi;

    if (data.current.uvi <= 2) {
        currentUV.classList = "uv-low";
    }

    else if (2 < data.current.uvi && data.current.uvi <= 5) {
        currentUV.classList = "uv-medium";
    }

    else {
        currentUV.classList = "uv-high";
    }
}

// 5 day forcast
var fiveDay = function(data) {

    for (i = 1; i < 6; i++) {
        var today = new Date();
        var dd = String(today.getDate() + i).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        $("#day" + i).text(today);

        var iconCode = data.daily[i - 1].weather[0].icon;
        var iconLink = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        $("#icon" + i).html("<img src =" + iconLink + ">");

        $("#temp" + i).text(data.daily[i - 1].temp.day + " \u00B0" +"F");

        $("#wind" + i).text(data.daily[i - 1].wind_speed + " MPH");

        $("#humid" + i).text(data.daily[i - 1].humidity + " %");
    }
}



// local storage to save entries


// event listeners
submit.addEventListener('click', citySearch);

